"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export default function FounderStory() {
  return (
    <Section className="bg-snugbug-cream py-20">
      <Container>
        <motion.h2
          className="font-heading text-3xl md:text-4xl text-snugbug-dark text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          The SnugBug Story
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Placeholder Image */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-full max-w-sm aspect-[3/4] bg-gray-200 rounded-2xl flex items-center justify-center">
              <span className="font-body text-snugbug-gray text-sm">
                Founder Photo
              </span>
            </div>
          </motion.div>

          {/* Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-snugbug-dark leading-relaxed text-lg mb-6">
              It started at 2 a.m. on a school night. A tiny voice from the
              hallway, a pillowcase spotted red, and two very tired parents
              scrambling for tissue and reassurance. That night wasn&apos;t the
              first, and it certainly wasn&apos;t the last.
            </p>
            <p className="font-body text-snugbug-dark leading-relaxed text-lg mb-6">
              After too many frantic midnight moments, one parent decided there
              had to be a better way &mdash; something soft enough for a
              child&apos;s nose, safe enough for a parent&apos;s peace of mind,
              and simple enough for little hands to understand. That idea became
              SnugBug.
            </p>
            <p className="font-body text-snugbug-dark leading-relaxed text-lg mb-10">
              Developed alongside pediatricians and made from the gentlest
              natural materials, SnugBug was born from a family&apos;s real need
              &mdash; and a belief that caring for kids shouldn&apos;t feel like
              a crisis.
            </p>

            {/* Quote Callout */}
            <blockquote className="border-l-4 border-snugbug-red pl-6 py-2">
              <p className="font-heading text-snugbug-dark text-xl italic leading-snug">
                &ldquo;Every child deserves gentle care, especially at their
                most vulnerable moments.&rdquo;
              </p>
            </blockquote>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
