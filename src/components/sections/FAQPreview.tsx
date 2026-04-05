"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const faqs = [
  {
    question: "Is SnugBug safe for my child?",
    answer:
      "Absolutely. SnugBug is made from 100% natural cotton, is hypoallergenic, and was designed with pediatric guidance to ensure it meets the highest safety standards for children.",
  },
  {
    question: "What ages is SnugBug designed for?",
    answer:
      "SnugBug is designed for children ages 2\u201312, with sizing options tailored to different age groups so every child gets a comfortable, secure fit.",
  },
  {
    question: "How long can my child wear a SnugBug insert?",
    answer:
      "SnugBug is designed for short-term use, typically 15\u201330 minutes \u2014 just long enough to help manage a nosebleed comfortably before it naturally stops.",
  },
  {
    question: "Is it available without a prescription?",
    answer:
      "Yes! SnugBug is available over-the-counter. No prescription or doctor visit needed \u2014 just open the box and you\u2019re ready.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-5 text-left cursor-pointer"
      >
        <span className="font-heading text-lg text-snugbug-dark pr-4">
          {question}
        </span>
        <motion.svg
          className="w-5 h-5 text-snugbug-gray shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" as const }}
            className="overflow-hidden"
          >
            <p className="font-body text-snugbug-gray pb-5 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section className="bg-white py-20">
      <Container>
        <motion.h2
          className="font-heading text-3xl md:text-4xl text-snugbug-dark text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          className="font-body text-snugbug-gray text-center mb-12 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Everything you need to know before your first SnugBug.
        </motion.p>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="/faq"
            className="font-accent text-snugbug-red hover:underline transition-colors"
          >
            See all FAQs &rarr;
          </a>
        </motion.div>
      </Container>
    </Section>
  );
}
