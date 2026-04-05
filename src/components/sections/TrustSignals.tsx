"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const testimonials = [
  {
    quote:
      "SnugBug changed our bedtime routine. No more tears over nosebleeds.",
    name: "Sarah M.",
    detail: "Mom of two",
  },
  {
    quote:
      "My son used to panic at the first sign of a nosebleed. SnugBug made it feel like no big deal.",
    name: "James T.",
    detail: "Dad of three",
  },
  {
    quote:
      "Finally, something designed with kids in mind. Soft, gentle, and actually works.",
    name: "Priya K.",
    detail: "Mom and pediatric nurse",
  },
];

const pressLogos = Array.from({ length: 5 }, (_, i) => `Press Logo ${i + 1}`);

const trustBadges = [
  {
    label: "Pediatrician Recommended",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
        />
      </svg>
    ),
  },
  {
    label: "Natural Materials",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3c1.5 2 4.5 3.5 7 3-1 4-2 8-7 11-5-3-6-7-7-11 2.5.5 5.5-1 7-3z"
        />
      </svg>
    ),
  },
  {
    label: "Sterile Packaging",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5m-4.75-11.396c.251.023.501.05.75.082M12 6v6m0 0l-2-2m2 2l2-2"
        />
      </svg>
    ),
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5 text-yellow-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TrustSignals() {
  return (
    <Section className="bg-white py-20">
      <Container>
        {/* Testimonials */}
        <motion.h2
          className="font-heading text-3xl md:text-4xl text-snugbug-dark text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Loved by Parents Everywhere
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="bg-snugbug-cream rounded-2xl p-8 shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <StarRating />
              <p className="font-body text-snugbug-dark mt-4 mb-6 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="font-accent text-snugbug-gray text-sm">
                &mdash; {t.name},{" "}
                <span className="italic">{t.detail}</span>
              </p>
            </motion.div>
          ))}
        </div>

        {/* As Seen In */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-body text-snugbug-gray text-sm uppercase tracking-widest text-center mb-8">
            As Seen In
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {pressLogos.map((label, i) => (
              <div
                key={i}
                className="w-28 h-10 bg-gray-200 rounded flex items-center justify-center"
              >
                <span className="text-xs text-snugbug-gray font-body">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {trustBadges.map((badge, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2">
              <div className="text-snugbug-green">{badge.icon}</div>
              <span className="font-accent text-snugbug-dark text-sm">
                {badge.label}
              </span>
            </div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
