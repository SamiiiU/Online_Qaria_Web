import Link from "next/link";
import SiteShell from "./components/SiteShell";

export default function NotFound() {
  return <SiteShell><section className="bg-cream"><div className="mx-auto max-w-2xl px-4 py-24 text-center"><p className="font-semibold text-gold">404</p><h1 className="mt-3 font-serif text-4xl font-bold text-navy">Page not found</h1><p className="mt-4 text-muted">The page may have moved, but the class information is still easy to find.</p><Link href="/" className="mt-7 inline-block rounded-lg bg-navy px-6 py-3 font-semibold text-white">Return home</Link></div></section></SiteShell>;
}
