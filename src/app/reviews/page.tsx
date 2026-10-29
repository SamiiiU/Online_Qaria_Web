import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import SiteShell from "../components/SiteShell";
import { publicReviewColumns, ratingLabels, type PublicReview } from "@/lib/reviews";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Parent and Student Reviews", description: "Read verified parent and student experiences with Online Qaria, including teaching, punctuality, communication and Quran learning progress.", alternates: { canonical: "/reviews" } };
export default async function ReviewsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const page = Math.max(1, Math.min(10000, Number.parseInt(params.page || "1", 10) || 1));
  let reviews: PublicReview[] = []; let available = true; let count = 0;
  try {
    const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!);
    const { data, error, count: total } = await client.from("approved_reviews").select(publicReviewColumns, { count: "exact" }).order("created_at", { ascending: false }).order("id").range((page - 1) * 12, page * 12 - 1);
    if (error) throw error;
    reviews = (data || []) as PublicReview[]; count = total || 0;
  } catch { available = false; }
  return <SiteShell>
    <section className="border-b border-slate-200 bg-cream"><div className="mx-auto max-w-5xl px-4 py-12 sm:py-16"><p className="font-semibold text-gold">From our learning community</p><h1 className="mt-3 font-serif text-3xl font-bold text-navy sm:text-4xl">Parent and student reviews</h1><p className="mt-4 max-w-2xl leading-7 text-muted">Personal experiences of Quran learning with Online Qaria. We check submissions against student records before publishing. Feedback reflects each family&apos;s own experience.</p><Link href="/reviews/newReview" className="mt-6 inline-flex rounded-lg bg-navy px-6 py-3 font-semibold text-white">Leave your experience with us</Link></div></section>
    <div className="mx-auto max-w-5xl px-4 py-12">
      {!available ? <p role="status" className="text-muted">Reviews are temporarily unavailable. Please check back shortly.</p> : !reviews.length ? <p className="text-muted">{page > 1 ? "No reviews on this page." : "Verified experiences will appear here. Have you learned with us? Share your feedback above."}</p> : <div className="grid items-start gap-6 md:grid-cols-2">{reviews.map(review => <article key={review.id} className="min-w-0 rounded-lg border border-slate-200 p-6 [overflow-wrap:anywhere]">
        <p className="text-xs font-semibold uppercase text-gold">Student record verified</p><h2 className="mt-2 font-serif text-xl font-semibold text-navy">{review.display_name}</h2><p className="mt-1 text-sm text-muted">{review.role} · {review.city}, {review.country}</p><p className="mt-2 text-sm text-muted">{review.course} · {review.duration}</p>
        <dl className="my-5 space-y-2 border-y border-slate-100 py-4">{Object.entries(ratingLabels).map(([key,label]) => <div key={key} className="flex flex-wrap items-center justify-between gap-x-3"><dt className="text-sm">{label}</dt><dd aria-label={`${review[key as keyof typeof ratingLabels]} out of 5`} className="whitespace-nowrap text-lg text-gold">{"★".repeat(review[key as keyof typeof ratingLabels])}<span className="text-slate-300">{"★".repeat(5 - review[key as keyof typeof ratingLabels])}</span></dd></div>)}</dl>
        <h3 className="font-semibold text-navy">What helped us learn</h3><p className="mt-2 whitespace-pre-wrap leading-7 text-muted">{review.learned}</p>{review.experience && <><h3 className="mt-5 font-semibold text-navy">Our experience</h3><p className="mt-2 whitespace-pre-wrap leading-7 text-muted">{review.experience}</p></>}{review.improvements && <><h3 className="mt-5 font-semibold text-navy">What could improve</h3><p className="mt-2 whitespace-pre-wrap leading-7 text-muted">{review.improvements}</p></>}<time dateTime={review.created_at} className="mt-5 block text-xs text-muted">{new Date(review.created_at).toLocaleDateString("en-GB", { timeZone: "UTC", dateStyle: "medium" })}</time>
      </article>)}</div>}
      <nav aria-label="Review pages" className="mt-8 flex justify-between">{page > 1 && <Link href={`/reviews?page=${page - 1}`} className="font-semibold text-navy underline">Previous</Link>}{page * 12 < count && <Link href={`/reviews?page=${page + 1}`} className="ml-auto font-semibold text-navy underline">Next</Link>}</nav>
    </div>
    <section className="bg-cream"><div className="mx-auto max-w-5xl px-4 py-10"><h2 className="font-serif text-2xl font-semibold text-navy">Meet the Qaria before deciding</h2><p className="mt-3 text-muted">Discuss your child&apos;s starting point and experience a lesson together.</p><Link href="/contact" className="mt-5 inline-flex rounded-lg bg-navy px-6 py-3 font-semibold text-white">Book a free demo</Link></div></section>
  </SiteShell>;
}
