"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const [email, setEmail] = useState("onlineqaaria@gmail.com");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    if (email.toLowerCase() !== "onlineqaaria@gmail.com") {
      setMessage("This email is not authorized for the Online Qaria dashboard.");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/admin` },
    });

    setMessage(error ? error.message : "Login link sent. Please check the Online Qaria inbox.");
    setLoading(false);
  }

  return (
    <form onSubmit={signIn} className="mt-8 space-y-5">
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-navy">Email address</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          autoComplete="email"
          className="w-full rounded-md border border-slate-300 px-4 py-3 text-ink focus:border-gold"
        />
      </div>
      {message && <p role="status" className="text-sm text-muted">{message}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-navy px-5 py-3 font-semibold text-white transition hover:bg-navy-soft disabled:opacity-60"
      >
        {loading ? "Sending link..." : "Send secure login link"}
      </button>
    </form>
  );
}
