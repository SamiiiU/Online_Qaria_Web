"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function UpdatePasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState(""); const [confirmPassword, setConfirmPassword] = useState(""); const [message, setMessage] = useState(""); const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== confirmPassword) { setMessage("Passwords do not match."); return; }
    setLoading(true); const { error } = await createClient().auth.updateUser({ password });
    if (error) { setMessage(error.message); setLoading(false); return; }
    router.push("/admin?password=updated"); router.refresh();
  }
  return <form onSubmit={submit} className="mt-8 space-y-5"><div><label htmlFor="password" className="mb-2 block text-sm font-semibold text-navy">New password</label><input id="password" type="password" minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" className="w-full rounded-md border border-slate-300 px-4 py-3" /></div><div><label htmlFor="confirm-password" className="mb-2 block text-sm font-semibold text-navy">Confirm password</label><input id="confirm-password" type="password" minLength={8} required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" className="w-full rounded-md border border-slate-300 px-4 py-3" /></div>{message && <p role="alert" className="text-sm text-red-700">{message}</p>}<button disabled={loading} className="w-full rounded-md bg-navy px-5 py-3 font-semibold text-white disabled:opacity-60">{loading ? "Updating..." : "Save new password"}</button></form>;
}
