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
/*  Sky Scene — clouds part to reveal sun on signup                     */
/* ------------------------------------------------------------------ */

function SkyCloud({
  className,
  drift,
  cleared,
  delay = 0,
}: {
  className?: string;
  drift: number;
  cleared: boolean;
  delay?: number;
}) {
  return (
    <motion.svg
      viewBox="0 0 200 100"
      fill="white"
      className={`absolute ${className ?? ""}`}
      aria-hidden="true"
      animate={
        cleared
          ? { x: drift, opacity: 0 }
          : { x: [0, drift * 0.06, 0], opacity: 1 }
      }
      transition={
        cleared
          ? { duration: 1.8, ease: "easeInOut", delay }
          : { duration: 6 + Math.abs(drift) * 0.02, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <ellipse cx="100" cy="60" rx="80" ry="30" opacity="0.9" />
      <ellipse cx="65" cy="50" rx="55" ry="28" opacity="0.8" />
      <ellipse cx="135" cy="50" rx="55" ry="28" opacity="0.8" />
      <ellipse cx="100" cy="45" rx="60" ry="25" opacity="0.95" />
    </motion.svg>
  );
}

function Sun({ visible }: { visible: boolean }) {
  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 top-6 sm:top-8"
      initial={{ scale: 0.6, opacity: 0 }}
      animate={
        visible
          ? { scale: 1, opacity: 1 }
          : { scale: 0.6, opacity: 0 }
      }
      transition={{ duration: 1.4, ease: "easeOut", delay: visible ? 0.6 : 0 }}
      aria-hidden="true"
    >
      {/* Glow */}
      <div className="absolute inset-0 -m-10 rounded-full bg-yellow-300/30 blur-3xl" />
      {/* Sun body */}
      <div className="h-36 w-36 sm:h-44 sm:w-44 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-400 shadow-lg shadow-yellow-300/40" />
      {/* Rays */}
      <motion.div
        className="absolute inset-0 -m-5"
        animate={visible ? { rotate: 360 } : {}}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 h-3 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-300/50"
            style={{ transform: `rotate(${i * 36}deg) translateX(80px)` }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Grass strip across bottom of hero                                  */
/* ------------------------------------------------------------------ */

function GrassStrip() {
  return (
    <div
      className="absolute inset-x-0 bottom-0 z-[6] pointer-events-none"
      aria-hidden="true"
    >
      {/* Back layer — taller, darker blades */}
      <svg
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        className="block w-full h-16 sm:h-20 md:h-24"
      >
        <path
          d="M0,100 L0,70 Q15,30 25,65 Q35,20 45,60 Q55,15 65,55 Q80,25 90,60 Q100,10 110,55 Q125,30 135,65 Q145,18 155,58 Q170,28 180,62 Q190,12 200,55 Q215,22 225,60 Q235,8 245,52 Q260,20 270,58 Q280,14 290,55 Q305,25 315,62 Q325,10 335,58 Q350,30 360,65 Q370,15 380,55 Q395,22 405,60 Q415,8 425,52 Q440,28 450,62 Q460,12 470,55 Q485,20 495,58 Q505,14 515,55 Q530,25 540,62 Q550,10 560,58 Q575,30 585,65 Q595,18 605,55 Q620,25 630,60 Q640,12 650,55 Q665,22 675,60 Q685,8 695,52 Q710,28 720,62 Q730,14 740,55 Q755,20 765,58 Q775,10 785,55 Q800,25 810,62 Q820,15 830,58 Q845,30 855,65 Q865,18 875,55 Q890,22 900,60 Q910,8 920,52 Q935,28 945,62 Q955,12 965,55 Q980,20 990,58 Q1000,14 1010,55 Q1025,25 1035,62 Q1045,10 1055,58 Q1070,30 1080,65 Q1090,15 1100,55 Q1115,22 1125,60 Q1135,8 1145,52 Q1160,28 1170,62 Q1185,14 1200,55 L1200,100 Z"
          fill="#5A7A5A"
        />
      </svg>
      {/* Front layer — shorter, brighter blades */}
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 block w-full h-12 sm:h-14 md:h-16"
      >
        <path
          d="M0,80 L0,55 Q20,30 35,50 Q50,20 65,48 Q80,28 95,52 Q110,18 125,45 Q140,32 155,55 Q170,22 185,48 Q200,30 215,52 Q230,15 245,45 Q260,28 275,50 Q290,20 305,48 Q320,32 335,55 Q350,18 365,45 Q380,25 395,52 Q410,15 425,48 Q440,30 455,55 Q470,22 485,48 Q500,28 515,52 Q530,18 545,45 Q560,32 575,55 Q590,20 605,48 Q620,25 635,52 Q650,15 665,45 Q680,30 695,55 Q710,22 725,48 Q740,28 755,52 Q770,18 785,45 Q800,32 815,55 Q830,20 845,48 Q860,25 875,52 Q890,15 905,45 Q920,30 935,55 Q950,22 965,48 Q980,28 995,52 Q1010,18 1025,45 Q1040,32 1055,55 Q1070,20 1085,48 Q1100,25 1115,52 Q1130,15 1145,45 Q1160,30 1175,55 Q1190,22 1200,48 L1200,80 Z"
          fill="#6B8E6B"
        />
      </svg>
    </div>
  );
}

function SkyScene({ cleared }: { cleared: boolean }) {
  return (
    <div className="absolute inset-x-0 top-0 h-48 sm:h-56 overflow-hidden z-[5] pointer-events-none">
      {/* Sky gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={
          cleared
            ? { background: "linear-gradient(to bottom, #87CEEB, #B8D4E8, transparent)" }
            : { background: "linear-gradient(to bottom, #B8D4E8, #d0e4f0, transparent)" }
        }
        transition={{ duration: 1.5 }}
      />

      {/* Sun — hidden behind clouds initially */}
      <Sun visible={cleared} />

      {/* Clouds — drift apart when cleared */}
      <SkyCloud
        className="w-44 sm:w-56 top-2 left-[10%]"
        drift={-300}
        cleared={cleared}
        delay={0}
      />
      <SkyCloud
        className="w-56 sm:w-72 top-4 left-[28%]"
        drift={-200}
        cleared={cleared}
        delay={0.1}
      />
      <SkyCloud
        className="w-48 sm:w-64 top-0 left-[50%] -translate-x-1/2"
        drift={100}
        cleared={cleared}
        delay={0.15}
      />
      <SkyCloud
        className="w-44 sm:w-56 top-6 right-[25%]"
        drift={250}
        cleared={cleared}
        delay={0.1}
      />
      <SkyCloud
        className="w-40 sm:w-52 top-1 right-[5%]"
        drift={350}
        cleared={cleared}
        delay={0}
      />
      {/* Extra lower wisps for density */}
      <SkyCloud
        className="w-36 sm:w-44 top-16 left-[20%] opacity-60"
        drift={-250}
        cleared={cleared}
        delay={0.2}
      />
      <SkyCloud
        className="w-32 sm:w-40 top-14 right-[15%] opacity-50"
        drift={300}
        cleared={cleared}
        delay={0.25}
      />
    </div>
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
      {/*  Sky scene — clouds clear on signup to reveal sun              */}
      {/* ============================================================ */}
      <SkyScene cleared={submitted} />

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
          {/* Ladybug mascot + brand */}
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <Ladybug size={140} className="mx-auto mb-2" />
            <span className="font-heading text-3xl tracking-tight text-snugbug-dark sm:text-4xl">
              Snug<span className="text-snugbug-red">Bug</span>
            </span>
            <span className="font-accent text-xs italic text-snugbug-dark/40 self-end mt-1">
              by Jo Green
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-heading text-4xl font-semibold leading-tight tracking-tight text-snugbug-dark sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Big relief for{" "}
            <span className="text-snugbug-red">little noses</span>
          </motion.h1>

          {/* Subheadline — founder-led voice */}
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-xl font-body text-lg leading-relaxed text-snugbug-dark/75 sm:text-xl"
          >
            I created SnugBug after too many 2&nbsp;a.m. nosebleed panics with my own kids. Tiny cotton inserts that children actually tolerate &mdash; from a mom who&rsquo;s been there.
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

      {/* Grass along the bottom */}
      <GrassStrip />
    </section>
  );
}
