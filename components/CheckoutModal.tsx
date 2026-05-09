"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface CheckoutModalProps {
  onClose: () => void;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutModal({ onClose }: CheckoutModalProps) {
  const { totalPrice, items, clear } = useCart();
  const shipping = totalPrice >= 40 ? 0 : 5;
  const grandTotal = totalPrice + shipping;

  const [info, setInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic phone validation
    if (!/^\d{10}$/.test(info.phone)) {
      toast.error("Enter a valid 10-digit phone number");
      return;
    }
    if (!/^\d{6}$/.test(info.pincode)) {
      toast.error("Enter a valid 6-digit pincode");
      return;
    }

    setLoading(true);

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      toast.error("Failed to load payment gateway. Please try again.");
      setLoading(false);
      return;
    }

    let orderId: string;
    let orderAmount: number;
    let currency: string;

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: grandTotal }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Order creation failed");
      }

      const data = await res.json();
      orderId = data.orderId;
      orderAmount = data.amount;
      currency = data.currency;
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Payment initialisation failed"
      );
      setLoading(false);
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderAmount,
      currency,
      name: "Posters",
      description: `${items.length} poster${items.length !== 1 ? "s" : ""}`,
      order_id: orderId,
      prefill: {
        name: info.name,
        email: info.email,
        contact: info.phone,
      },
      notes: {
        address: `${info.address}, ${info.city}, ${info.state} - ${info.pincode}`,
      },
      theme: { color: "#ff6a28" },
      handler: () => {
        clear();
        toast.success("Payment successful! Order placed.");
        onClose();
      },
      modal: {
        ondismiss: () => {
          setLoading(false);
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (response: { error: { description: string } }) => {
      toast.error(
        response.error.description ?? "Payment failed. Please retry."
      );
      setLoading(false);
    });
    rzp.open();
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg sketch-border p-6 md:p-8 overflow-y-auto max-h-[90vh]">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="hand text-2xl text-accent">— checkout</p>
            <h2 className="display text-4xl text-ink">Delivery details</h2>
          </div>
          <button
            onClick={onClose}
            className="font-sans text-xs uppercase tracking-widest text-ink-soft hover:text-ink mt-1"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-1">
            <label className="font-sans text-xs uppercase tracking-widest text-ink-soft">
              Full name
            </label>
            <input
              name="name"
              value={info.name}
              onChange={handleChange}
              required
              className="w-full bg-paper-deep border border-ink/30 px-3 py-2 font-sans text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-accent"
              placeholder="Jane Doe"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="font-sans text-xs uppercase tracking-widest text-ink-soft">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={info.email}
              onChange={handleChange}
              required
              className="w-full bg-paper-deep border border-ink/30 px-3 py-2 font-sans text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-accent"
              placeholder="jane@example.com"
            />
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="font-sans text-xs uppercase tracking-widest text-ink-soft">
              Phone (10 digits)
            </label>
            <input
              name="phone"
              type="tel"
              value={info.phone}
              onChange={handleChange}
              required
              maxLength={10}
              className="w-full bg-paper-deep border border-ink/30 px-3 py-2 font-sans text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-accent"
              placeholder="9876543210"
            />
          </div>

          {/* Address */}
          <div className="space-y-1">
            <label className="font-sans text-xs uppercase tracking-widest text-ink-soft">
              Street address
            </label>
            <input
              name="address"
              value={info.address}
              onChange={handleChange}
              required
              className="w-full bg-paper-deep border border-ink/30 px-3 py-2 font-sans text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-accent"
              placeholder="42, Main Street, Apt 3B"
            />
          </div>

          {/* City + State */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-sans text-xs uppercase tracking-widest text-ink-soft">
                City
              </label>
              <input
                name="city"
                value={info.city}
                onChange={handleChange}
                required
                className="w-full bg-paper-deep border border-ink/30 px-3 py-2 font-sans text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-accent"
                placeholder="Mumbai"
              />
            </div>
            <div className="space-y-1">
              <label className="font-sans text-xs uppercase tracking-widest text-ink-soft">
                State
              </label>
              <input
                name="state"
                value={info.state}
                onChange={handleChange}
                required
                className="w-full bg-paper-deep border border-ink/30 px-3 py-2 font-sans text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-accent"
                placeholder="Maharashtra"
              />
            </div>
          </div>

          {/* Pincode */}
          <div className="space-y-1">
            <label className="font-sans text-xs uppercase tracking-widest text-ink-soft">
              Pincode
            </label>
            <input
              name="pincode"
              value={info.pincode}
              onChange={handleChange}
              required
              maxLength={6}
              className="w-full bg-paper-deep border border-ink/30 px-3 py-2 font-sans text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-accent"
              placeholder="400001"
            />
          </div>

          {/* Order summary */}
          <div className="border-t border-ink/20 pt-4 space-y-2">
            <div className="flex justify-between font-sans text-xs uppercase tracking-widest text-ink-soft">
              <span>Subtotal</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-sans text-xs uppercase tracking-widest text-ink-soft">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : "₹5.00"}</span>
            </div>
            <div className="flex justify-between display text-2xl text-ink border-t border-ink/20 pt-3">
              <span>Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="ink-btn w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing…" : `Pay ₹${grandTotal.toFixed(2)}`}
          </button>
        </form>
      </div>
    </div>
  );
}
