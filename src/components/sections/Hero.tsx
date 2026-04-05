"use client";

import { useRef, useState, type FormEvent } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Ladybug from "@/components/Ladybug";
import { Button } from "@/components/ui/Button";
import { trackWaitlistSignup } from "@/lib/analytics";

/* ------------------------------------------------------------------ */
/*  Floating Cotton / Cloud Blob                                       */
/* ------------------------------------------------------------------ */

interface CottonBlobProps {
  className?: string;
  /** Parallax speed multiplier — larger = more movement */
  speed?: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  reducedMotion: boolean;
}

function CottonBlob({
  className,
  speed = 1,
  scrollYProgress,
  reducedMotion,
}: CottonBlobProps) {
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * -120]);

  return (
    <motion.div
      style={reducedMotion ? undefined : { y }}
      className={`absolute rounded-full blur-3xl ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Cotton / Cloud SVG decorative shape                                */
/* ------------------------------------------------------------------ */

function CottonCloud({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 120"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="70" cy="80" rx="60" ry="35" opacity="0.5" />
      <ellipse cx="120" cy="70" rx="50" ry="40" opacity="0.6" />
      <ellipse cx="45" cy="65" rx="40" ry="30" opacity="0.4" />
      <ellipse cx="150" cy="80" rx="40" ry="28" opacity="0.35" />
      <ellipse cx="95" cy="55" rx="45" ry="32" opacity="0.55" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Section                                                       */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = !!prefersReducedMotion;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

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

  /* ---- Stagger animation variants ---- */
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-snugbug-cream"
    >
      {/* ============================================================ */}
      {/*  Background blobs & clouds                                    */}
      {/* ============================================================ */}

      {/* Large sky-blue blob — top-left */}
      <CottonBlob
        scrollYProgress={scrollYProgress}
        reducedMotion={reducedMotion}
        speed={0.6}
        className="bg-snugbug-sky -top-24 -left-32 h-[420px] w-[420px] opacity-30"
      />

      {/* Soft green blob — bottom-right */}
      <CottonBlob
        scrollYProgress={scrollYProgress}
        reducedMotion={reducedMotion}
        speed={1.2}
        className="bg-snugbug-green -right-20 bottom-10 h-[340px] w-[340px] opacity-20"
      />

      {/* Small sky accent — mid-right */}
      <CottonBlob
        scrollYProgress={scrollYProgress}
        reducedMotion={reducedMotion}
        speed={0.8}
        className="bg-snugbug-sky right-[15%] top-[18%] h-[180px] w-[180px] opacity-20"
      />

      {/* Small green accent — left center */}
      <CottonBlob
        scrollYProgress={scrollYProgress}
        reducedMotion={reducedMotion}
        speed={1}
        className="bg-snugbug-green -left-10 top-[55%] h-[220px] w-[220px] opacity-15"
      />

      {/* Decorative cotton cloud SVGs */}
      <CottonCloud className="absolute -left-8 top-[12%] w-48 text-snugbug-sky opacity-15 md:w-64" />
      <CottonCloud className="absolute -right-10 bottom-[18%] w-40 rotate-12 text-snugbug-green opacity-10 md:w-56" />

      {/* ============================================================ */}
      {/*  Content                                                      */}
      {/* ============================================================ */}

      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-24 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Ladybug mascot */}
          <motion.div variants={itemVariants}>
            <Ladybug size={140} className="mx-auto mb-2" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-heading text-4xl font-semibold leading-tight tracking-tight text-snugbug-dark sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Big relief for{" "}
            <span className="text-snugbug-red">little noses</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-xl font-body text-lg leading-relaxed text-snugbug-dark/75 sm:text-xl"
          >
            Gentle, natural cotton nasal inserts designed for children.
            Comfort they&rsquo;ll barely notice, relief you&rsquo;ll love.
          </motion.p>

          {/* CTA — Email capture */}
          <motion.div variants={itemVariants} className="w-full max-w-md pt-4">
            {submitted ? (
              <p className="font-accent text-lg font-medium text-snugbug-green">
                You&rsquo;re on the list! We&rsquo;ll be in touch soon.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <label htmlFor="hero-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="hero-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 rounded-xl border border-snugbug-dark/10 bg-white px-4 py-3 font-body text-snugbug-dark shadow-sm outline-none transition-shadow placeholder:text-snugbug-dark/40 focus:ring-2 focus:ring-snugbug-sky"
                />
                <Button type="submit" variant="primary" disabled={submitting}>
                  {submitting ? "Joining..." : "Join the Waitlist"}
                </Button>
              </form>
            )}
            {error && (
              <p className="mt-2 font-body text-sm text-red-600">{error}</p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
