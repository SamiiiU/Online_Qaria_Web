import type { Metadata } from "next";
import { Faq, Section } from "../components/ContentBlocks";
import PageHero from "../components/PageHero";
import PricingWidget from "../components/PricingWidget";
import SiteShell from "../components/SiteShell";

export const metadata: Metadata = {
  title: "Online Quran Class Pricing and Free Trial",
  description: "View local pricing for one-to-one online Quran classes in Urdu and book a free first lesson with a female Qaria.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <SiteShell>
      <PageHero eyebrow="Local Pricing" title="A clear monthly package for your location" description="Confirm your country to see the applicable price and currency. The teaching package stays focused and simple." showCta={false} />
      <section className="bg-cream">
        <div className="mx-auto max-w-xl px-4 py-12 sm:py-16">
          <PricingWidget />
        </div>
      </section>
      <Section title="What every package includes">
        <ul>
          <li>One-to-one lessons with an experienced female Pakistani Qaria</li>
          <li>Urdu-medium explanations and individual correction</li>
          <li>Noorani Qaida, Nazra, Tajweed, duas and Islamic manners as appropriate</li>
          <li>A free first demo with no continuing commitment</li>
        </ul>
      </Section>
      <Section title="Pricing questions" muted>
        <Faq items={[
          { question: "Why does pricing depend on country?", answer: "Local pricing lets us present the package in the family’s expected currency and apply the correct market arrangement." },
          { question: "What if the detected country is wrong?", answer: "Use Change country to select the correct location. The site remembers your confirmed choice for future visits." },
          { question: "Does country detection use GPS?", answer: "No. The site uses only a broad country signal supplied by the hosting network and asks you to confirm it." },
          { question: "Is payment required for the demo?", answer: "No. The first demo class is free and does not require payment or a continuing commitment." },
        ]} />
      </Section>
    </SiteShell>
  );
}
