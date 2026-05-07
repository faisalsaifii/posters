import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Bricolage_Grotesque,
  Caveat,
  Inter,
} from "next/font/google";
import "./globals.css";
import { NavLink } from "@/components/NavLink";
import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Twitter } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Posters by Faisal",
  description:
    "Affordable poster prints for your room, dorm or studio — picked and printed by Faisal since 2019.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} ${caveat.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-ink/30 bg-paper/70 backdrop-blur sticky top-0 z-40">
            <div className="container flex items-center justify-between py-5">
              <Link href="/" className="flex items-baseline gap-2">
                <span className="display text-2xl md:text-3xl text-ink">
                  posters
                </span>
                <span className="hand text-3xl text-accent">by faisal</span>
              </Link>
              <nav className="hidden md:flex items-center gap-10">
                <NavLink
                  href="/"
                  className="font-sans uppercase tracking-[0.2em] text-xs text-ink-soft hover:text-ink"
                  activeClassName="sketch-underline text-ink"
                >
                  Shop
                </NavLink>
                <NavLink
                  href="/categories"
                  className="font-sans uppercase tracking-[0.2em] text-xs text-ink-soft hover:text-ink"
                  activeClassName="sketch-underline text-ink"
                >
                  Browse
                </NavLink>
                <NavLink
                  href="/about"
                  className="font-sans uppercase tracking-[0.2em] text-xs text-ink-soft hover:text-ink"
                  activeClassName="sketch-underline text-ink"
                >
                  About
                </NavLink>
                <NavLink
                  href="/contact"
                  className="font-sans uppercase tracking-[0.2em] text-xs text-ink-soft hover:text-ink"
                  activeClassName="sketch-underline text-ink"
                >
                  Contact
                </NavLink>
              </nav>
              <div className="flex items-center gap-5"></div>
            </div>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="border-t border-ink/30 mt-24 bg-paper-deep/40">
            <div className="container py-16 grid md:grid-cols-4 gap-12">
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="display text-3xl text-ink">posters</span>
                  <span className="hand text-3xl text-accent">by faisal</span>
                </div>
                <p className="hand text-3xl text-ink">Cool prints. No fuss.</p>
                <p className="font-sans text-base text-ink-soft max-w-sm leading-relaxed">
                  Affordable poster prints for your room, dorm or studio —
                  picked and printed by Faisal since 2019.
                </p>
                <div className="flex gap-3 pt-2">
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="sketch-border p-2.5 inline-block"
                  >
                    <Instagram className="w-4 h-4 text-ink" strokeWidth={1.5} />
                  </a>
                  <a
                    href="#"
                    aria-label="Twitter"
                    className="sketch-border p-2.5 inline-block"
                  >
                    <Twitter className="w-4 h-4 text-ink" strokeWidth={1.5} />
                  </a>
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="sketch-border p-2.5 inline-block"
                  >
                    <Facebook className="w-4 h-4 text-ink" strokeWidth={1.5} />
                  </a>
                </div>
              </div>

              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-ink-soft mb-4">
                  Shop
                </p>
                <ul className="space-y-3 font-sans text-base text-ink">
                  <li>
                    <Link href="/" className="hover:sketch-underline">
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories" className="hover:sketch-underline">
                      Browse
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:sketch-underline">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:sketch-underline">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-ink-soft mb-4">
                  Say hi
                </p>
                <ul className="space-y-3 font-sans text-base text-ink">
                  <li className="flex gap-2 items-start">
                    <Mail className="w-4 h-4 mt-1.5" strokeWidth={1.5} />
                    <span>hi@postersbyfaisal.com</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <MapPin className="w-4 h-4 mt-1.5" strokeWidth={1.5} />
                    <span>
                      Print room
                      <br />
                      Brooklyn, NY
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-ink/30">
              <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-2">
                <p className="font-sans text-xs uppercase tracking-widest text-ink-soft">
                  © {new Date().getFullYear()} Posters by Faisal
                </p>
                <p className="hand text-2xl text-pencil">
                  — printed with love & caffeine
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
