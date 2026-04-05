"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const features = [
  {
    title: "Natural Cotton",
    description: "Soft, hypoallergenic material that's gentle against delicate skin.",
    bg: "bg-white",
    span: "md:col-span-1 lg:row-span-2",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <circle cx="24" cy="28" r="10" stroke="currentColor" strokeWidth="2.5" />
        <path d="M20 28c0-2.5 1.5-5 4-5s4 2.5 4 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 18v-6M18 20l-4-4M30 20l4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M16 30c-3 1-5 3-5 5M32 30c3 1 5 3 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Gentle Fit",
    description: "Designed specifically for small noses with a soft, tapered shape.",
    bg: "bg-snugbug-cream",
    span: "md:col-span-1",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <path d="M24 8c-6 0-10 6-10 14 0 4 2 7 4 9h12c2-2 4-5 4-9 0-8-4-14-10-14z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M20 31v4a4 4 0 008 0v-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="20" cy="20" r="1.5" fill="currentColor" />
        <circle cx="28" cy="20" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Stops Nosebleeds",
    description: "Absorbs blood and applies gentle, consistent pressure to stop bleeding faster.",
    bg: "bg-snugbug-sky/20",
    span: "md:col-span-1 lg:col-span-2",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <path d="M24 6l-2 4c-4 8-10 12-10 20a12 12 0 0024 0c0-8-6-12-10-20l-2-4z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M20 28h8M24 24v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Eases Congestion",
    description: "Helps little ones breathe easier during colds and allergies too.",
    bg: "bg-snugbug-cream",
    span: "md:col-span-1",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <path d="M10 24c0-8 6-14 14-14s14 6 14 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M14 30c2-3 6-5 10-5s8 2 10 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M6 24h4M38 24h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 34l-2 6M28 34l2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="20" cy="22" r="1.5" fill="currentColor" />
        <circle cx="28" cy="22" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Sterile Packaging",
    description: "Individually wrapped in sealed packs for safety and hygiene, anywhere you go.",
    bg: "bg-white",
    span: "md:col-span-1",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <rect x="10" y="10" width="28" height="28" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <path d="M10 20h28" stroke="currentColor" strokeWidth="2.5" />
        <path d="M20 10v10M28 10v10" stroke="currentColor" strokeWidth="2" strokeDasharray="3 2" />
        <path d="M20 30l3 3 5-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Child-Sized",
    description: "Perfectly proportioned for kids aged 2-12. Comfortable and never too big.",
    bg: "bg-snugbug-sky/20",
    span: "md:col-span-1 lg:row-span-2",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <circle cx="24" cy="14" r="6" stroke="currentColor" strokeWidth="2.5" />
        <path d="M16 42v-10a8 8 0 0116 0v10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M20 36h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M36 18l-4 2M12 18l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function ProductFeatures() {
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
            className="text-center mb-14"
          >
            <p className="text-snugbug-red font-accent text-sm uppercase tracking-widest mb-3">
              Why SnugBug?
            </p>
            <h2 className="font-heading text-3xl lg:text-5xl text-snugbug-dark">
              Thoughtfully Designed
            </h2>
          </motion.div>

          {/* Bento Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 auto-rows-fr"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`
                  ${feature.bg} ${feature.span}
                  rounded-2xl p-8 lg:p-10
                  shadow-sm
                  flex flex-col justify-center
                  cursor-default
                  border border-transparent hover:border-snugbug-red/10
                  transition-colors duration-300
                `}
              >
                <div className="text-snugbug-red mb-5">{feature.icon}</div>
                <h3 className="font-heading text-xl lg:text-2xl text-snugbug-dark mb-2">
                  {feature.title}
                </h3>
                <p className="font-body text-snugbug-gray text-base leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
