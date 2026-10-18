import type { Metadata } from "next";
import UpdatePasswordForm from "./UpdatePasswordForm";

export const metadata: Metadata = { title: "Choose New Password", robots: { index: false, follow: false } };

export default function UpdatePasswordPage() {
  return <main className="min-h-screen bg-cream px-5 py-16"><section className="mx-auto max-w-xl rounded-lg border border-gold/30 bg-white p-7 shadow-sm sm:p-10"><p className="text-sm font-bold uppercase text-gold">Online Qaria</p><h1 className="mt-3 font-serif text-3xl font-semibold text-navy">Choose a new password</h1><p className="mt-4 leading-7 text-muted">Use at least 8 characters and keep this password private.</p><UpdatePasswordForm /></section></main>;
}
