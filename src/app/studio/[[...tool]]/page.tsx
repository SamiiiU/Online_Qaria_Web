"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "../../../sanity/env";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="min-h-screen bg-cream px-4 py-16 text-ink">
        <div className="mx-auto max-w-2xl rounded-lg border border-slate-200 bg-white p-8">
          <h1 className="font-serif text-3xl font-bold text-navy">Connect Sanity</h1>
          <p className="mt-4 leading-7 text-muted">Add NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET to enable the Online Qaria content dashboard.</p>
        </div>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
