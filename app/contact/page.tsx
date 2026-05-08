"use client";

import {
  Mail,
  MapPin,
  Phone,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const Contact = () => {
  const [sent, setSent] = useState(false);
  return (
    <div className="container py-16 md:py-24 max-w-5xl">
      <p className="hand text-3xl text-accent">say hi</p>
      <h1 className="display text-5xl md:text-7xl text-ink mt-2">
        Drop us <span className="editorial text-accent">a line.</span>
      </h1>
      <p className="font-sans text-lg text-ink-soft mt-6 max-w-xl leading-relaxed">
        Custom sizes, bulk orders, shipping questions, or just wanna chat — we
        read everything.
      </p>

      <div className="grid md:grid-cols-12 gap-12 mt-16">
        <div className="md:col-span-5 space-y-8">
          <div className="space-y-5">
            <div className="flex gap-4 items-start">
              <Mail className="w-5 h-5 text-ink mt-1" strokeWidth={1.5} />
              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-ink-soft">
                  Email
                </p>
                <p className="font-sans text-lg text-ink">
                  hi@postersbyfaisal.com
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <Phone className="w-5 h-5 text-ink mt-1" strokeWidth={1.5} />
              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-ink-soft">
                  Phone
                </p>
                <p className="font-sans text-lg text-ink">+1 (415) 555 0142</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <MapPin className="w-5 h-5 text-ink mt-1" strokeWidth={1.5} />
              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-ink-soft">
                  Print room
                </p>
                <p className="font-sans text-lg text-ink">
                  14 Linden Lane
                  <br />
                  Brooklyn, NY
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-ink/30 pt-6">
            <p className="font-sans text-xs uppercase tracking-widest text-ink-soft mb-4">
              Elsewhere
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook].map((I, i) => (
                <a key={i} href="#" className="sketch-border p-3 inline-block">
                  <I className="w-4 h-4 text-ink" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            toast.success("Message sent — thank you.");
          }}
          className="md:col-span-7 sketch-border p-8 space-y-5"
        >
          <div>
            <label className="font-sans text-xs uppercase tracking-widest text-ink-soft block mb-2">
              Your name
            </label>
            <input
              required
              className="w-full bg-transparent border-b border-ink/40 py-2 font-sans text-lg focus:outline-none focus:border-ink"
            />
          </div>
          <div>
            <label className="font-sans text-xs uppercase tracking-widest text-ink-soft block mb-2">
              Email
            </label>
            <input
              required
              type="email"
              className="w-full bg-transparent border-b border-ink/40 py-2 font-sans text-lg focus:outline-none focus:border-ink"
            />
          </div>
          <div>
            <label className="font-sans text-xs uppercase tracking-widest text-ink-soft block mb-2">
              Message
            </label>
            <textarea
              required
              rows={5}
              className="w-full bg-transparent border-b border-ink/40 py-2 font-sans text-lg focus:outline-none focus:border-ink resize-none"
            />
          </div>
          <button className="ink-btn" type="submit">
            {sent ? "Sent ✓" : "Send it"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
