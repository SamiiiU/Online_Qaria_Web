import type { Metadata } from "next";
import { Section } from "../components/ContentBlocks";
import PageHero from "../components/PageHero";
import SiteShell from "../components/SiteShell";

export const metadata: Metadata = { title: "Privacy Policy", description: "How Online Qaria collects and uses parent and student information.", alternates: { canonical: "/privacy-policy" } };

export default function PrivacyPage() {
  return <SiteShell><PageHero eyebrow="Policy" title="Privacy Policy" description="How information is handled when a parent visits Online Qaria or requests a class." showCta={false} />
    <Section title="Information we collect"><p>When you request a demo, we collect the parent or guardian’s name, WhatsApp number, number of students and preferred class time. We may also receive information you choose to provide when discussing the student’s level and schedule.</p></Section>
    <Section title="How we use it" muted><p>We use this information to respond to the enquiry, arrange classes, communicate about scheduling and provide the requested teaching service. We do not ask children to submit the booking form themselves.</p></Section>
    <Section title="Reviews and verification"><p>Adults may submit their learning experience or review on behalf of their child. We store your phone number privately in Supabase to verify your student relationship. It is not included on the public reviews page. After verification and with your permission, we may publish your chosen display name, role, city, country, course, learning duration, ratings and written feedback. Please do not include children&apos;s full names or private contact information in public answers.</p><p>Review alerts are delivered to our administrator through EmailJS. Alerts contain a review reference and a link to the protected moderation dashboard, not your phone number or full feedback. You can request correction or removal through our contact page. Critical feedback is subject to the same authenticity checks as positive feedback.</p></Section>
    <Section title="Service providers and analytics"><p>Form information is transmitted using EmailJS so the enquiry can reach Online Qaria. The website also uses Meta Pixel to measure advertising activity and actions such as demo requests. These providers may process device, browser or usage information under their own privacy terms.</p></Section>
    <Section title="Country-based pricing" muted><p>Our hosting network may provide an approximate country code derived from your internet connection. We use it only to suggest local pricing and ask you to confirm or change the country. We do not request GPS or precise location. Your confirmed country code is stored in an essential cookie for up to 90 days.</p></Section>
    <Section title="Retention, choices and contact"><p>Information is kept only as long as reasonably needed for enquiries, class administration and applicable record-keeping. A parent may ask to access, correct or delete their submitted information by contacting Online Qaria through the booking form or the same WhatsApp conversation used for the enquiry.</p><p>Last updated: 18 October 2026.</p></Section>
  </SiteShell>;
}
