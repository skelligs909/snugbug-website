"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { trackWaitlistSignup } from "@/lib/analytics";
import Ladybug from "@/components/Ladybug";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Product", href: "/product" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

function InstagramIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.08 4.08 0 011.47.958c.46.46.753.906.957 1.47.164.46.35 1.26.404 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.404 2.43a4.08 4.08 0 01-.957 1.47 4.08 4.08 0 01-1.47.957c-.46.164-1.26.35-2.43.404-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.404a4.08 4.08 0 01-1.47-.957 4.08 4.08 0 01-.957-1.47c-.164-.46-.35-1.26-.404-2.43C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.404-2.43a4.08 4.08 0 01.957-1.47A4.08 4.08 0 015.064 2.293c.46-.164 1.26-.35 2.43-.404C8.76 1.831 9.14 1.819 12 1.819L12 2.163zm0 1.802c-3.153 0-3.506.012-4.744.069-1.075.049-1.66.228-2.049.379a3.29 3.29 0 00-1.214.79 3.29 3.29 0 00-.79 1.214c-.15.39-.33.974-.379 2.049-.057 1.238-.069 1.591-.069 4.744s.012 3.506.069 4.744c.049 1.075.228 1.66.379 2.049.174.466.406.848.79 1.214.366.384.748.616 1.214.79.39.15.974.33 2.049.379 1.238.057 1.591.069 4.744.069s3.506-.012 4.744-.069c1.075-.049 1.66-.228 2.049-.379a3.29 3.29 0 001.214-.79c.384-.366.616-.748.79-1.214.15-.39.33-.974.379-2.049.057-1.238.069-1.591.069-4.744s-.012-3.506-.069-4.744c-.049-1.075-.228-1.66-.379-2.049a3.29 3.29 0 00-.79-1.214 3.29 3.29 0 00-1.214-.79c-.39-.15-.974-.33-2.049-.379-1.238-.057-1.591-.069-4.744-.069zm0 3.066a5.969 5.969 0 110 11.938 5.969 5.969 0 010-11.938zm0 1.802a4.167 4.167 0 100 8.334 4.167 4.167 0 000-8.334zm6.406-3.234a1.394 1.394 0 110 2.788 1.394 1.394 0 010-2.788z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.11V9a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.37a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.8z" />
    </svg>
  );
}

export default function CTAFooter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      trackWaitlistSignup(email);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Section className="bg-snugbug-dark">
      {/* CTA Block */}
      <div className="bg-snugbug-sky py-20">
        <Container>
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl text-snugbug-dark mb-4">
              Join the SnugBug family.
            </h2>
            <p className="font-body text-snugbug-dark/80 mb-8 text-lg">
              I&rsquo;d love to share what I&rsquo;ve built with your family.
              Sign up and get 15% off your first order.
            </p>
            {submitted ? (
              <p className="font-accent text-lg font-medium text-snugbug-green">
                You&rsquo;re on the list! We&rsquo;ll be in touch soon.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-full border border-gray-300 font-body text-snugbug-dark placeholder:text-snugbug-gray focus:outline-none focus:ring-2 focus:ring-snugbug-red/40"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 bg-snugbug-red text-white font-accent rounded-full hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap disabled:opacity-60"
                >
                  {submitting ? "Signing up..." : "Sign Up"}
                </button>
              </form>
            )}
            {error && (
              <p className="mt-2 font-body text-sm text-red-600">{error}</p>
            )}
          </motion.div>
        </Container>
      </div>

      {/* Footer */}
      <footer className="py-14">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="font-heading text-2xl text-white tracking-tight">
                Snug<span className="text-snugbug-red">Bug</span>
              </span>
              <Ladybug size={28} />
              <span className="font-accent text-xs text-gray-400 italic ml-1 self-end -mb-0.5">
                by Jo Green
              </span>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-wrap justify-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-body text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Social Icons */}
            <div className="flex items-center gap-4 text-gray-400">
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-white transition-colors"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-white transition-colors"
              >
                <FacebookIcon />
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="hover:text-white transition-colors"
              >
                <TikTokIcon />
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 pt-6 border-t border-gray-700 text-center">
            <p className="font-body text-xs text-gray-500">
              &copy; 2026 SnugBug. All rights reserved.
            </p>
          </div>
        </Container>
      </footer>
    </Section>
  );
}
