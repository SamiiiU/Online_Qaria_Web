import Image from "next/image";
import Link from "next/link";
import BookButton from "./BookButton";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/online-quran-classes", label: "Classes" },
  { href: "/female-quran-teacher-online", label: "Female Qaria" },
  { href: "/child-safety", label: "Safety" },
  { href: "/reviews", label: "Reviews" },
  { href: "/blog", label: "Guides" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:py-3">
        <Link href="/" className="flex items-center gap-2" aria-label="Online Qaria home">
          <Image src="/logo-mark.png" alt="" width={82} height={102} className="h-6 w-auto sm:h-7" priority />
          <span className="font-serif text-lg leading-none font-semibold whitespace-nowrap text-navy sm:text-xl">
            Online Qaria
          </span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-3 text-sm font-medium whitespace-nowrap text-ink lg:flex xl:gap-5">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-gold">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <details className="relative lg:hidden">
            <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg border border-slate-200 text-navy [&::-webkit-details-marker]:hidden" aria-label="Open navigation">
              <span className="text-xl" aria-hidden>☰</span>
            </summary>
            <nav aria-label="Mobile navigation" className="absolute right-0 mt-2 w-56 rounded-lg border border-slate-200 bg-white p-2 shadow-xl">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="block rounded-md px-3 py-2.5 text-sm font-medium text-ink hover:bg-cream hover:text-gold">
                  {link.label}
                </Link>
              ))}
            </nav>
          </details>
          <BookButton className="shrink-0 rounded-lg bg-navy px-3 py-2 text-sm font-semibold text-white hover:bg-navy-soft sm:px-4">
            Free Demo
          </BookButton>
        </div>
      </div>
    </header>
  );
}
