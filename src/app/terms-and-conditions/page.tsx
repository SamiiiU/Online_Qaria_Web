import type { Metadata } from "next";
import { Section } from "../components/ContentBlocks";
import PageHero from "../components/PageHero";
import SiteShell from "../components/SiteShell";

export const metadata: Metadata = { title: "Terms and Conditions", description: "Terms for Online Qaria's demo and online Quran teaching services.", alternates: { canonical: "/terms-and-conditions" } };

export default function TermsPage() {
  return <SiteShell><PageHero eyebrow="Policy" title="Terms and Conditions" description="The basic terms that apply when a family books or uses Online Qaria lessons." showCta={false} />
    <Section title="Classes and supervision"><p>A parent or legal guardian must arrange lessons for a child and provide accurate contact and scheduling information. Parents remain responsible for the child’s device, internet access and appropriate supervision during online classes.</p></Section>
    <Section title="Demo, enrolment and payment" muted><p>The first demo class is free and does not require continuing enrolment. Any regular schedule, fee, payment date and family discount must be confirmed with the parent before paid lessons begin.</p></Section>
    <Section title="Learning and availability"><p>Online Qaria will provide lessons with reasonable care and skill, but progress varies by attendance, starting level and practice. Class times are subject to teacher availability and are confirmed directly with each family.</p></Section>
    <Section title="Respectful use" muted><p>Students, parents and the teacher must communicate respectfully. Lessons may be paused or ended if conduct makes the learning environment unsafe or inappropriate. Website content may not be copied or represented as another teacher’s service.</p><p>Last updated: 18 October 2026.</p></Section>
  </SiteShell>;
}
