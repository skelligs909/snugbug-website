"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export default function FounderStory() {
  return (
    <Section className="bg-snugbug-cream py-20">
      <Container>
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-snugbug-red font-accent text-sm uppercase tracking-widest mb-3">
            Meet the Founder
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-snugbug-dark">
            Hi, I&rsquo;m Jo Green
          </h2>
        </motion.div>

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
                Jo&rsquo;s Photo
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
              I&rsquo;m a mom first. And like most of the things I&rsquo;ve
              built, SnugBug started with my own kids. My youngest was a chronic
              nosebleeder &mdash; we&rsquo;re talking 2&nbsp;a.m. wake-ups,
              blood-spotted pillowcases, a terrified little face, and me
              fumbling in the dark for anything that might help.
            </p>
            <p className="font-body text-snugbug-dark leading-relaxed text-lg mb-6">
              I&rsquo;d stuff tissue up his nose, hold him still, try to stay
              calm while my heart raced. But tissues shredded. He hated it. I
              hated it. And every single time I thought: <em>why doesn&rsquo;t
              something better exist for kids?</em>
            </p>
            <p className="font-body text-snugbug-dark leading-relaxed text-lg mb-6">
              So I made it. I spent months researching, talking to pediatricians,
              testing materials at the kitchen table after bedtime. I wasn&rsquo;t
              an engineer or a medical-device executive &mdash; I was a mom who
              was tired of the same 2&nbsp;a.m. panic and decided to do something
              about it.
            </p>
            <p className="font-body text-snugbug-dark leading-relaxed text-lg mb-10">
              SnugBug is the product I wished existed on the worst nights. A tiny,
              soft cotton insert that&rsquo;s gentle enough for a child&rsquo;s
              nose, safe enough that I don&rsquo;t worry, and simple enough that
              my kids can use it themselves. It came from our family&rsquo;s real
              need &mdash; and I think it might help yours too.
            </p>

            {/* Quote Callout */}
            <blockquote className="border-l-4 border-snugbug-red pl-6 py-2">
              <p className="font-heading text-snugbug-dark text-xl italic leading-snug">
                &ldquo;I&rsquo;m not a big company. I&rsquo;m a mom who got
                tired of the same 2&nbsp;a.m. panic &mdash; and built something
                better.&rdquo;
              </p>
              <p className="font-accent text-snugbug-gray text-sm mt-2">
                &mdash; Jo Green, Founder of SnugBug
              </p>
            </blockquote>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
