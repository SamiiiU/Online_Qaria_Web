-- Preserve existing feedback while allowing the shorter review form.
alter table public.student_reviews drop constraint student_reviews_phone_check;
alter table public.student_reviews add constraint student_reviews_phone_check
  check (phone = '' or phone ~ '^\+[1-9][0-9]{7,14}$');
alter table public.student_reviews drop constraint student_reviews_experience_check;
alter table public.student_reviews add constraint student_reviews_experience_check
  check (experience = '' or char_length(experience) between 30 and 2000);

create or replace function public.submit_student_review(payload jsonb, request_key uuid)
returns uuid language plpgsql security definer set search_path = '' as $$
declare
  review_id uuid;
  contact text := coalesce(payload->>'phone', '');
  identity_key text;
begin
  -- Serialize retries independently of optional contact information.
  perform pg_advisory_xact_lock(hashtextextended(request_key::text, 1));
  select id into review_id from public.student_reviews where submission_key = request_key;
  if review_id is not null then return review_id; end if;
  identity_key := case when contact <> '' then contact else
    lower(concat_ws('|', payload->>'display_name', payload->>'city', payload->>'country')) end;
  perform pg_advisory_xact_lock(hashtextextended(identity_key, 0));
  if exists (
    select 1 from public.student_reviews
    where created_at > now() - interval '24 hours' and
      ((contact <> '' and phone = contact) or
       (contact = '' and phone = '' and
        lower(concat_ws('|', display_name, city, country)) = identity_key))
  ) then
    raise exception 'Please wait 24 hours before submitting another review.' using errcode = 'P0001';
  end if;
  insert into public.student_reviews (submission_key, display_name, role, city, country, phone,
    course, duration, learned, experience, improvements, punctuality, clarity, patience, communication)
  values (request_key, payload->>'display_name', payload->>'role', payload->>'city', payload->>'country',
    contact, payload->>'course', payload->>'duration', payload->>'learned', coalesce(payload->>'experience', ''),
    coalesce(payload->>'improvements', ''), (payload->>'punctuality')::smallint, (payload->>'clarity')::smallint,
    (payload->>'patience')::smallint, (payload->>'communication')::smallint)
  returning id into review_id;
  return review_id;
end;
$$;
