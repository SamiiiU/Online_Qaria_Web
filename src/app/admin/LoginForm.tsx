"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const ADMIN_EMAIL = "onlineqaaria@gmail.com";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "setup">("login");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setMessage(""); setIsError(false);
    if (email.toLowerCase() !== ADMIN_EMAIL) {
      setMessage("This email is not authorized for the Online Qaria dashboard."); setIsError(true); setLoading(false); return;
    }
    const supabase = createClient();
    if (mode === "setup") {
      const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/admin` } });
      setMessage(error ? error.message : "Verification email sent. Open it to activate your admin account."); setIsError(Boolean(error));
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { setMessage(error.message); setIsError(true); } else { router.push("/admin"); router.refresh(); }
    }
    setLoading(false);
  }

  return (
    <form onSubmit={submit} className="mt-8 space-y-5">
      <div><label htmlFor="email" className="mb-2 block text-sm font-semibold text-navy">Email address</label><input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" className="w-full rounded-md border border-slate-300 px-4 py-3 text-ink focus:border-gold" /></div>
      <div><label htmlFor="password" className="mb-2 block text-sm font-semibold text-navy">Password</label><input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} autoComplete={mode === "login" ? "current-password" : "new-password"} className="w-full rounded-md border border-slate-300 px-4 py-3 text-ink focus:border-gold" /></div>
      {message && <p role="status" className={`text-sm ${isError ? "text-red-700" : "text-green-700"}`}>{message}</p>}
      <button type="submit" disabled={loading} className="w-full rounded-md bg-navy px-5 py-3 font-semibold text-white transition hover:bg-navy-soft disabled:opacity-60">{loading ? "Please wait..." : mode === "login" ? "Sign in" : "Create admin account"}</button>
      <div className="flex flex-wrap justify-between gap-3 text-sm">
        <button type="button" onClick={() => { setMode(mode === "login" ? "setup" : "login"); setMessage(""); }} className="font-semibold text-navy underline">{mode === "login" ? "First time? Create password" : "Already registered? Sign in"}</button>
        <Link href="/admin/forgot-password" className="font-semibold text-navy underline">Forgot password?</Link>
      </div>
    </form>
  );
}
