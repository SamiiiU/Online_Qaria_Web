import Link from "next/link";

const serviceLinks = [
  ["All Quran Classes", "/online-quran-classes"],
  ["Quran Classes for Kids", "/online-quran-classes-for-kids"],
  ["Female Quran Teacher", "/female-quran-teacher-online"],
  ["Noorani Qaida", "/courses/noorani-qaida"],
  ["Nazra Quran with Tajweed", "/courses/nazra-quran-with-tajweed"],
];

const trustLinks = [
  ["Parent and Student Reviews", "/reviews"],
  ["About", "/about"],
  ["Child Safety", "/child-safety"],
  ["Parent Guides", "/blog"],
  ["Pricing", "/pricing"],
  ["Contact", "/contact"],
];

export default function SiteFooter() {
  return (
    <footer className="bg-navy px-4 pb-24 pt-12 text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-serif text-2xl font-semibold text-white">Online Qaria</p>
          <p className="mt-3 max-w-sm text-sm leading-6">
            One-to-one online Quran classes for children, taught in Urdu by an experienced female Pakistani Qaria.
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-white">Classes</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {serviceLinks.map(([label, href]) => <li key={href}><Link href={href} className="hover:text-gold">{label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-white">Information</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {trustLinks.map(([label, href]) => <li key={href}><Link href={href} className="hover:text-gold">{label}</Link></li>)}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-3 border-t border-white/15 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Online Qaria. All rights reserved.</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/privacy-policy" className="hover:text-gold">Privacy</Link>
          <Link href="/terms-and-conditions" className="hover:text-gold">Terms</Link>
          <Link href="/cancellation-policy" className="hover:text-gold">Cancellation</Link>
        </div>
      </div>
    </footer>
  );
}
