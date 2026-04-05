"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef, type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
  href?: string;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<HTMLMotionProps<"button">, keyof ButtonBaseProps>;

type ButtonAsAnchor = ButtonBaseProps &
  Omit<HTMLMotionProps<"a">, keyof ButtonBaseProps>;

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-snugbug-red text-white shadow-md hover:shadow-lg hover:shadow-snugbug-red/30",
  secondary:
    "border-2 border-snugbug-red text-snugbug-red bg-transparent hover:bg-snugbug-red/5",
  ghost:
    "bg-transparent text-snugbug-dark hover:bg-snugbug-dark/5",
};

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    { variant = "primary", size = "md", children, className = "", href, ...rest },
    ref
  ) => {
    const classes = [
      "inline-flex items-center justify-center font-accent font-semibold rounded-full",
      "transition-colors duration-200 cursor-pointer select-none",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-snugbug-red",
      sizeClasses[size],
      variantClasses[variant],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const motionProps = {
      whileHover: { scale: 1.04 },
      whileTap: { scale: 0.97 },
      transition: { type: "spring" as const, stiffness: 400, damping: 17 },
    };

    if (href) {
      return (
        <motion.a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...motionProps}
          {...(rest as HTMLMotionProps<"a">)}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...motionProps}
        {...(rest as HTMLMotionProps<"button">)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
