"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const ADMIN_EMAIL = "onlineqaaria@gmail.com";

export default function UpdatePasswordForm() {
  const router = useRouter();
  const [hasSession, setHasSession] = useState<boolean | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    createClient().auth.getSession().then(({ data }) => {
      setHasSession(Boolean(data.session));
    });
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { data: sessionData } = await supabase.auth.getSession();

    if (!sessionData.session) {
      if (!currentPassword) {
        setMessage("Enter your current password to continue.");
        setLoading(false);
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: ADMIN_EMAIL,
        password: currentPassword,
      });

      if (signInError) {
        setMessage("Current password is incorrect.");
        setLoading(false);
        return;
      }
    }

    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin?password=updated");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="mt-8 space-y-5">
      {hasSession === false && (
        <div>
          <label htmlFor="current-password" className="mb-2 block text-sm font-semibold text-navy">Current password</label>
          <input id="current-password" type="password" required value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} autoComplete="current-password" className="w-full rounded-md border border-slate-300 px-4 py-3" />
        </div>
      )}
      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-semibold text-navy">New password</label>
        <input id="password" type="password" minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" className="w-full rounded-md border border-slate-300 px-4 py-3" />
      </div>
      <div>
        <label htmlFor="confirm-password" className="mb-2 block text-sm font-semibold text-navy">Confirm password</label>
        <input id="confirm-password" type="password" minLength={8} required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" className="w-full rounded-md border border-slate-300 px-4 py-3" />
      </div>
      {message && <p role="alert" className="text-sm text-red-700">{message}</p>}
      <button disabled={loading || hasSession === null} className="w-full rounded-md bg-navy px-5 py-3 font-semibold text-white disabled:opacity-60">{loading ? "Updating..." : "Save new password"}</button>
    </form>
  );
}
