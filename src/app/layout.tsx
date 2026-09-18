import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
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
  title: "Online Quran Classes for Kids in Urdu | Female Pakistani Qaria | Online Qaria",
  description:
    "1-on-1 online Quran classes for kids, taught in Urdu by an experienced female Pakistani Qaria (15 saal ka tajurba). Nazra, Tajweed, Duaein aur Islami Adaab | ghar baithe. Pehli class bilkul FREE.",
  keywords: [
    "online Quran classes for kids",
    "female Quran teacher",
    "Pakistani Quran teacher",
    "Quran classes in Urdu",
    "online Qaria",
    "1-on-1 Quran classes",
    "Tajweed classes online",
  ],
  openGraph: {
    title: "Online Quran Classes for Kids | Taught in Urdu by a Pakistani Qaria",
    description:
      "1-on-1 Quran, Tajweed, Duaein aur Islami Tarbiyat | Urdu mein. Pehli class FREE.",
    images: ["/her_png.png"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ur-Latn"
      className={`${body.variable} ${heading.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
