"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string[];
}

export default function PageHero({ title, subtitle, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="islamic-pattern absolute inset-0 pointer-events-none opacity-50" />
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {breadcrumb && (
          <motion.div
            className="flex items-center justify-center gap-2 mb-4 text-xs font-medium"
            style={{ color: "var(--text-muted)" }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span style={{ color: "var(--gold)" }}>/</span>}
                <span style={{ color: i === breadcrumb.length - 1 ? "var(--gold)" : "var(--text-muted)" }}>
                  {item}
                </span>
              </span>
            ))}
          </motion.div>
        )}
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4"
          style={{ color: "var(--text-primary)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}
        <motion.div
          className="gold-divider w-24 mx-auto mt-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </div>
    </section>
  );
}
