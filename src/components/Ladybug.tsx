"use client";

import { motion, useReducedMotion } from "framer-motion";

interface LadybugProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

export default function Ladybug({
  size = 120,
  className,
  animate = true,
}: LadybugProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animate && !prefersReducedMotion;

  // The original SVG viewBox content sits in a ~150x110 area.
  // We use a tight viewBox around the ladybug group.
  const viewBoxWidth = 160;
  const viewBoxHeight = 120;

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size * (viewBoxHeight / viewBoxWidth)}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      role="img"
      aria-label="SnugBug ladybug mascot"
      className={className}
      // Gentle floating bob on the whole SVG
      animate={
        shouldAnimate
          ? { y: [0, -2.5, 0, 2.5, 0] }
          : undefined
      }
      transition={
        shouldAnimate
          ? {
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut" as const,
              },
            }
          : undefined
      }
    >
      {/* ---- Body (red wing shell) ---- */}
      <motion.ellipse
        cx="78"
        cy="72"
        rx="42"
        ry="34"
        fill="#E03E36"
        stroke="#222222"
        strokeWidth="5"
        // Wing shimmer: subtle opacity pulse
        animate={
          shouldAnimate
            ? { opacity: [1, 0.88, 1] }
            : undefined
        }
        transition={
          shouldAnimate
            ? {
                opacity: {
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
                  repeatDelay: 2,
                },
              }
            : undefined
        }
      />

      {/* ---- Highlight spot for dimension ---- */}
      <circle cx="44" cy="47" r="6" fill="#FFFDF9" opacity={0.55} />

      {/* ---- Center line dividing wings ---- */}
      <line
        x1="82"
        y1="42"
        x2="82"
        y2="102"
        stroke="#222222"
        strokeWidth="4"
      />

      {/* ---- Spots ---- */}
      <circle cx="61" cy="59" r="5" fill="#222222" />
      <circle cx="58" cy="80" r="5" fill="#222222" />
      <circle cx="76" cy="88" r="5" fill="#222222" />
      <circle cx="95" cy="58" r="5" fill="#222222" />
      <circle cx="94" cy="89" r="5" fill="#222222" />

      {/* ---- Head ---- */}
      <ellipse
        cx="116"
        cy="74"
        rx="30"
        ry="30"
        fill="#222222"
        stroke="#222222"
        strokeWidth="4"
      />

      {/* ---- Antennae ---- */}
      {/* Left antenna */}
      <motion.g
        style={{ originX: "104px", originY: "55px" }}
        animate={
          shouldAnimate
            ? { rotate: [-3, 3, -3] }
            : undefined
        }
        transition={
          shouldAnimate
            ? {
                rotate: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
                },
              }
            : undefined
        }
      >
        <path
          d="M104 55 q8 -15 20 -17"
          fill="none"
          stroke="#222222"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="126" cy="36" r="4" fill="#222222" />
      </motion.g>

      {/* Right antenna */}
      <motion.g
        style={{ originX: "110px", originY: "57px" }}
        animate={
          shouldAnimate
            ? { rotate: [3, -3, 3] }
            : undefined
        }
        transition={
          shouldAnimate
            ? {
                rotate: {
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
                },
              }
            : undefined
        }
      >
        <path
          d="M110 57 q16 -22 24 -23"
          fill="none"
          stroke="#222222"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="136" cy="31" r="4" fill="#222222" />
      </motion.g>

      {/* ---- Eyes ---- */}
      <circle cx="110" cy="68" r="3.5" fill="#FFFDF9" />
      <circle cx="124" cy="68" r="3.5" fill="#FFFDF9" />

      {/* ---- Smile ---- */}
      <path
        d="M103 89 q11 10 23 0"
        fill="none"
        stroke="#FFFDF9"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}
