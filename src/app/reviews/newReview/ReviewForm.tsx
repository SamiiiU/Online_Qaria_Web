"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { courses, durations, ratingLabels, reviewCountries, type RatingKey } from "@/lib/reviews";

const fieldClass = "mt-2 block w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-3 text-ink";
export default function ReviewForm() {
  const key = useRef<string | null>(null);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const data = Object.fromEntries(new FormData(event.currentTarget));
    setStatus("sending"); setError("");
    key.current ||= crypto.randomUUID();
    try {
      const nationalNumber = String(data.phone).replace(/\D/g, "");
      const phone = `${data.dial}${data.dial === "+39" ? nationalNumber : nationalNumber.replace(/^0+/, "")}`;
      const response = await fetch("/api/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, ...ratings, phone, consent: data.consent === "on", adult: data.adult === "on", request_key: key.current }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to submit. Please try again.");
      setStatus("done");
    } catch (err) { setError(err instanceof Error ? err.message : "Please try again."); setStatus("idle"); }
  }
  if (status === "done") return <div role="status" className="mt-10 border-y border-gold/30 py-10"><h2 className="font-serif text-2xl text-navy">Thank you for sharing</h2><p className="mt-3 text-muted">Your review is awaiting verification. Your phone number stays private. Approved feedback will appear on our reviews page.</p><Link href="/reviews" className="mt-5 inline-block font-semibold text-navy underline">Back to reviews</Link></div>;
  return <form onSubmit={submit} className="mt-10 space-y-10">
    <fieldset disabled={status === "sending"} className="space-y-6">
      <legend className="mb-5 font-serif text-2xl font-semibold text-navy">About your learning</legend>
      <div className="grid gap-5 sm:grid-cols-2">
        <label>Reviewing as<select name="role" required className={fieldClass}><option>Parent / guardian</option><option>Adult student</option></select></label>
        <label>Public display name<input name="display_name" required minLength={2} maxLength={60} placeholder="e.g. Parent from Karachi" className={fieldClass} /><span className="text-xs text-muted">Use your first name or a family label. Avoid a child&apos;s full name.</span></label>
        <label>Country<select name="country" className={fieldClass}>{reviewCountries.map(([name]) => <option key={name}>{name}</option>)}</select></label>
        <label>City<input name="city" required minLength={2} maxLength={80} autoComplete="address-level2" className={fieldClass} /></label>
        <label>Course<select name="course" className={fieldClass}>{courses.map(c => <option key={c}>{c}</option>)}</select></label>
        <label>Time learning with us<select name="duration" className={fieldClass}>{durations.map(d => <option key={d}>{d}</option>)}</select></label>
      </div>
      <fieldset><legend>Phone number for verification</legend><div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3"><select name="dial" aria-label="Phone country code" className={fieldClass}>{reviewCountries.map(([name,dial]) => <option key={name} value={dial}>{name} ({dial})</option>)}</select><input name="phone" aria-label="Phone number without country code" aria-describedby="phone-privacy" type="tel" autoComplete="tel-national" required minLength={6} maxLength={20} className={fieldClass} /></div><p id="phone-privacy" className="mt-2 text-sm text-muted">Your phone number will not be shown publicly. It is only for our records and to match your review with your student account.</p></fieldset>
    </fieldset>
    <fieldset disabled={status === "sending"} className="border-t border-slate-200 pt-7"><legend className="font-serif text-2xl font-semibold text-navy">Rate your experience</legend><p className="mb-5 text-sm text-muted">1 = poor, 5 = excellent</p><div className="space-y-5">{(Object.entries(ratingLabels) as [RatingKey,string][]).map(([name,label]) => <fieldset key={name}><legend className="mb-2 font-medium">{label}</legend><div className="flex gap-2">{[1,2,3,4,5].map(n => <label key={n} title={`${n} out of 5`} className="relative flex h-11 w-11 cursor-pointer items-center justify-center"><input type="radio" name={name} value={n} checked={ratings[name] === n} onChange={() => setRatings({ ...ratings, [name]: n })} required aria-label={`${n} out of 5 for ${label}`} className="peer sr-only" /><span aria-hidden="true" className={`flex h-11 w-11 items-center justify-center rounded peer-focus-visible:outline-2 peer-focus-visible:outline-navy ${n <= (ratings[name] || 0) ? "text-gold" : "text-slate-300"}`}><Star size={28} fill={n <= (ratings[name] || 0) ? "currentColor" : "none"} /></span></label>)}</div></fieldset>)}</div></fieldset>
    <fieldset disabled={status === "sending"} className="space-y-6 border-t border-slate-200 pt-7"><legend className="font-serif text-2xl font-semibold text-navy">Tell us more</legend>
      <label className="block">What did you or your child learn or understand better?<textarea name="learned" required minLength={20} maxLength={1200} rows={3} className={fieldClass} placeholder="For example, recognising joined letters or understanding a Tajweed rule..." /></label>
      <label className="block">What was your experience with the teacher?<textarea name="experience" required minLength={30} maxLength={2000} rows={5} className={fieldClass} placeholder="What helped? How did lessons fit your routine? Share specific moments if you can." /></label>
      <label className="block">What could we improve? <span className="text-sm text-muted">(optional)</span><textarea name="improvements" maxLength={1000} rows={3} className={fieldClass} /></label>
      <p className="text-sm text-muted">Your ratings, display name, city, country and written feedback may be published. Please keep phone numbers, addresses and children&apos;s personal details out of your answers.</p>
      <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="flex items-start gap-3"><input name="adult" type="checkbox" required className="mt-1 h-5 w-5 shrink-0" /><span>I am 18 or older and am a student or the student&apos;s parent/guardian.</span></label>
      <label className="flex items-start gap-3"><input name="consent" type="checkbox" required className="mt-1 h-5 w-5 shrink-0" /><span>This is my honest experience. I agree to verification and publication of the public details above after review. I have read the <Link href="/privacy-policy" className="underline">privacy policy</Link>.</span></label>
      {error && <p role="alert" className="text-red-700">{error}</p>}
      <button disabled={status === "sending"} className="w-full rounded-lg bg-navy px-6 py-4 font-semibold text-white disabled:opacity-60">{status === "sending" ? "Submitting..." : "Submit for verification"}</button>
    </fieldset>
  </form>;
}
