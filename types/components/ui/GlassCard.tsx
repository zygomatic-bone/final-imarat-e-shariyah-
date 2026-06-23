"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  onClick?: () => void;
}

export default function GlassCard({ children, className = "", hover = true, delay = 0, onClick }: GlassCardProps) {
  return (
    <motion.div
      className={`glass-card reflection-sweep p-6 ${onClick ? "cursor-pointer" : ""} ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hover ? { y: -4, transition: { duration: 0.3 } } : undefined}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
