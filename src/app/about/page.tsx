import type { Metadata } from "next";
import Image from "next/image";
import { Cards, Section } from "../components/ContentBlocks";
import PageHero from "../components/PageHero";
import SiteShell from "../components/SiteShell";

export const metadata: Metadata = {
  title: "About Our Female Pakistani Qaria",
  description: "Learn about Online Qaria's experienced female Pakistani Quran teacher and her patient, Urdu-medium approach to teaching children online.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHero eyebrow="About Online Qaria" title="A patient teacher for a child’s Quran journey" description="Online Qaria provides personal Quran lessons in Urdu with an experienced female Pakistani Qaria who understands how children learn." />
      <Section title="Teaching with patience and purpose">
        <div className="grid items-center gap-8 md:grid-cols-[1fr_1.4fr]">
          <Image src="/her_png.png" alt="Female Pakistani Qaria teaching Quran online" width={500} height={500} className="mx-auto w-full max-w-xs" />
          <div>
            <p>With 15 years of teaching experience, our Qaria focuses on helping each child read with confidence, correct pronunciation and understanding appropriate to their age.</p>
            <p>Lessons are taught in Urdu and adapted to the student’s current level. A beginner can start from the Arabic letters and Noorani Qaida, while a child who already reads can work on fluency, makharij and Tajweed.</p>
            <p><strong>Our aim is steady progress, not pressure.</strong> Children receive one-to-one attention and parents remain part of the learning process.</p>
          </div>
        </div>
      </Section>
      <Section title="What families can expect" muted>
        <Cards items={[
          { title: "One consistent teacher", text: "The child learns with a familiar female Qaria, helping trust and routine grow over time." },
          { title: "Urdu-medium guidance", text: "Instructions and corrections are explained in clear Urdu so children understand what they are practising." },
          { title: "Individual pace", text: "The lesson starts from the child’s actual level and moves forward when the foundation is secure." },
          { title: "Faith and manners", text: "Duas and age-appropriate Islamic manners can be included alongside Quran reading." },
        ]} />
      </Section>
    </SiteShell>
  );
}
