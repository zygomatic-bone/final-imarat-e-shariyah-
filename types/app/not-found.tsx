"use client";

import { motion } from "framer-motion";
import { Home, ArrowRight } from "lucide-react";
import GlassButton from "@/components/ui/GlassButton";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="islamic-pattern absolute inset-0 pointer-events-none opacity-30" />
      <motion.div
        className="glass-card p-12 text-center max-w-lg relative z-10"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          className="text-8xl sm:text-9xl font-black gold-text mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          404
        </motion.p>
        <motion.h2
          className="text-2xl font-bold mb-3"
          style={{ color: "var(--text-primary)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Page Not Found
        </motion.h2>
        <motion.p
          className="text-base mb-8"
          style={{ color: "var(--text-secondary)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <GlassButton variant="gold" size="lg" href="/">
            <Home size={16} /> Return Home <ArrowRight size={14} />
          </GlassButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
