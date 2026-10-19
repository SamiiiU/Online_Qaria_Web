-- Apply once in the linked Supabase SQL editor. Private contacts never enter the public view.
create table public.student_reviews (
  id uuid primary key default gen_random_uuid(),
  submission_key uuid not null unique,
  display_name text not null check (char_length(display_name) between 2 and 60),
  role text not null check (role in ('Parent / guardian', 'Adult student')),
  city text not null check (char_length(city) between 2 and 80),
  country text not null check (char_length(country) between 2 and 80),
  phone text not null check (phone ~ '^\+[1-9][0-9]{7,14}$'),
  course text not null,
  duration text not null,
  learned text not null check (char_length(learned) between 20 and 1200),
  experience text not null check (char_length(experience) between 30 and 2000),
  improvements text not null default '' check (char_length(improvements) <= 1000),
  punctuality smallint not null check (punctuality between 1 and 5),
  clarity smallint not null check (clarity between 1 and 5),
  patience smallint not null check (patience between 1 and 5),
  communication smallint not null check (communication between 1 and 5),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  consent_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  moderated_at timestamptz,
  notification_sent_at timestamptz
);
alter table public.student_reviews enable row level security;
revoke all on public.student_reviews from anon, authenticated;
grant all on public.student_reviews to service_role;
create index student_reviews_status_date on public.student_reviews(status, created_at desc);
create index student_reviews_phone_date on public.student_reviews(phone, created_at desc);

-- Deliberately owner-executed view: expose only approved rows and explicit public columns.
create view public.approved_reviews with (security_barrier = true) as
select id, display_name, role, city, country, course, duration, learned, experience,
  improvements, punctuality, clarity, patience, communication, created_at
from public.student_reviews where status = 'approved';
revoke all on public.approved_reviews from anon, authenticated;
grant select on public.approved_reviews to anon, authenticated;

-- Atomic per-phone throttle and idempotency, available only to the application server.
create function public.submit_student_review(payload jsonb, request_key uuid)
returns uuid language plpgsql security definer set search_path = '' as $$
declare review_id uuid;
begin
  perform pg_advisory_xact_lock(hashtextextended(payload->>'phone', 0));
  select id into review_id from public.student_reviews where submission_key = request_key;
  if review_id is not null then return review_id; end if;
  if exists (select 1 from public.student_reviews where phone = payload->>'phone' and created_at > now() - interval '24 hours') then
    raise exception 'Please wait 24 hours before submitting another review.' using errcode = 'P0001';
  end if;
  insert into public.student_reviews (submission_key, display_name, role, city, country, phone,
    course, duration, learned, experience, improvements, punctuality, clarity, patience, communication)
  values (request_key, payload->>'display_name', payload->>'role', payload->>'city', payload->>'country',
    payload->>'phone', payload->>'course', payload->>'duration', payload->>'learned', payload->>'experience',
    payload->>'improvements', (payload->>'punctuality')::smallint, (payload->>'clarity')::smallint,
    (payload->>'patience')::smallint, (payload->>'communication')::smallint)
  returning id into review_id;
  return review_id;
end;
$$;
revoke all on function public.submit_student_review(jsonb, uuid) from public, anon, authenticated;
grant execute on function public.submit_student_review(jsonb, uuid) to service_role;
