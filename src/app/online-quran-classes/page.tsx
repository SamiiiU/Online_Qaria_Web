import type { Metadata } from "next";
import { Cards, Faq, Section } from "../components/ContentBlocks";
import PageHero from "../components/PageHero";
import SiteShell from "../components/SiteShell";

export const metadata: Metadata = {
  title: "Online Quran Classes in Urdu",
  description: "Explore one-to-one online Quran classes in Urdu: Noorani Qaida, Nazra Quran, Tajweed, duas and Islamic manners for children.",
  alternates: { canonical: "/online-quran-classes" },
};

export default function ClassesPage() {
  return (
    <SiteShell>
      <PageHero eyebrow="Our Classes" title="Online Quran classes built around your child’s level" description="Private Urdu-medium lessons covering Quran reading, Tajweed, daily duas and Islamic manners with a female Qaria." />
      <Section title="Choose the right starting point">
        <Cards items={[
          { title: "Noorani Qaida for beginners", text: "A structured start with Arabic letters, joining, vowel marks and accurate pronunciation.", href: "/courses/noorani-qaida" },
          { title: "Nazra Quran with Tajweed", text: "Guided Quran reading that develops fluency while correcting makharij and essential Tajweed rules.", href: "/courses/nazra-quran-with-tajweed" },
          { title: "Quran classes for children", text: "The complete child-focused programme, including lesson routine, parent involvement and progress.", href: "/online-quran-classes-for-kids" },
          { title: "Lessons with a female Qaria", text: "Learn more about the teacher, one-to-one format and who these private lessons suit.", href: "/female-quran-teacher-online" },
        ]} />
      </Section>
      <Section title="How the classes work" muted>
        <ol>
          <li><strong>Book a free demo:</strong> tell us the student’s age, current level and preferred time.</li>
          <li><strong>Meet the Qaria:</strong> the first lesson helps assess reading ability and comfort.</li>
          <li><strong>Agree the starting level:</strong> the learning plan begins from the student’s real needs.</li>
          <li><strong>Build a routine:</strong> regular 30-minute sessions provide focused practice and correction.</li>
        </ol>
      </Section>
      <Section title="Common questions">
        <Faq items={[
          { question: "Are classes one-to-one?", answer: "Yes. Each session is private, allowing the Qaria to focus on one student’s reading and progress." },
          { question: "Which language is used?", answer: "Teaching and explanations are provided in Urdu. Quran recitation and pronunciation are taught in Arabic." },
          { question: "Can a complete beginner join?", answer: "Yes. Beginners can start with Noorani Qaida and progress step by step toward Quran reading." },
          { question: "Is the first lesson free?", answer: "Yes. The first demo class is free and does not require a continuing commitment." },
        ]} />
      </Section>
    </SiteShell>
  );
}
