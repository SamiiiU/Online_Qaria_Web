import { PortableText } from "@portabletext/react";
import { Cards, Faq, Section } from "./ContentBlocks";
import PageHero from "./PageHero";
import SiteShell from "./SiteShell";
import type { CmsPage } from "../../sanity/lib/types";

export default function CmsPageView({ page }: { page: CmsPage }) {
  const faqItems = page.sections?.flatMap((section) => section._type === "faqSection" ? section.items || [] : []) || [];
  const faqSchema = faqItems.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  } : null;

  return (
    <SiteShell>
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <PageHero eyebrow={page.eyebrow || "Online Qaria"} title={page.title} description={page.summary} showCta={page.cta?.enabled !== false} />
      {page.sections?.map((section) => {
        if (section._type === "textSection") {
          return <Section key={section._key} title={section.title} muted={section.muted}><PortableText value={section.body || []} /></Section>;
        }
        if (section._type === "cardSection") {
          const items = (section.items || []).filter((item) => item.title && item.text).map((item) => ({ title: item.title!, text: item.text!, href: item.href }));
          return <Section key={section._key} title={section.title} muted={section.muted}><Cards items={items} /></Section>;
        }
        if (section._type === "faqSection") {
          const items = (section.items || []).filter((item) => item.question && item.answer).map((item) => ({ question: item.question!, answer: item.answer! }));
          return <Section key={section._key} title={section.title} muted={section.muted}><Faq items={items} /></Section>;
        }
        return null;
      })}
    </SiteShell>
  );
}
