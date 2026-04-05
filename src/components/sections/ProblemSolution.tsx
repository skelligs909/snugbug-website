"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export default function ProblemSolution() {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16 lg:py-24">
          {/* Problem Side — Jo's personal experience */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" as const }}
            className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm"
          >
            <p className="text-snugbug-red font-accent text-sm uppercase tracking-widest mb-4">
              My story
            </p>
            <h2 className="font-heading text-3xl lg:text-4xl text-snugbug-dark leading-tight mb-6">
              It&rsquo;s 2&nbsp;am. My son has a nosebleed.{" "}
              <span className="text-snugbug-red">Again.</span>
            </h2>
            <div className="space-y-4 font-body text-snugbug-gray text-lg leading-relaxed">
              <p>
                I&rsquo;d fumble for tissues in the dark. They&rsquo;d shred
                apart immediately. Blood on the pillowcase, the pajamas, the
                sheets. My little one terrified, me exhausted, and nothing that{" "}
                <em>actually</em> helped.
              </p>
              <p>
                Pinch, tilt, hold&nbsp;&mdash; the mess and the worry just kept
                coming back. Night after night. I knew there had to be something
                better.
              </p>
              <p className="flex items-center gap-2 text-snugbug-red font-accent text-base">
                <span aria-hidden="true">&#9829;</span>
                So I built it myself.
                <span aria-hidden="true">&#9829;</span>
              </p>
            </div>
          </motion.div>

          {/* Solution Side */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" as const, delay: 0.15 }}
            className="bg-snugbug-cream rounded-3xl p-8 lg:p-12 shadow-sm"
          >
            <p className="text-snugbug-green font-accent text-sm uppercase tracking-widest mb-4">
              What I created
            </p>
            <h2 className="font-heading text-3xl lg:text-4xl text-snugbug-dark leading-tight mb-6">
              SnugBug &mdash; born at my kitchen table.
            </h2>
            <div className="space-y-4 font-body text-snugbug-gray text-lg leading-relaxed">
              <p>
                SnugBug is a soft, child-sized nasal insert made from natural
                cotton. It gently absorbs and applies light pressure&nbsp;&mdash;
                the same approach doctors recommend&nbsp;&mdash; so nosebleeds
                stop faster with zero mess.
              </p>
              <p>
                I developed it with pediatricians, tested materials after bedtime,
                and didn&rsquo;t stop until my own kids said it felt okay. No more
                wads of tissue. No more stained sheets. Just calm.
              </p>
              <p className="flex items-center gap-2 text-snugbug-red font-accent text-base">
                <span aria-hidden="true">&#9829;</span>
                Made by a mom, for parents everywhere.
                <span aria-hidden="true">&#9829;</span>
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8"
            >
              <a
                href="#product"
                className="inline-flex items-center gap-2 bg-snugbug-red text-white font-heading text-lg px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
              >
                See How It Works
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
