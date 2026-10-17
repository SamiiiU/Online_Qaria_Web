import type { Metadata } from "next";
import { Cards, Faq, Section } from "../components/ContentBlocks";
import PageHero from "../components/PageHero";
import SiteShell from "../components/SiteShell";

export const metadata: Metadata = {
  title: "Female Quran Teacher Online for Kids",
  description: "Learn Quran online with an experienced female Pakistani Qaria offering private Urdu-medium lessons for children and beginners.",
  alternates: { canonical: "/female-quran-teacher-online" },
};

export default function FemaleTeacherPage() {
  return (
    <SiteShell>
      <PageHero eyebrow="Female Qaria" title="Learn online with an experienced female Quran teacher" description="Private, Urdu-medium lessons for families who value a patient female teacher and a consistent learning relationship." />
      <Section title="Why teacher continuity matters">
        <p>Children often learn better when they know who will teach them each day. A consistent teacher learns the child’s strengths, recurring mistakes and preferred pace, making corrections more personal and progress easier to follow.</p>
        <p>Online Qaria is built around that direct relationship rather than an anonymous pool of changing tutors.</p>
      </Section>
      <Section title="Teaching approach" muted>
        <Cards items={[
          { title: "15 years of experience", text: "Long-term teaching experience supports a calm approach to different ages, abilities and confidence levels." },
          { title: "Urdu explanations", text: "Instructions are explained in the language many Pakistani families use at home." },
          { title: "Correction with kindness", text: "Mistakes are corrected clearly and patiently so the student understands how to improve." },
          { title: "One-to-one attention", text: "Every minute of the class is focused on one learner’s recitation and development." },
        ]} />
      </Section>
      <Section title="Before you enrol">
        <Faq items={[
          { question: "Who can study with the Qaria?", answer: "The current programme is designed primarily for children and beginners who need Urdu-medium Quran guidance." },
          { question: "Can we meet the teacher first?", answer: "Yes. The free demo is an opportunity for the parent and child to meet the Qaria before deciding." },
          { question: "Will the same Qaria teach regular lessons?", answer: "Yes. The service is designed around continuity with the same female Qaria." },
          { question: "What subjects are covered?", answer: "Noorani Qaida, Nazra Quran, essential Tajweed, daily duas and age-appropriate Islamic manners are available." },
        ]} />
      </Section>
    </SiteShell>
  );
}
