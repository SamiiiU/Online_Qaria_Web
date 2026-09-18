"use client";

import { useEffect, useState } from "react";
import BookButton from "./BookButton";

export default function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <p className="hidden text-sm text-muted sm:block">
          Pehli class bilkul <span className="font-semibold text-navy">FREE</span> | koi commitment nahi
        </p>
        <BookButton className="w-full rounded-lg bg-gold px-6 py-3 text-center font-semibold text-white shadow-md hover:brightness-95 sm:w-auto" />
      </div>
    </div>
  );
}
