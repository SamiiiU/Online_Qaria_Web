import type { Metadata } from "next";
import { Cards, Section } from "../components/ContentBlocks";
import PageHero from "../components/PageHero";
import SiteShell from "../components/SiteShell";

export const metadata: Metadata = {
  title: "Child Safety in Online Quran Classes",
  description: "Read the parent-first safeguards used in Online Qaria's private online Quran classes for children.",
  alternates: { canonical: "/child-safety" },
};

export default function SafetyPage() {
  return (
    <SiteShell>
      <PageHero eyebrow="Child Safety" title="Parents remain part of every child’s online learning" description="Clear communication, parent visibility and respectful boundaries are built into the class process." />
      <Section title="Our parent-first safeguards">
        <Cards items={[
          { title: "Parent-managed communication", text: "Scheduling, class changes and service messages are handled through the parent or guardian’s contact details." },
          { title: "Observation is welcome", text: "A parent or guardian may remain nearby or observe the lesson, particularly for younger children." },
          { title: "No private child contact", text: "The teacher does not arrange lessons or maintain private messaging with a child outside the parent-managed process." },
          { title: "Recording requires consent", text: "A lesson is not recorded for general use. Any proposed recording requires the parent’s clear permission in advance." },
        ]} />
      </Section>
      <Section title="A respectful learning environment" muted>
        <p>Corrections should be calm, age-appropriate and focused on learning. Humiliation, threatening language and inappropriate personal questions have no place in a Quran lesson.</p>
        <p>Parents can raise a concern, request a discussion or stop lessons at any time. Safety concerns take priority over completing a scheduled class.</p>
      </Section>
      <Section title="What parents can do">
        <ul>
          <li>Use a device in a shared or visible household area.</li>
          <li>Keep the child’s account and meeting access under parent control.</li>
          <li>Check in regularly about how the child feels during lessons.</li>
          <li>Contact Online Qaria directly if anything feels unclear or uncomfortable.</li>
        </ul>
      </Section>
    </SiteShell>
  );
}
