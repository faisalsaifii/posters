import Image from "next/image";
import PosterCard from "@/components/PosterCard";
import { posters, categories } from "@/lib/posters";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="container pt-16 md:pt-24 pb-16 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-6 space-y-8 animate-fade-in-left">
          <p className="hand text-4xl text-accent animate-wiggle inline-block origin-bottom-left">
            cool prints,
          </p>
          <h1 className="display text-6xl md:text-8xl text-ink">
            <span className="shimmer">posters</span>
            <br />
            for your
            <br />
            <span className="editorial glow-text">walls.</span>
          </h1>
          <p className="font-sans text-base text-ink-soft max-w-md leading-relaxed">
            Affordable, good-looking poster prints. Pick one, throw it on the
            wall, vibe immediately. Shipped rolled, ready to hang.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/categories" className="ink-btn">
              Shop posters
            </Link>
            <Link href="#shop" className="ghost-btn">
              See what&apos;s new
            </Link>
          </div>
        </div>
        <div className="md:col-span-6 animate-fade-in-right">
          <div className="sketch-border p-4 rotate-[1.5deg] animate-float">
            <Image
              src="/hero-poster.jpg"
              alt="Featured poster"
              width={1280}
              height={896}
              className="w-full h-auto mix-blend-screen"
            />
          </div>
          <p className="hand text-2xl text-pencil text-right mt-3 pr-4">
            — this week&apos;s pick
          </p>
        </div>
      </section>

      <section className="border-y border-ink/30 bg-paper-deep/50 py-4 overflow-hidden">
        <div className="flex w-max animate-marquee gap-12 font-sans text-xs uppercase tracking-[0.3em] text-ink-soft whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-12 pr-12">
              <span>↳ Free shipping over ₹250</span>
              <span>· Thick matte paper</span>
              <span>· Ships in 2 days</span>
              <span>· Multiple sizes</span>
              <span>· New drops weekly</span>
              <span>· Printed in Brooklyn</span>
            </div>
          ))}
        </div>
      </section>

      <section id="shop" className="container py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="hand text-3xl text-accent">fresh drops</p>
            <h2 className="display text-4xl md:text-5xl text-ink">
              New this week
            </h2>
          </div>
          <Link
            href="/categories"
            className="font-sans text-xs uppercase tracking-widest sketch-underline hidden md:inline"
          >
            View all →
          </Link>
        </div>
        <Carousel opts={{ align: "start", loop: true }} className="px-2">
          <CarouselContent className="-ml-6">
            {posters.map((p) => (
              <CarouselItem
                key={p.id}
                className="pl-6 sm:basis-1/2 md:basis-1/3"
              >
                <PosterCard poster={p} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-6 h-10 w-10 border-ink/40 text-ink hover:bg-ink hover:text-paper" />
          <CarouselNext className="hidden md:flex -right-6 h-10 w-10 border-ink/40 text-ink hover:bg-ink hover:text-paper" />
        </Carousel>
      </section>

      <section className="container pb-24">
        <h2 className="display text-3xl md:text-4xl text-ink mb-8">
          Browse by vibe
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 stagger">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/categories?c=${c.slug}`}
              className="sketch-border p-6 block hover-lift"
            >
              <h3 className="display text-2xl text-ink">{c.name}</h3>
              <p className="hand text-lg text-pencil mt-1">{c.note}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
