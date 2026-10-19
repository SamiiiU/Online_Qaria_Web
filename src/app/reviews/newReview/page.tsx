import type { Metadata } from "next";
import SiteShell from "../../components/SiteShell";
import ReviewForm from "./ReviewForm";

export const metadata: Metadata = { title: "Share Your Learning Experience", alternates: { canonical: "/reviews/newReview" }, robots: { index: false, follow: true } };
export default function NewReviewPage() {
  return <SiteShell><div className="mx-auto max-w-3xl px-4 py-12 sm:py-16"><p className="font-semibold text-gold">Your experience matters</p><h1 className="mt-3 font-serif text-3xl font-bold text-navy">Leave your experience with us</h1><p className="mt-4 leading-7 text-muted">Tell other families what learning with Online Qaria has been like. Honest feedback, including things we can improve, is welcome. We verify each submission before publishing.</p><ReviewForm /></div></SiteShell>;
}
