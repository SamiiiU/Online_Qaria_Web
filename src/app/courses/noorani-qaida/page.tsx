import type { Metadata } from "next";
import { Faq, Section } from "../../components/ContentBlocks";
import PageHero from "../../components/PageHero";
import SiteShell from "../../components/SiteShell";

export const metadata: Metadata = {
  title: "Online Noorani Qaida Classes for Kids",
  description: "One-to-one online Noorani Qaida classes in Urdu for children and complete beginners, taught by an experienced female Qaria.",
  alternates: { canonical: "/courses/noorani-qaida" },
};

export default function QaidaPage() {
  const course = { "@context": "https://schema.org", "@type": "Course", name: "Online Noorani Qaida Classes", description: "One-to-one Noorani Qaida lessons in Urdu for children and beginners.", provider: { "@type": "EducationalOrganization", name: "Online Qaria", sameAs: "https://onlineqaria.com" } };
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(course) }} />
      <PageHero eyebrow="Beginner Course" title="Online Noorani Qaida classes for a strong reading foundation" description="Step-by-step Urdu guidance on Arabic letters, sounds and joining for children beginning their Quran journey." />
      <Section title="What the course covers">
        <ul>
          <li>Recognition and pronunciation of Arabic letters</li>
          <li>Different letter shapes and how letters join</li>
          <li>Fatha, kasra, damma and other reading signs</li>
          <li>Sukoon, tashdeed, madd and basic reading patterns</li>
          <li>Careful practice before moving into Quran reading</li>
        </ul>
      </Section>
      <Section title="Who this course is for" muted>
        <p>This course suits complete beginners, children who recognise some letters but cannot join them confidently, and students who need to rebuild an uncertain foundation before continuing Nazra.</p>
        <p>The free demo helps the Qaria choose the appropriate starting lesson rather than automatically beginning from page one.</p>
      </Section>
      <Section title="Course questions">
        <Faq items={[
          { question: "How long does Noorani Qaida take?", answer: "There is no fixed duration because age, practice and starting ability differ. The focus is secure learning rather than rushing to completion." },
          { question: "Do parents need to buy a book?", answer: "The required Qaida and lesson material will be confirmed when the class schedule is arranged." },
          { question: "What happens after Qaida?", answer: "Once the foundation is secure, the student can progress to guided Nazra Quran reading with ongoing pronunciation correction." },
        ]} />
      </Section>
    </SiteShell>
  );
}
