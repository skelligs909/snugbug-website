"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import Ladybug from "@/components/Ladybug";

const steps = [
  {
    number: 1,
    title: "Open the sterile pack",
    description:
      "Each SnugBug comes individually sealed for safety and hygiene. Just tear along the dotted line.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="w-12 h-12"
        aria-hidden="true"
      >
        <rect
          x="8"
          y="12"
          width="32"
          height="24"
          rx="3"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeDasharray="4 2"
        />
        <path
          d="M8 24h32"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeDasharray="3 3"
        />
        <path
          d="M20 18l4-4 4 4"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="30" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    number: 2,
    title: "Gently insert",
    description:
      "The soft, tapered shape slides in comfortably. No forcing, no fuss \u2014 even half-asleep at 2\u00a0am.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="w-12 h-12"
        aria-hidden="true"
      >
        <path
          d="M24 8c-4 0-7 3-7 7v6c0 2 1 3.5 2.5 4.5"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M24 8c4 0 7 3 7 7v6c0 2-1 3.5-2.5 4.5"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <ellipse
          cx="24"
          cy="28"
          rx="5"
          ry="3"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="M24 31v5"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M20 40c0-2 1.8-4 4-4s4 2 4 4"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: 3,
    title: "Breathe easy",
    description:
      "SnugBug absorbs and applies gentle pressure while your child rests. Relief in minutes, not hours.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="w-12 h-12"
        aria-hidden="true"
      >
        <circle
          cx="24"
          cy="24"
          r="16"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <circle cx="18" cy="20" r="2" fill="currentColor" />
        <circle cx="30" cy="20" r="2" fill="currentColor" />
        <path
          d="M18 29c2 3 4.5 4 6 4s4-1 6-4"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M12 10l-2-3M36 10l2-3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function HowItWorks() {
  return (
    <Section>
      <Container>
        <div className="py-16 lg:py-24">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-snugbug-red font-accent text-sm uppercase tracking-widest mb-3">
              Simple as 1-2-3
            </p>
            <h2 className="font-heading text-3xl lg:text-5xl text-snugbug-dark">
              How It Works
            </h2>
          </motion.div>

          {/* Steps */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12"
          >
            {/* Dashed connector line (desktop only) */}
            <div
              className="hidden md:block absolute top-16 left-[20%] right-[20%] border-t-2 border-dashed border-snugbug-red/30"
              aria-hidden="true"
            />

            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={stepVariants}
                className="relative flex flex-col items-center text-center"
              >
                {/* Number Circle */}
                <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-snugbug-red text-white font-heading text-xl mb-6 shadow-md">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="text-snugbug-dark mb-4">{step.icon}</div>

                {/* Title */}
                <h3 className="font-heading text-xl lg:text-2xl text-snugbug-dark mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="font-body text-snugbug-gray text-base leading-relaxed max-w-xs">
                  {step.description}
                </p>

                {/* Ladybug guide between steps (not after last) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-6 lg:-right-8 top-14 z-20 opacity-60">
                    <div className="w-8 h-8">
                      <Ladybug />
                    </div>
                  </div>
                )}

                {/* Mobile dashed connector (not after last) */}
                {i < steps.length - 1 && (
                  <div
                    className="md:hidden w-px h-10 border-l-2 border-dashed border-snugbug-red/30 mt-6"
                    aria-hidden="true"
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
