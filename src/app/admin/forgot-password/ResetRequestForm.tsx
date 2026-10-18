"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ResetRequestForm() {
  const [email, setEmail] = useState("onlineqaaria@gmail.com");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true);
    if (email.toLowerCase() !== "onlineqaaria@gmail.com") { setMessage("This email is not authorized."); setLoading(false); return; }
    const { error } = await createClient().auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth/callback?next=/admin/update-password` });
    setMessage(error ? error.message : "Password reset email sent. Please check your inbox."); setLoading(false);
  }
  return <form onSubmit={submit} className="mt-8 space-y-5"><div><label htmlFor="email" className="mb-2 block text-sm font-semibold text-navy">Admin email</label><input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="w-full rounded-md border border-slate-300 px-4 py-3" /></div>{message && <p role="status" className="text-sm text-muted">{message}</p>}<button disabled={loading} className="w-full rounded-md bg-navy px-5 py-3 font-semibold text-white disabled:opacity-60">{loading ? "Sending..." : "Send reset link"}</button><Link href="/admin" className="block text-center text-sm font-semibold text-navy underline">Back to sign in</Link></form>;
}
