"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { posters } from "@/lib/posters";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const Product = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const router = useRouter();
  const { add } = useCart();
  const poster = posters.find((p) => p.id === id);
  const [size, setSize] = useState("A2");

  if (!poster) {
    return (
      <div className="container py-32 text-center">
        <h1 className="display text-4xl">Print not found</h1>
        <Link href="/categories" className="ink-btn mt-6">
          Back to shop
        </Link>
      </div>
    );
  }

  const sizes = [
    { label: "A4", delta: -10 },
    { label: "A3", delta: 0 },
    { label: "A2", delta: 12 },
    { label: "A1", delta: 28 },
  ];
  const sizeDelta = sizes.find((s) => s.label === size)?.delta ?? 0;
  const finalPrice = poster.price + sizeDelta;

  return (
    <div className="container py-12 md:py-16">
      <Link
        href="/categories"
        className="font-sans text-xs uppercase tracking-widest text-ink-soft hover:text-ink"
      >
        ← Back
      </Link>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 mt-8">
        <div className="sketch-border p-4 md:p-6 self-start">
          <div className="aspect-3/4 bg-paper-deep">
            <Image
              src={poster.image}
              alt={poster.title}
              width={768}
              height={1024}
              className="w-full h-full object-contain mix-blend-screen"
            />
          </div>
        </div>

        <div className="space-y-8 pt-4">
          <div>
            <p className="hand text-2xl text-accent capitalize">
              — {poster.category}
            </p>
            <h1 className="display text-5xl md:text-6xl text-ink leading-tight">
              {poster.title}
            </h1>
            <p className="font-sans text-lg mt-3 text-ink">₹{finalPrice}</p>
          </div>

          <p className="font-sans text-base text-ink-soft leading-relaxed border-l-2 border-accent pl-5">
            {poster.description}
          </p>

          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-ink-soft mb-3">
              Choose a size
            </p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s.label}
                  onClick={() => setSize(s.label)}
                  className={`px-5 py-3 font-sans text-sm tracking-wider border ${
                    size === s.label
                      ? "bg-ink text-paper border-ink"
                      : "border-ink/40 hover:border-ink"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              className="ink-btn"
              onClick={() => {
                add({ ...poster, price: finalPrice });
                toast.success("Added to cart");
              }}
            >
              Add to cart
            </button>
            <button
              className="ghost-btn"
              onClick={() => {
                add({ ...poster, price: finalPrice });
                router.push("/cart");
              }}
            >
              Buy now
            </button>
          </div>

          <ul className="font-sans text-xs uppercase tracking-widest text-ink-soft space-y-2 pt-6 border-t border-ink/30">
            <li>↳ Thick 200gsm matte paper</li>
            <li>↳ Ships rolled in a sturdy tube</li>
            <li>↳ Free shipping over ₹250</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Product;
