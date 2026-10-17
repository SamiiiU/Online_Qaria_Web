import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const allowedEmail = process.env.ADMIN_EMAIL || "onlineqaaria@gmail.com";

  if (user && user.email?.toLowerCase() !== allowedEmail.toLowerCase()) {
    await supabase.auth.signOut();
    redirect("/admin?unauthorized=1");
  }

  return (
    <main className="min-h-screen bg-cream px-5 py-16">
      <section className="mx-auto max-w-xl rounded-lg border border-gold/30 bg-white p-7 shadow-sm sm:p-10">
        <p className="text-sm font-bold uppercase text-gold">Online Qaria</p>
        <h1 className="mt-3 font-serif text-3xl font-semibold text-navy">
          {user ? "Admin dashboard" : "Secure admin login"}
        </h1>
        {user ? (
          <div className="mt-7 space-y-5">
            <p className="text-muted">Signed in as {user.email}</p>
            <Link href="/studio" className="inline-flex rounded-md bg-navy px-5 py-3 font-semibold text-white hover:bg-navy-soft">
              Open content studio
            </Link>
            <form action="/auth/signout" method="post">
              <button className="text-sm font-semibold text-navy underline" type="submit">Sign out</button>
            </form>
          </div>
        ) : (
          <>
            <p className="mt-4 leading-7 text-muted">Use the approved Online Qaria email to receive a secure, password-free login link.</p>
            <LoginForm />
          </>
        )}
      </section>
    </main>
  );
}
