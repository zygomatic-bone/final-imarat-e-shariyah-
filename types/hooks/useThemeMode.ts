"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function useThemeMode() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const isDark = mounted && resolvedTheme === "dark";
  const isLight = mounted && resolvedTheme === "light";

  return {
    theme: mounted ? theme : undefined,
    resolvedTheme: mounted ? resolvedTheme : undefined,
    systemTheme,
    setTheme,
    toggleTheme,
    isDark,
    isLight,
    mounted,
  };
}
