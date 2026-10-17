import type { Metadata } from "next";
import BookButton from "../components/BookButton";
import { Section } from "../components/ContentBlocks";
import PageHero from "../components/PageHero";
import SiteShell from "../components/SiteShell";

export const metadata: Metadata = {
  title: "Contact and Book a Free Quran Class",
  description: "Contact Online Qaria or book a free demo for one-to-one Urdu Quran classes with a female Pakistani Qaria.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <SiteShell>
      <PageHero eyebrow="Contact" title="Tell us where your child is starting" description="Share the student’s age, current Quran level and preferred time. We will use that information to arrange a suitable free demo." showCta={false} />
      <Section title="Book your free demo">
        <div className="mx-auto max-w-xl rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <p>The short booking form asks only for the details needed to arrange the class: the parent’s name, WhatsApp number, number of students and preferred time.</p>
          <BookButton className="mt-6 rounded-lg bg-gold px-8 py-4 text-lg font-semibold text-white shadow-md hover:brightness-95">Open booking form</BookButton>
          <p className="mt-4 text-sm">We aim to reply on WhatsApp within 24 hours.</p>
        </div>
      </Section>
      <Section title="Before the demo" muted>
        <ul><li>A parent or guardian should submit the booking.</li><li>Have the child’s current Qaida or Quran available if they already study.</li><li>Use a quiet, visible space with a stable internet connection.</li><li>A parent is welcome to remain present throughout the lesson.</li></ul>
      </Section>
    </SiteShell>
  );
}
