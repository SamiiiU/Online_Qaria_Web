import Image from "next/image";
import Link from "next/link";
import BookButton from "./components/BookButton";
import SiteShell from "./components/SiteShell";

function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={`h-5 w-5 shrink-0 ${className}`} aria-hidden>
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function Divider() {
  return (
    <div className="mx-auto my-4 flex w-40 items-center gap-2 text-gold" aria-hidden>
      <span className="h-2 w-2 rotate-45 bg-gold" />
      <span className="h-px flex-1 bg-gold" />
      <span className="h-2 w-2 rotate-45 bg-gold" />
    </div>
  );
}

const badges = [
  { label: "15 Saal Ka Tajurba", icon: "M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.6L6 22l1.5-7.2L2 10l7.1-1.1z" },
  { label: "Khatoon Qaria", icon: "M12 12a4 4 0 100-8 4 4 0 000 8zm-7 9a7 7 0 0114 0z" },
  { label: "Urdu-Medium Teaching", icon: "M4 5h16v11H8l-4 4z" },
  { label: "1-on-1 Online Classes", icon: "M3 6h12v12H3zM16 10l5-3v10l-5-3z" },
];

const features = [
  { title: "Nazra Quran", text: "Sahi makharij ke saath rawani se Quran parhna." },
  { title: "Tajweed ke saath Quran", text: "Tajweed ke qawaid, asaan aur aamli andaaz mein." },
  { title: "Duaein aur Islami Adaab", text: "Rozmarra ki duaein, adaab aur achay akhlaaq.", highlight: true },
  { title: "Urdu mein poori teaching", text: "Bacha samajh kar seekhe | sirf ratta nahi.", highlight: true },
  { title: "Bachon aur bachiyon ke liye khaas, Pakistani Qaria se", text: "Shafqat bhara, mehfooz aur ghar jaisa mahaul." },
];

export default function Home() {
  return (
    <SiteShell>
        {/* Hero */}
        <section className="bg-cream">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-[3fr_2fr] md:gap-10 md:py-16">
            <div>
              <p className="mb-4 inline-block rounded-full bg-gold-soft px-4 py-1 text-sm font-medium text-gold">
                Pehli class bilkul FREE
              </p>
              <h1 className="font-serif text-3xl leading-tight font-bold text-navy sm:text-4xl lg:text-[2.75rem]">
                Online Quran Classes for Kids | Taught in Urdu by an Experienced Pakistani Qaria
              </h1>
              <p className="mt-4 text-base text-muted sm:mt-5 sm:text-lg">
                1-on-1 Quran, Tajweed, Duaein aur Islami Tarbiyat | apne bachon ko ghar baithe wohi taleem dilayein jo
                unhein Pakistan mein milti.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2 sm:gap-3">
                {badges.map((b) => (
                  <li
                    key={b.label}
                    className="flex items-center gap-2 rounded-full border border-gold/30 bg-white px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm font-medium text-navy shadow-sm"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-gold" aria-hidden>
                      <path d={b.icon} />
                    </svg>
                    {b.label}
                  </li>
                ))}
              </ul>
              <BookButton className="mt-8 w-full rounded-lg bg-gold px-8 py-4 text-lg sm:w-auto font-semibold text-white shadow-lg hover:brightness-95" />
            </div>
            <div className="flex justify-center">
              <Image
                src="/her_png.png"
                alt="Online Qaria | khatoon Qaria Quran parhate hue"
                width={500}
                height={500}
                sizes="(min-width: 768px) 33vw, 240px"
                className="w-60 sm:w-72 md:w-full md:max-w-md"
                priority
              />
            </div>
          </div>
        </section>

        <section aria-labelledby="trust-heading" className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase text-gold">Before you enrol</p>
              <h2 id="trust-heading" className="mt-2 font-serif text-2xl font-bold text-navy sm:text-3xl">Check the teacher, safeguards and terms</h2>
              <p className="mt-3 leading-7 text-muted">Parents should be able to understand who teaches, how children are protected and what the service includes before making a decision.</p>
            </div>
            <div className="mt-8 grid gap-8 border-t border-slate-200 pt-8 sm:grid-cols-3">
              <div>
                <h3 className="font-semibold text-navy">Female Qaria</h3>
                <p className="mt-2 text-sm leading-6 text-muted">Read about the teaching approach, Urdu support and one-to-one lesson format.</p>
                <Link href="/female-quran-teacher-online" className="mt-3 inline-block font-semibold text-gold hover:text-navy">Meet the teacher <span aria-hidden>→</span></Link>
              </div>
              <div>
                <h3 className="font-semibold text-navy">Parent-first safety</h3>
                <p className="mt-2 text-sm leading-6 text-muted">Review communication boundaries, parent observation and lesson recording safeguards.</p>
                <Link href="/child-safety" className="mt-3 inline-block font-semibold text-gold hover:text-navy">Read the safeguards <span aria-hidden>→</span></Link>
              </div>
              <div>
                <h3 className="font-semibold text-navy">Clear terms</h3>
                <p className="mt-2 text-sm leading-6 text-muted">See country-based pricing and understand cancellation terms before starting lessons.</p>
                <Link href="/pricing" className="mt-3 inline-block font-semibold text-gold hover:text-navy">Review pricing <span aria-hidden>→</span></Link>
              </div>
            </div>
          </div>
        </section>

        {/* USP */}
        <section id="courses" className="scroll-mt-16 py-12 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center">
              <h2 className="font-serif text-2xl font-bold text-navy sm:text-3xl md:text-4xl">Kya Sikhayenge Hum</h2>
              <Divider />
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <div
                  key={f.title}
                  className={`rounded-xl border p-5 sm:p-6 ${
                    f.highlight ? "border-gold/40 bg-gold-soft/50" : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-navy text-white">
                    <Check />
                  </div>
                  <h3 className="text-lg font-semibold text-navy">{f.title}</h3>
                  <p className="mt-1 text-muted">{f.text}</p>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-10 max-w-3xl border-l-4 border-gold pl-4 font-serif text-lg sm:pl-5 sm:text-xl text-navy md:text-2xl">
              Sirf Quran parhana kaafi nahi | hum bache ki mukammal Islami tarbiyat karte hain.
            </p>
          </div>
        </section>

        {/* Trust + Demo */}
        <section className="bg-cream py-12 md:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-2 md:gap-10">
            <div>
              <h2 className="font-serif text-2xl font-bold text-navy sm:text-3xl md:text-4xl">Tajurbakar haathon mein taleem</h2>
              <p className="mt-4 text-base text-muted sm:mt-5 sm:text-lg">
                15 saal ka tajurba rakhne wali khatoon Qaria se, ghar baithe, Urdu mein Quran, Tajweed, Duaein aur
                Islami Adaab seekhein.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
              <p className="text-sm font-semibold tracking-wide text-gold uppercase">Start with a free demo</p>
              <h3 className="mt-2 text-xl font-semibold text-navy">Meet the Qaria before you decide</h3>
              <p className="mt-2 text-muted">Experience the one-to-one teaching style and discuss the right learning plan for your child.</p>
              <ul className="mt-6 space-y-3">
                <li className="flex gap-3">
                  <Check className="text-gold" />
                  <span>
                    <strong>30-minute one-to-one session</strong> focused on your child’s current level
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check className="text-gold" />
                  <span>
                    <strong>Pehli class bilkul FREE</strong> | koi payment nahi, koi commitment nahi
                  </span>
                </li>
              </ul>
              <BookButton className="mt-8 block w-full rounded-lg bg-gold px-6 py-4 text-center text-lg font-semibold text-white shadow-md hover:brightness-95" />
            </div>
          </div>
        </section>
    </SiteShell>
  );
}
