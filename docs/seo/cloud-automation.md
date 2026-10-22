# SEO Cloud Operations: Setup and Technical Report

Prepared 22 October 2026. Implementation is not proof of activation.

## Deployment status

The repository now contains a GitHub Actions schedule and a standalone Node worker.
Live activation requires repository secrets, a model selection, a successful manual
preflight and daily smoke test, then the enable variable. Until those are verified,
the service must be described as configured in code, NOT running autonomously.

This worker is separate from the paused conversational Codex goal. It does not
depend on the user's laptop, desktop app, Vercel cron or a ChatGPT subscription.
It is not an autonomous research agent or an automatic public publisher.

## Architecture and schedule

GitHub Actions -> Node worker -> dated editorial brief -> xAI structured draft ->
validation -> private Sanity draft -> ClickUp review task -> human Sanity publish.

- Schedule: `0 4 * * *` UTC, equivalent to 09:00 Asia/Karachi.
- Sunday, Tuesday, Thursday, Saturday: at most one new draft per run.
- Monday, Wednesday, Friday: HTTP checks and observed CMS inventory report.
- Four days per week cannot be strictly alternating across a repeating seven-day
  cycle. Saturday and Sunday are consecutive content days.
- One concurrent workflow, 15-minute job timeout, 90-second API timeout.
- No automatic API retries or fallback model charges.
- Each AI call is capped at 5,000 output tokens. This is not a monthly dollar cap.
- No draft available or evidence older than 30 days: report a blocker, do not
  invent a topic to meet a publishing quota.
- The initial queue has ONE editorial-hypothesis brief. Related keyword themes
  have dated research, but this exact topic has no verified volume or SERP study.
  More researched briefs must be added; this is not an endless content factory.

## Activate

1. Ensure this workflow is committed to the repository's default branch and
   GitHub Actions is permitted for the repository.
2. Open https://github.com/SamiiiU/Online_Qaria_Web/settings/secrets/actions .
   Add repository secrets, never public variables or NEXT_PUBLIC variables:

   | Secret | Source | Permission |
   | --- | --- | --- |
   | `XAI_API_KEY` | https://console.x.ai/ API Keys | Dedicated API project/key with controlled billing |
   | `SANITY_API_TOKEN` | https://www.sanity.io/manage project lipoghtq, API tokens | Dedicated writer; draft-only access if custom roles are available |
   | `CLICKUP_API_TOKEN` | ClickUp personal settings, Apps/API token | Dedicated member limited to Online Qaria lists where possible |

3. Under Actions Variables, set `XAI_MODEL` to the exact text model ID available
   to your xAI account and supporting JSON-schema output. No paid model is chosen
   silently. A free Grok chat account does not guarantee API credits.
4. Actions -> SEO operations -> Run workflow -> `preflight`. This checks read
   access to Sanity, both ClickUp lists and the xAI model catalog without an AI
   generation. A green preflight does not prove write access, funded inference,
   or email delivery.
5. On a content day, run `daily` once. It may spend API credits and create one
   draft and one ClickUp task. Verify the private draft, task/comment, report
   artifact, owner notification and absence of a public article. On an audit day
   the same button only runs checks; wait for a content day to validate drafting.
6. Set repository variable `SEO_AUTOMATION_ENABLED=true` only after the smoke
   test succeeds. Scheduled runs otherwise skip safely. Manual runs remain usable.
7. Check the next actual scheduled run and record its link. Only then call the
   schedule operational. Enable GitHub Actions failure emails for the operator.

Tokens already stored in Vercel or connected to this chat are NOT automatically
available to GitHub Actions. Do not copy personal CLI session tokens into jobs.

## Review and publish

ClickUp content list: `1100390000126153`; reporting: `1100390000126155`.
Tasks are assigned to Online Qaria user `246262960`. Comments request notification.
ClickUp email delivery depends on that user's notification preferences and mail
filtering. A successful API response is not proof that an email reached the inbox.

Open https://onlineqaria.com/studio -> Blog Posts. Review the draft's actual text,
teacher/safety claims, learning advice, originality, intent overlap, title,
description and links. Resolve every review note. Set the publication date to the
actual day and click Publish only when approved. Existing Sanity-backed website
fetches revalidate on a 60-second interval; CDN/ISR can add delay. Check the live
blog URL and sitemap after publishing; no application redeploy should be needed.

Email replies or ClickUp status changes DO NOT publish anything in this version.
Sanity's authenticated Publish action is the human approval gate. No AI worker
mutation targets public post IDs. A broad writer token still has more capability
than the code uses; protect it and restrict roles when available.

## Reliability and recovery

- Sanity run records use private `drafts.seo-run-YYYY-MM-DD` IDs. Generated posts
  use deterministic `drafts.seo-SLUG` IDs. Completed runs do not spend again.
- Before generation a reservation is created. Ambiguous failures stop retries
  from spending twice. An operator must inspect the run, draft and xAI usage
  before removing/resetting a failed reservation. Never reset blindly.
- Draft creation and the recovery pointer commit in one transaction; no existing
  editor draft is overwritten. A saved draft can be re-notified on rerun.
- A failure after ClickUp accepted a comment but before recording completion may
  cause a duplicate notification. Exact-once delivery across services is not
  guaranteed. Daily task names are reconciled before creating another task.
- Reports and sanitized errors are saved as GitHub artifacts for 30 days, including
  when a provider fails. Errors do not dump provider response bodies or tokens.
- Disable the workflow or set `SEO_AUTOMATION_ENABLED=false` to stop scheduled
  work. Cancel any currently running job separately. Existing public pages remain.
- To undo a publication, use Sanity Unpublish. The worker has no delete/publish
  function. Do not delete shared CMS data to reset the scheduler.

## Risks and limitations

| Area | Safeguard and remaining limitation |
| --- | --- |
| Hallucinations | Structured JSON, length/markup checks and human review; these do not prove accuracy or originality. Religious guidance needs qualified review. |
| SEO spam | One intent per brief, occupied-slug check, stale-evidence stop; different slugs can still overlap and require editorial review. No ranking or indexing guarantee. |
| Privacy | No student records, review phone numbers, auth data or Supabase admin key are used. Briefs go to xAI; do not put personal data in them. |
| Secrets | GitHub encrypted secrets, read-only repository token and no PR trigger. Workflow editors can still exfiltrate credentials; restrict write access and protect branches. |
| Billing | One generation per reserved day, output cap, no retries. Manual resets and provider reasoning charges can increase cost; set provider spend controls and alerts. |
| Scheduling | GitHub cron is best effort, may be delayed/dropped, runs on default branch, and public-repo schedules can disable after 60 days inactivity. It is not an exact-time SLA. |
| Notifications | ClickUp notifications requested, not guaranteed inbox delivery. GitHub logs are the fallback; there is no independent external heartbeat monitor. |
| Research | No live SERP/Ubersuggest integration. Curated, dated briefs only; queue maintenance is human work. |
| Reporting | No GSC/GA4 API connection, ranking, impression, lead attribution or traffic reports. CMS document count is not Google indexed-page count. |
| Technical checks | Five public endpoints, basic blog metadata and sitemap marker only. Not a full crawl, link audit, robots parser, canonical validation, schema validator or Core Web Vitals test. |
| Publishing | Manual Sanity approval required. Four content slots are not four guaranteed published posts. |

## Verification

`npm run test:seo` runs pure validation and mocked end-to-end runner tests:
timezone, weekly cadence, draft-only writes, no external generated links, stale
brief rejection, successful draft generation, preflight with no mutations,
completed-run deduplication, ambiguous generation stop and sanitized provider
failure notification. Mocks do not validate production credentials or delivery.

Run `npm run lint` before committing. No application UI or Next.js route changes
are part of this setup. Production xAI calls and a scheduled cloud execution are
still required to verify the integrations after credentials are supplied.

## Official references

- [GitHub schedule behavior](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows)
- [xAI API access and billing](https://x.ai/api)
- [xAI structured output](https://docs.x.ai/developers/model-capabilities/text/structured-outputs)
- [ClickUp task creation and notifications](https://developer.clickup.com/reference/createtask)
- [Sanity mutations](https://www.sanity.io/docs/http-reference/mutation)
