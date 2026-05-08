import Link from "next/link";
import PosterCard from "@/components/PosterCard";
import { categories, posters } from "@/lib/posters";

interface Props {
  searchParams: Promise<{ c?: string }>;
}

const Categories = async ({ searchParams }: Props) => {
  const { c } = await searchParams;
  const active = c || "all";
  const filtered =
    active === "all" ? posters : posters.filter((p) => p.category === active);

  return (
    <div className="container py-16">
      <header className="mb-12 max-w-2xl animate-fade-in">
        <p className="hand text-3xl text-accent">browse</p>
        <h1 className="display text-5xl md:text-6xl text-ink">All posters</h1>
        <p className="font-sans text-sm text-ink-soft mt-4 leading-relaxed">
          Filter by vibe or just scroll until something clicks.
        </p>
      </header>

      <div className="flex flex-wrap gap-3 mb-12 border-y border-ink/30 py-5 stagger">
        {[{ slug: "all", name: "All" }, ...categories].map((c) => (
          <Link
            key={c.slug}
            href={c.slug === "all" ? "/categories" : `/categories?c=${c.slug}`}
            className={`font-sans text-xs uppercase tracking-widest px-4 py-2 border transition-all duration-300 hover:-translate-y-0.5 ${
              active === c.slug
                ? "bg-ink text-paper border-ink shadow-[3px_3px_0_hsl(var(--accent))]"
                : "border-ink/40 text-ink-soft hover:border-ink hover:text-ink"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="hand text-4xl text-pencil py-20 text-center animate-fade-in">
          — nothing here yet —
        </p>
      ) : (
        <div
          key={active}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-14 stagger"
        >
          {filtered.map((p) => (
            <PosterCard key={p.id} poster={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
