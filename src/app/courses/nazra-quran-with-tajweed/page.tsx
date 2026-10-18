import type { Metadata } from "next";
import { Faq, Section } from "../../components/ContentBlocks";
import PageHero from "../../components/PageHero";
import SiteShell from "../../components/SiteShell";

export const metadata: Metadata = {
  title: "Online Nazra Quran Classes with Tajweed",
  description: "Private online Nazra Quran classes with Tajweed and makharij correction, taught in Urdu by an experienced female Qaria.",
  alternates: { canonical: "/courses/nazra-quran-with-tajweed" },
};

export default function NazraPage() {
  const course = { "@context": "https://schema.org", "@type": "Course", name: "Online Nazra Quran with Tajweed", description: "Guided Nazra Quran reading with pronunciation and Tajweed correction in Urdu.", provider: { "@type": "EducationalOrganization", name: "Online Qaria", url: "https://onlineqaria.com" } };
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(course) }} />
      <PageHero eyebrow="Quran Reading Course" title="Nazra Quran with practical Tajweed correction" description="Develop smoother Quran reading while learning to recognise and apply essential Tajweed rules during recitation." />
      <Section title="What students practise">
        <ul>
          <li>Accurate recognition and flow from one word to the next</li>
          <li>Makharij: producing letters from the correct articulation points</li>
          <li>Pausing and restarting at suitable places</li>
          <li>Essential Tajweed rules applied during real reading</li>
          <li>Repetition of difficult words and recurring errors</li>
        </ul>
      </Section>
      <Section title="A practical approach to Tajweed" muted>
        <p>Tajweed is introduced through the student’s daily recitation rather than treated only as theory. The Qaria demonstrates the sound, listens to the student repeat it and returns to the rule whenever it appears again.</p>
        <p>This approach helps children connect a rule with the words they are actually reading.</p>
      </Section>
      <Section title="Course questions">
        <Faq items={[
          { question: "Must a child finish Qaida first?", answer: "The child should be able to recognise joined Arabic words. The demo lesson will show whether direct Nazra or some foundation revision is more suitable." },
          { question: "Is Tajweed taught separately?", answer: "Essential rules are explained and practised within Quran reading so the student can apply them, not simply memorise their names." },
          { question: "Can you help a child who already reads but makes mistakes?", answer: "Yes. The Qaria can assess recurring pronunciation, fluency and stopping errors and focus lessons accordingly." },
        ]} />
      </Section>
    </SiteShell>
  );
}
