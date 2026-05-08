import Link from "next/link";
import Image from "next/image";
// import hero from "@/assets/hero-sketch.jpg";

const About = () => (
  <div className="container py-16 md:py-24 max-w-5xl">
    <p className="hand text-3xl text-accent">about us</p>
    <h1 className="display text-5xl md:text-7xl text-ink mt-2">
      Just Faisal,{" "}
      <span className="editorial text-accent">printing posters.</span>
    </h1>

    <div className="grid md:grid-cols-12 gap-12 mt-16 items-start">
      <div className="md:col-span-5">
        <div className="sketch-border p-4 rotate-[1.5deg]">
          <Image
            src="/favicon.ico"
            width={100}
            height={100}
            alt="The studio"
            className="w-full h-auto mix-blend-screen"
          />
        </div>
      </div>
      <div className="md:col-span-7 space-y-6 font-sans text-lg leading-relaxed text-ink-soft">
        <p>
          Hi, I&apos;m Faisal. I started this in 2019 because dorm-room posters
          were either super expensive or kinda ugly. I figured I could do
          better.
        </p>
        <p>
          So I print posters. Cool ones. Affordable ones. The kind you actually
          want on your wall instead of something you settle for. Everything
          ships rolled in a sturdy tube on thick matte paper that doesn&apos;t
          curl up after a week.
        </p>
        <p className="editorial text-3xl text-ink">
          &ldquo;Walls should be fun.&rdquo;
        </p>
        <p>
          No subscriptions, no NFTs, no nonsense. Just posters, picked and
          printed in Brooklyn, shipped wherever.
        </p>
      </div>
    </div>

    <div className="mt-20 grid sm:grid-cols-3 gap-6 border-t border-ink/30 pt-10">
      {[
        { n: "2019", l: "started in a dorm" },
        { n: "10k+", l: "posters shipped" },
        { n: "32", l: "countries reached" },
      ].map((s) => (
        <div key={s.l} className="text-center">
          <p className="display text-5xl text-ink">{s.n}</p>
          <p className="hand text-2xl text-pencil mt-1">{s.l}</p>
        </div>
      ))}
    </div>

    <div className="mt-16 text-center">
      <Link href="/contact" className="ink-btn">
        Say hi
      </Link>
    </div>
  </div>
);

export default About;
