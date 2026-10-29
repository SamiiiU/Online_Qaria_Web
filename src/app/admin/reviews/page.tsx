import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isReviewAdmin, reviewStore } from "@/lib/review-server";
import { ratingLabels, type PublicReview } from "@/lib/reviews";
import { moderateReview } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Review moderation", robots: { index: false, follow: false } };
type PrivateReview = PublicReview & { phone: string; status: string; notification_sent_at: string | null };
export default async function AdminReviews({ searchParams }: { searchParams: Promise<{ status?: string; error?: string; page?: string; updated?: string }> }) {
  if (!await isReviewAdmin()) redirect("/admin");
  const params = await searchParams;
  const status = ["pending", "approved", "rejected"].includes(params.status || "") ? params.status! : "pending";
  const page = Math.max(1, Number.parseInt(params.page || "1", 10) || 1);
  let reviews: PrivateReview[] = []; let configured = true; let count = 0;
  try {
    const { data, error, count: total } = await reviewStore().from("student_reviews").select("*", { count: "exact" }).eq("status", status).order("created_at", { ascending: false }).order("id").range((page - 1) * 20, page * 20 - 1);
    if (error) throw error;
    reviews = data || []; count = total || 0;
  } catch { configured = false; }
  return <main className="mx-auto max-w-4xl px-4 py-10"><Link href="/admin" className="text-navy underline">Admin dashboard</Link><h1 className="mt-5 font-serif text-3xl font-bold text-navy">Review moderation</h1><p className="mt-3 text-muted">Match the private number against your student records. Check public text for personal information before approving. Apply the same authenticity checks to positive and critical feedback.</p>
    <nav aria-label="Review status" className="my-6 flex gap-6 border-b border-slate-200">{["pending", "approved", "rejected"].map(s => <Link key={s} href={`/admin/reviews?status=${s}`} aria-current={s === status ? "page" : undefined} className={`border-b-2 py-3 capitalize ${s === status ? "border-navy font-semibold" : "border-transparent"}`}>{s}</Link>)}</nav>
    {params.error && <p role="alert" className="mb-6 text-red-700">{params.error === "verify" ? "Confirm the reviewer matches a student record and the public text is safe before approving." : "The action could not be saved. Check configuration and try again."}</p>}
    {params.updated && <p role="status" className="mb-6 text-green-800">Review updated.</p>}
    {!configured ? <p role="alert">Review storage is unavailable. Apply the reviews migration and configure SUPABASE_SERVICE_ROLE_KEY on the server.</p> : !reviews.length ? <p>No {status} reviews.</p> : reviews.map(review => <article key={review.id} className="mb-6 rounded-lg border border-slate-200 p-6 [overflow-wrap:anywhere]"><h2 className="text-xl font-semibold text-navy">{review.display_name}</h2><p className="mt-2">{review.role} · {review.city}, {review.country} · {review.course} · {review.duration}</p><p className="mt-3 font-semibold">Private phone: {review.phone ? <a href={`tel:${review.phone}`} className="underline">{review.phone}</a> : "Not provided"}</p><p className="mt-1 text-sm text-muted">Notification: {review.notification_sent_at ? "sent" : "not sent; retry below"}</p>
      <dl className="my-5 grid gap-2 sm:grid-cols-2">{Object.entries(ratingLabels).map(([k,label]) => <div key={k}><dt className="text-sm text-muted">{label}</dt><dd>{review[k as keyof typeof ratingLabels]} / 5</dd></div>)}</dl>
      <h3 className="font-semibold">Learning</h3><p className="whitespace-pre-wrap">{review.learned}</p>{review.experience && <><h3 className="mt-4 font-semibold">Experience</h3><p className="whitespace-pre-wrap">{review.experience}</p></>}<h3 className="mt-4 font-semibold">Improvements</h3><p className="whitespace-pre-wrap">{review.improvements || "None provided"}</p>
      <form action={moderateReview} className="mt-6 space-y-4"><input type="hidden" name="id" value={review.id} /><label className="flex gap-3"><input type="checkbox" name="verified" className="h-5 w-5 shrink-0" /><span>I verified the reviewer against student records (using the phone if provided) and checked that the public text contains no private details.</span></label><div className="flex flex-wrap gap-3"><button name="decision" value="approved" className="rounded-lg bg-navy px-4 py-2 text-white">Approve</button><button name="decision" value="rejected" className="rounded-lg border border-red-300 px-4 py-2 text-red-800">Reject / unpublish</button><button name="decision" value="pending" className="rounded-lg border border-slate-300 px-4 py-2">Return to pending</button>{!review.notification_sent_at && <button name="decision" value="retry" className="rounded-lg border border-slate-300 px-4 py-2">Retry notification</button>}</div></form>
    </article>)}
    <nav aria-label="Moderation pages" className="flex justify-between">{page > 1 && <Link href={`/admin/reviews?status=${status}&page=${page - 1}`} className="underline">Previous</Link>}{page * 20 < count && <Link href={`/admin/reviews?status=${status}&page=${page + 1}`} className="underline">Next</Link>}</nav>
  </main>;
}
