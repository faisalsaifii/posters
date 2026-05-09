"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import CheckoutModal from "@/components/CheckoutModal";

export default function CartPage() {
  const { items, remove, updateQty, clear, totalItems, totalPrice } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (items.length === 0) {
    return (
      <div className="container py-32 text-center space-y-6">
        <p className="hand text-3xl text-accent">— nothing here yet</p>
        <h1 className="display text-5xl text-ink">Your cart is empty</h1>
        <Link href="/categories" className="inline-block ink-btn mt-4">
          Browse prints
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-16 max-w-4xl">
      <p className="hand text-3xl text-accent">— your cart</p>
      <h1 className="display text-5xl text-ink mt-1 mb-10">
        {totalItems} {totalItems === 1 ? "item" : "items"}
      </h1>

      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-5 sketch-border p-4 items-start"
          >
            <div className="w-20 h-24 bg-paper-deep shrink-0 overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                width={80}
                height={96}
                className="w-full h-full object-contain mix-blend-screen"
              />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="font-sans text-xs uppercase tracking-widest text-ink-soft">
                    {item.category}
                  </p>
                  <p className="display text-2xl text-ink">{item.title}</p>
                </div>
                <p className="font-sans text-lg text-ink shrink-0">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-4 pt-1">
                <div className="flex items-center border border-ink/40">
                  <button
                    className="px-3 py-1 font-sans text-sm hover:bg-ink/5"
                    onClick={() => {
                      if (item.quantity === 1) {
                        remove(item.id);
                        toast.success("Removed from cart");
                      } else {
                        updateQty(item.id, item.quantity - 1);
                      }
                    }}
                  >
                    −
                  </button>
                  <span className="px-3 py-1 font-sans text-sm border-x border-ink/40 min-w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    className="px-3 py-1 font-sans text-sm hover:bg-ink/5"
                    onClick={() => updateQty(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="font-sans text-xs uppercase tracking-widest text-ink-soft hover:text-ink"
                  onClick={() => {
                    remove(item.id);
                    toast.success("Removed from cart");
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-ink/30 pt-8 space-y-4">
        <div className="flex justify-between font-sans text-base text-ink-soft">
          <span className="uppercase tracking-widest text-xs">Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-sans text-base text-ink-soft">
          <span className="uppercase tracking-widest text-xs">Shipping</span>
          <span>{totalPrice >= 40 ? "Free" : "$5.00"}</span>
        </div>
        <div className="flex justify-between display text-3xl text-ink border-t border-ink/30 pt-4">
          <span>Total</span>
          <span>${(totalPrice + (totalPrice >= 40 ? 0 : 5)).toFixed(2)}</span>
        </div>

        <div className="flex flex-wrap gap-3 pt-4">
          <button className="ink-btn" onClick={() => setShowCheckout(true)}>
            Checkout
          </button>
          <button
            className="ghost-btn"
            onClick={() => {
              clear();
              toast.success("Cart cleared");
            }}
          >
            Clear cart
          </button>
        </div>
      </div>

      {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}
    </div>
  );
}
