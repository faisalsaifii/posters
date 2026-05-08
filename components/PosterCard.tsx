import Link from "next/link";
import Image from "next/image";
import { Poster } from "@/lib/posters";

const PosterCard = ({ poster }: { poster: Poster }) => (
  <Link href={`/product/${poster.id}`} className="group block hover-lift">
    <div className="sketch-border p-3 md:p-4 overflow-hidden">
      <div className="aspect-3/4 bg-paper-deep overflow-hidden">
        <Image
          src={poster.image}
          alt={poster.title}
          width={768}
          height={1024}
          className="w-full h-full object-contain mix-blend-screen transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:rotate-1"
        />
      </div>
    </div>
    <div className="flex items-baseline justify-between mt-4 px-1">
      <div>
        <h3 className="display text-xl text-ink reveal-underline inline-block">
          {poster.title}
        </h3>
        <p className="hand text-base text-pencil capitalize">
          — {poster.category}
        </p>
      </div>
      <p className="font-sans text-sm tracking-wider text-ink transition-transform duration-300 group-hover:-translate-y-1 group-hover:text-accent">
        ${poster.price}
      </p>
    </div>
  </Link>
);

export default PosterCard;
