import Link from "next/link";

export function Section({ title, children, muted = false }: { title: string; children: React.ReactNode; muted?: boolean }) {
  return (
    <section className={muted ? "bg-cream" : "bg-white"}>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
        <h2 className="font-serif text-2xl font-bold text-navy sm:text-3xl">{title}</h2>
        <div className="content-copy mt-5">{children}</div>
      </div>
    </section>
  );
}

export function Cards({ items }: { items: { title: string; text: string; href?: string }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <article key={item.title} className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
          <p className="mt-2 leading-7 text-muted">{item.text}</p>
          {item.href && <Link href={item.href} className="mt-4 inline-block font-semibold text-gold hover:text-navy">Learn more →</Link>}
        </article>
      ))}
    </div>
  );
}

export function Faq({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details key={item.question} className="rounded-lg border border-slate-200 bg-white p-5">
          <summary className="cursor-pointer font-semibold text-navy">{item.question}</summary>
          <p className="mt-3 leading-7 text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
