"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useThemeMode } from "@/hooks/useThemeMode";

export default function ThemeToggle() {
  const { isDark, toggleTheme, mounted } = useThemeMode();

  if (!mounted) {
    return (
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)" }}
      />
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
      style={{
        background: isDark ? "rgba(212,175,55,0.1)" : "rgba(0,0,0,0.04)",
        border: "1px solid",
        borderColor: isDark ? "rgba(212,175,55,0.2)" : "rgba(0,0,0,0.08)",
        color: "var(--gold)",
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? <Sun size={14} /> : <Moon size={14} />}
        </motion.div>
      </AnimatePresence>
      <span className="hidden sm:inline">{isDark ? "Light Mode" : "Dark Mode"}</span>
    </motion.button>
  );
}
