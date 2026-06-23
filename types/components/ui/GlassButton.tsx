"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "gold" | "glass" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function GlassButton({
  children,
  className = "",
  variant = "gold",
  size = "md",
  href,
  onClick,
  type = "button",
}: GlassButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variantClasses = {
    gold: "gold-gradient text-white shadow-lg",
    glass: "glass text-[var(--text-primary)]",
    outline: "border border-[var(--gold)] text-[var(--gold)] hover:bg-[rgba(212,175,55,0.1)]",
  };

  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-300 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <motion.a href={href} className={baseClasses} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} className={baseClasses} onClick={onClick} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
      {children}
    </motion.button>
  );
}
