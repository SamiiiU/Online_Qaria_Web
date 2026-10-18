import type { Metadata } from "next";
import ResetRequestForm from "./ResetRequestForm";

export const metadata: Metadata = { title: "Reset Admin Password", robots: { index: false, follow: false } };

export default function ForgotPasswordPage() {
  return <main className="min-h-screen bg-cream px-5 py-16"><section className="mx-auto max-w-xl rounded-lg border border-gold/30 bg-white p-7 shadow-sm sm:p-10"><p className="text-sm font-bold uppercase text-gold">Online Qaria</p><h1 className="mt-3 font-serif text-3xl font-semibold text-navy">Reset your password</h1><p className="mt-4 leading-7 text-muted">We will send a secure password reset link to the approved admin email.</p><ResetRequestForm /></section></main>;
}
