"use client";

import GlassCard from "./GlassCard";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export default function FeatureCard({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <GlassCard delay={delay} className="h-full">
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: "rgba(212, 175, 55, 0.1)" }}
      >
        <Icon size={22} style={{ color: "var(--gold)" }} />
      </div>
      <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {description}
      </p>
    </GlassCard>
  );
}
