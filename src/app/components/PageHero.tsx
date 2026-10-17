import BookButton from "./BookButton";

export default function PageHero({ eyebrow, title, description, showCta = true }: { eyebrow: string; title: string; description: string; showCta?: boolean }) {
  return (
    <section className="border-b border-gold/15 bg-cream">
      <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:py-16">
        <p className="text-sm font-semibold tracking-wide text-gold uppercase">{eyebrow}</p>
        <h1 className="mt-3 font-serif text-3xl font-bold leading-tight text-navy sm:text-4xl md:text-5xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">{description}</p>
        {showCta && <BookButton className="mt-7 rounded-lg bg-gold px-7 py-3.5 font-semibold text-white shadow-md hover:brightness-95" />}
      </div>
    </section>
  );
}
