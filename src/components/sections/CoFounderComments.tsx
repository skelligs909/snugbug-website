"use client";

import { useState, useEffect, useTransition } from "react";
import { submitComment, fetchComments } from "@/app/actions";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  "Hero",
  "Problem/Solution",
  "How It Works",
  "Product Features",
  "Trust Signals",
  "Founder Story",
  "FAQ",
  "Footer/CTA",
  "General",
];

interface Comment {
  id: string;
  section: string;
  author: string;
  content: string;
  createdAt: string;
}

function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function CoFounderComments() {
  const [activeSection, setActiveSection] = useState("General");
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();
  const [showSuccess, setShowSuccess] = useState(false);

  // Load author from localStorage on mount
  useEffect(() => {
    const savedAuthor = localStorage.getItem("cofounder-comment-author");
    if (savedAuthor) setAuthor(savedAuthor);
  }, []);

  // Save author to localStorage when it changes
  useEffect(() => {
    if (author) {
      localStorage.setItem("cofounder-comment-author", author);
    }
  }, [author]);

  // Load comments when section changes
  useEffect(() => {
    async function loadComments() {
      try {
        const data = await fetchComments(activeSection);
        setComments((data.comments ?? []) as Comment[]);
      } catch {
        setComments([]);
      }
    }
    loadComments();
  }, [activeSection]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    const formData = new FormData();
    formData.append("section", activeSection);
    formData.append("author", author.trim());
    formData.append("content", content.trim());

    startTransition(async () => {
      try {
        await submitComment(formData);
        setContent("");
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
        // Refresh comments
        const data = await fetchComments(activeSection);
        setComments((data.comments ?? []) as Comment[]);
      } catch {
        // Handle error silently
      }
    });
  }

  return (
    <Section className="bg-snugbug-cream">
      <Container>
        <div className="mx-auto max-w-[600px]">
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="font-heading text-3xl text-snugbug-dark">
              Co-Founder Feedback
            </h2>
            <p className="mt-2 font-body text-snugbug-gray">
              Leave comments on any aspect of the website
            </p>
          </div>

          {/* Section Tabs */}
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {SECTIONS.map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-body transition-colors ${
                  activeSection === section
                    ? "bg-snugbug-red text-white"
                    : "border border-snugbug-gray/30 bg-white text-snugbug-dark hover:border-snugbug-red/50"
                }`}
              >
                {section}
              </button>
            ))}
          </div>

          {/* Comment Form */}
          <div className="mb-8 rounded-2xl border border-snugbug-gray/20 bg-white p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full rounded-lg border border-snugbug-gray/30 px-4 py-2 font-body text-snugbug-dark placeholder:text-snugbug-gray/60 focus:border-snugbug-red focus:outline-none focus:ring-1 focus:ring-snugbug-red"
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder={`Comment on "${activeSection}"...`}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={3}
                  className="w-full resize-none rounded-lg border border-snugbug-gray/30 px-4 py-2 font-body text-snugbug-dark placeholder:text-snugbug-gray/60 focus:border-snugbug-red focus:outline-none focus:ring-1 focus:ring-snugbug-red"
                  required
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-full bg-snugbug-red px-6 py-2 font-accent text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {isPending ? "Saving..." : "Submit Comment"}
                </button>
                <AnimatePresence>
                  {showSuccess && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-body text-green-600"
                    >
                      Comment saved!
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {comments.length === 0 ? (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-8 text-center font-body text-snugbug-gray"
                >
                  No comments yet for this section
                </motion.p>
              ) : (
                comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-2xl border border-snugbug-gray/20 bg-white p-5"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="font-heading text-sm font-bold text-snugbug-dark">
                        {comment.author}
                      </span>
                      <span className="rounded-full bg-snugbug-sky px-2 py-0.5 text-xs font-body text-snugbug-dark">
                        {comment.section}
                      </span>
                      <span className="ml-auto text-xs font-body text-snugbug-gray">
                        {timeAgo(comment.createdAt)}
                      </span>
                    </div>
                    <p className="font-body text-sm leading-relaxed text-snugbug-dark">
                      {comment.content}
                    </p>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  );
}
