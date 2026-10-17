import type { Metadata } from "next";
import { Section } from "../components/ContentBlocks";
import PageHero from "../components/PageHero";
import SiteShell from "../components/SiteShell";

export const metadata: Metadata = { title: "Cancellation Policy", description: "Cancellation, rescheduling and missed-class guidance for Online Qaria lessons.", alternates: { canonical: "/cancellation-policy" } };

export default function CancellationPage() {
  return <SiteShell><PageHero eyebrow="Policy" title="Cancellation and Rescheduling" description="Simple expectations for schedule changes and ending regular lessons." showCta={false} />
    <Section title="Changing a class"><p>Please tell Online Qaria as early as possible when a student cannot attend. A replacement time may be offered when the teacher’s schedule allows, but a specific alternative time cannot always be guaranteed.</p></Section>
    <Section title="Teacher cancellations" muted><p>If Online Qaria must cancel a scheduled paid class, the family will be offered a replacement class or an appropriate adjustment by agreement.</p></Section>
    <Section title="Ending regular lessons"><p>Parents may choose not to continue after the free demo. For an active monthly arrangement, contact Online Qaria before the next payment period if you wish to stop. Any refund or adjustment relating to an exceptional situation will be discussed according to the classes already delivered and the confirmed arrangement.</p><p>Last updated: 18 October 2026.</p></Section>
  </SiteShell>;
}
