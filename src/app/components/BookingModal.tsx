"use client";

import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { EMAILJS } from "../emailjs";
import { OPEN_BOOKING_EVENT } from "./BookButton";
import { trackPixel } from "./MetaPixel";

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-ink placeholder:text-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none";

type Status = "idle" | "sending" | "done" | "error";

export default function BookingModal() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const open = () => {
      setStatus((s) => (s === "done" ? "idle" : s));
      if (dialog.current && !dialog.current.open) dialog.current.showModal();
    };
    window.addEventListener(OPEN_BOOKING_EVENT, open);
    return () => window.removeEventListener(OPEN_BOOKING_EVENT, open);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          name: data.name,
          phone: data.phone,
          whatsapp_digits: data.phone.replace(/\D/g, ""),
          kids: data.kids,
          time: data.time,
          submitted_at: new Date().toLocaleString("en-GB", {
            timeZone: "Asia/Dubai",
            dateStyle: "medium",
            timeStyle: "short",
          }),
        },
        { publicKey: EMAILJS.publicKey },
      );
      trackPixel("Lead", { content_name: "Free Demo Booking", num_students: data.kids });
      form.reset();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <dialog
      ref={dialog}
      onClick={(e) => e.target === dialog.current && dialog.current?.close()}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl bg-white p-0 text-ink shadow-2xl backdrop:bg-navy/60 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-5 sm:p-8">
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          aria-label="Band karein"
          className="absolute top-3 right-3 cursor-pointer rounded-full p-2 text-muted hover:bg-slate-100"
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden>
            <path d="M5.3 5.3a1 1 0 011.4 0L10 8.6l3.3-3.3a1 1 0 111.4 1.4L11.4 10l3.3 3.3a1 1 0 01-1.4 1.4L10 11.4l-3.3 3.3a1 1 0 01-1.4-1.4L8.6 10 5.3 6.7a1 1 0 010-1.4z" />
          </svg>
        </button>

        {status === "done" ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft text-gold">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-7 w-7" aria-hidden>
                <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl font-bold text-navy">JazakAllah Khair!</h2>
            <p className="mt-2 text-muted">
              Aap ki free demo class ki request mil gayi hai. Hum aap se 24 ghanton mein WhatsApp par rabta karenge.
            </p>
          </div>
        ) : (
          <>
            <h2 className="pr-8 font-serif text-xl font-bold text-navy sm:text-2xl">
              Apne Bachay Ki Pehli Free Class Book Karein
            </h2>
            <p className="mt-1 mb-6 text-sm text-muted">Koi payment nahi, koi commitment nahi.</p>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium">Naam / Name</label>
                <input id="name" name="name" required className={inputClass} placeholder="Aap ka naam" />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">WhatsApp Number</label>
                <input id="phone" name="phone" type="tel" inputMode="tel" required defaultValue="+971 " className={inputClass} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="kids" className="mb-1.5 block text-sm font-medium">Kitne Bachay? / No. of Students</label>
                  <select id="kids" name="kids" required className={inputClass} defaultValue="">
                    <option value="" disabled>Chunein</option>
                    <option>1 bacha</option>
                    <option>2 bachay</option>
                    <option>3 bachay</option>
                    <option>4 ya zyada</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="time" className="mb-1.5 block text-sm font-medium">Pasandeeda Waqt / Preferred Time</label>
                  <select id="time" name="time" required className={inputClass} defaultValue="">
                    <option value="" disabled>Waqt chunein</option>
                    <option>Subah (9am – 12pm)</option>
                    <option>Dopehar (12pm – 4pm)</option>
                    <option>Shaam (4pm – 8pm)</option>
                    <option>Raat (8pm ke baad)</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full cursor-pointer rounded-lg bg-gold px-6 py-4 text-lg font-semibold text-white shadow-md transition hover:brightness-95 disabled:opacity-60"
              >
                {status === "sending" ? "Bhej rahe hain..." : "Free Demo Book Karein"}
              </button>
              <p className={`text-center text-sm ${status === "error" ? "text-red-600" : "text-muted"}`}>
                {status === "error"
                  ? "Maazrat, kuch masla hua. Dobara koshish karein."
                  : "Hum aap se 24 ghanton mein WhatsApp par rabta karenge"}
              </p>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}
