"use client";

import { useState } from "react";
import { FileText, Download, Newspaper } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import SectionReveal from "@/components/ui/SectionReveal";
import GlassButton from "@/components/ui/GlassButton";
import { MEDIA_ITEMS } from "@/lib/data";

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All" },
    { id: "report", label: "Reports" },
    { id: "document", label: "Documents" },
    { id: "press", label: "Press Releases" },
  ];

  const filtered = activeTab === "all" ? MEDIA_ITEMS : MEDIA_ITEMS.filter((item) => item.type === activeTab);

  const typeColors: Record<string, string> = {
    report: "rgba(59, 130, 246, 0.15)",
    document: "rgba(16, 185, 129, 0.15)",
    press: "rgba(212, 175, 55, 0.15)",
  };

  const typeTextColors: Record<string, string> = {
    report: "#3B82F6",
    document: "#10B981",
    press: "var(--gold)",
  };

  return (
    <div style={{ background: "var(--bg-primary)" }}>
      <PageHero
        title="Media"
        subtitle="Press releases, reports, and official documents"
        breadcrumb={["Home", "Media"]}
      />

      {/* Filter Tabs */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: activeTab === tab.id ? "rgba(212,175,55,0.15)" : "var(--card-bg)",
                  color: activeTab === tab.id ? "var(--gold)" : "var(--text-secondary)",
                  border: "1px solid",
                  borderColor: activeTab === tab.id ? "rgba(212,175,55,0.3)" : "var(--card-border)",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Media Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item, i) => (
              <SectionReveal key={item.id} delay={i * 0.08}>
                <GlassCard className="h-full">
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className="inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize"
                      style={{
                        background: typeColors[item.type] || "rgba(212,175,55,0.15)",
                        color: typeTextColors[item.type] || "var(--gold)",
                      }}
                    >
                      {item.type}
                    </span>
                    <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                      {new Date(item.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <h3 className="text-base font-bold mb-3" style={{ color: "var(--text-primary)" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                    {item.description}
                  </p>
                  <GlassButton variant="outline" size="sm">
                    {item.type === "document" ? (
                      <>
                        <Download size={14} /> Download
                      </>
                    ) : (
                      <>
                        Read More <FileText size={14} />
                      </>
                    )}
                  </GlassButton>
                </GlassCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <div className="section-label">Press Releases</div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-12" style={{ color: "var(--text-primary)" }}>
              Latest Announcements
            </h2>
          </SectionReveal>

          <div className="space-y-5">
            {MEDIA_ITEMS.filter((item) => item.type === "press").map((item, i) => (
              <SectionReveal key={item.id} delay={i * 0.08}>
                <GlassCard className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "rgba(212,175,55,0.1)" }}>
                    <Newspaper size={20} style={{ color: "var(--gold)" }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                        {item.title}
                      </h3>
                      <span className="text-xs ml-4 shrink-0" style={{ color: "var(--text-muted)" }}>
                        {new Date(item.date).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {item.description}
                    </p>
                  </div>
                </GlassCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <div className="section-label">Downloads</div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-12" style={{ color: "var(--text-primary)" }}>
              Official Documents
            </h2>
          </SectionReveal>

          <div className="space-y-4">
            {MEDIA_ITEMS.filter((item) => item.type === "document").map((item, i) => (
              <SectionReveal key={item.id} delay={i * 0.08}>
                <GlassCard className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(16,185,129,0.1)" }}>
                      <FileText size={18} style={{ color: "#10B981" }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                        {item.title}
                      </h3>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {new Date(item.date).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                  <GlassButton variant="outline" size="sm">
                    <Download size={14} /> Download
                  </GlassButton>
                </GlassCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
