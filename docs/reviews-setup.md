# Reviews setup

## Deployment prerequisites

The review template is now `template_zfcvbpc`, configured in code with the existing EmailJS service. `EMAILJS_REVIEW_TEMPLATE_ID` is an optional override; no extra deployment variable is needed for this template ID. The template-creation step below is only needed when replacing it.

1. Run `supabase/migrations/202610190001_reviews.sql` once in the SQL editor for the existing Supabase project. It creates a private table, a public view limited to approved review fields, and a server-only submission function.
2. Add `SUPABASE_SERVICE_ROLE_KEY` as a server secret in local and deployment environments. Never prefix it with `NEXT_PUBLIC_` or commit its value.
3. In the existing EmailJS account, create a dedicated review notification template using `content/email-templates/review-notification.html`. Set its subject to `Online Qaria: a review needs verification`, its **To Email** to the fixed address `onlineqaaria@gmail.com`, and its From Name to `Online Qaria`. Keep the existing demo booking template unchanged. Set `EMAILJS_REVIEW_TEMPLATE_ID` to the new template ID. The application reuses existing service `service_2hb9p7d` and its public key.
4. In EmailJS Account > Security, allow API requests from non-browser applications. If private-key authorization is enabled, add `EMAILJS_PRIVATE_KEY` as a server secret. Never expose it with a `NEXT_PUBLIC_` prefix. Review emails are sent by the server only after database storage succeeds.
5. Redeploy after adding environment variables. No new deployment is needed to approve or reject a review.

## Workflow

- `/reviews/newReview`: adult-only consent, public display name, location, course, duration, four required ratings, learning outcomes and optional improvements. Private phone is optional. Historical experience answers remain available, but new forms have only two text questions.
- Apply `202610290001_optional_review_fields.sql` after the initial migration before deploying the shorter form. Existing rows are preserved.
- Submission stores a pending review before attempting notification. Repeated submissions with the same request key return the original review. A phone can submit once per 24 hours. Without a phone, the same display-name/city/country combination is limited to one submission per 24 hours. This is basic duplicate protection, not strong identity or bot verification.
- `/admin/reviews`: existing Supabase admin login; verified email must match `ADMIN_EMAIL`. Verify against student records, using the phone when supplied, and check public text before approving. Without sufficient evidence, leave pending. Reject or return to pending to remove an approved review immediately.
- `/reviews`: approved reviews only, paginated, explicit public field selection, no private phone. No fabricated reviews are seeded.
- Failed email attempts do not lose submissions. The moderation dashboard displays unsent notifications and has a retry action. There is no automatic retry scheduler; check pending reviews if delivery fails.
- EmailJS limits sending to one request per second. Failed or rate-limited requests remain unsent in the dashboard for retry. A timeout after provider acceptance can result in a duplicate notification on retry; match the review reference. No phone or written feedback is sent in the notification payload.
- Moderation is based on authenticity and privacy, not rating. Do not reject a review solely because it is critical.

## Verification before production use

- Submit a real, consented review; confirm it is pending and absent from the public page.
- Confirm receipt of the admin notification. Match the phone and approve; confirm public appearance and no phone exposure.
- Reject or return to pending; confirm removal.
- Anonymous and non-admin sessions must not access private rows or moderation actions.
- The public Supabase view must not expose phone, submission keys or pending reviews.

No database migration or email service configuration is assumed complete merely because application builds pass.
