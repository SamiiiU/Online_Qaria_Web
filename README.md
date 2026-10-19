This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Student reviews

The review pages are `/reviews` and `/reviews/newReview`. Approved administrators moderate submissions at `/admin/reviews`. Phone numbers stay in private storage; only approved feedback is publicly readable.

Before enabling submissions, follow [Reviews setup](docs/reviews-setup.md) to apply the Supabase migration and configure the server secret and email sender. Application code alone does not provision the production database or email account.

Run `npm run test:reviews` for validation and isolated database privacy tests. With the local website running on port 3001, run `npm run test:reviews:browser` for mobile and desktop form checks. Browser submission responses are mocked; these checks do not insert production reviews or send emails.

## Sanity and authentication

Sanity Studio provides the admin dashboard at `/studio`. Create a Sanity project, copy `.env.example` to `.env.local`, and set `NEXT_PUBLIC_SANITY_PROJECT_ID`. The production dataset defaults to `production`.

Supabase provides email/password admin authentication at `/admin`, including account verification and password recovery. Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, and `ADMIN_EMAIL` in `.env.local`. In Supabase Authentication URL Configuration, add the production `/auth/callback` URL and the local callback URL to the redirect allow list.

Editors can publish structured SEO pages and country pricing without deploying the application again. Existing code-defined pages remain available as safe fallbacks. New published page paths are added to the XML sitemap automatically, while disabled and no-index pages are excluded.

Add both the local and production website origins to the Sanity project's CORS settings with credentials enabled for Studio access.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
