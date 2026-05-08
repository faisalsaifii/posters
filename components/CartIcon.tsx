"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={`Cart (${totalItems} items)`}
      className="relative inline-flex items-center"
    >
      <ShoppingBag className="w-5 h-5 text-ink" strokeWidth={1.5} />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-accent text-paper font-sans text-[10px] w-4 h-4 rounded-full flex items-center justify-center leading-none">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </Link>
  );
}
