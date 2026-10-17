import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import MetaPixel from "./components/MetaPixel";
import "./globals.css";

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const heading = Lora({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://onlineqaria.com"),
  title: {
    default: "Online Quran Classes for Kids | Female Qaria | Online Qaria",
    template: "%s | Online Qaria",
  },
  description:
    "One-to-one online Quran classes for kids in Urdu with an experienced female Pakistani Qaria. Learn Nazra, Tajweed, duas and Islamic manners.",
  keywords: [
    "online Quran classes for kids",
    "Pakistani Quran teacher",
    "Quran classes in Urdu",
    "online Qaria",
    "online female Quran teacher",
    "1-on-1 Quran classes",
    "Tajweed classes online",
  ],
  openGraph: {
    title: "Online Quran Classes for Kids | Taught in Urdu by a Pakistani Qaria",
    description:
      "1-on-1 Quran, Tajweed, Duaein aur Islami Tarbiyat | Urdu mein. Pehli class FREE.",
    images: ["/her_png.png"],
    url: "/",
    type: "website",
    siteName: "Online Qaria",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Quran Classes for Kids | Female Qaria",
    description: "Private Urdu-medium Quran lessons for children with an experienced female Pakistani Qaria.",
    images: ["/her_png.png"],
  },
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Online Qaria",
    url: "https://onlineqaria.com",
    logo: "https://onlineqaria.com/logo-mark.png",
    description: "One-to-one online Quran classes for children taught in Urdu by an experienced female Pakistani Qaria.",
  };

  return (
    <html
      lang="en"
      className={`${body.variable} ${heading.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
        {children}
        <MetaPixel />
      </body>
    </html>
  );
}
