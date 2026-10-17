import type { Metadata } from "next";
import { Cards, Faq, Section } from "../components/ContentBlocks";
import PageHero from "../components/PageHero";
import SiteShell from "../components/SiteShell";

export const metadata: Metadata = {
  title: "Online Quran Classes for Kids in Urdu",
  description: "Safe, one-to-one online Quran classes for kids in Urdu with an experienced female Pakistani Qaria. Start with a free demo lesson.",
  alternates: { canonical: "/online-quran-classes-for-kids" },
};

export default function KidsClassesPage() {
  return (
    <SiteShell>
      <PageHero eyebrow="For Children" title="One-to-one Quran classes where children can learn calmly" description="A familiar female Qaria, clear Urdu guidance and a lesson pace shaped around the child rather than a group." />
      <Section title="A child-focused learning experience">
        <Cards items={[
          { title: "Short, focused sessions", text: "Thirty-minute lessons keep practice manageable and give enough time for individual correction." },
          { title: "No group pressure", text: "Children can repeat, ask questions and make mistakes without being compared with classmates." },
          { title: "Clear weekly routine", text: "Five lessons each week help reinforce pronunciation, reading flow and recently learned material." },
          { title: "Parents stay informed", text: "Parents are welcome to observe and can discuss the child’s progress and learning needs." },
        ]} />
      </Section>
      <Section title="What your child can learn" muted>
        <ul>
          <li>Arabic letters and joining through Noorani Qaida</li>
          <li>Nazra Quran with improved fluency</li>
          <li>Makharij and age-appropriate Tajweed rules</li>
          <li>Daily duas and basic Islamic manners</li>
          <li>Confidence and consistency in Quran reading</li>
        </ul>
      </Section>
      <Section title="Questions parents ask">
        <Faq items={[
          { question: "Does my child need previous Quran experience?", answer: "No. The demo lesson helps identify the right starting point, including the alphabet for complete beginners." },
          { question: "Can I sit with my child during class?", answer: "Yes. Parent observation is welcome, particularly for younger children and during the first lessons." },
          { question: "What if my child is shy?", answer: "One-to-one teaching allows the Qaria to build familiarity gently, without the pressure of speaking in front of a group." },
          { question: "How is online safety handled?", answer: "Class communication is arranged through the parent or guardian. Read the Child Safety page for the full safeguards." },
        ]} />
      </Section>
    </SiteShell>
  );
}
