"use client";

import { useState } from "react";
import { Search, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import SectionReveal from "@/components/ui/SectionReveal";
import { BRANCHES } from "@/lib/data";

export default function BranchesPage() {
  const [search, setSearch] = useState("");

  const filtered = BRANCHES.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.city.toLowerCase().includes(search.toLowerCase()) ||
      b.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: "var(--bg-primary)" }}>
      <PageHero
        title="Our Branches"
        subtitle="Imarat-e-Shariyah Karnataka has a presence across major cities"
        breadcrumb={["Home", "Our Branches"]}
      />

      {/* Search */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card p-2">
            <div className="flex items-center gap-3 px-4">
              <Search size={18} style={{ color: "var(--text-muted)" }} />
              <input
                type="text"
                placeholder="Search by branch name, city, or address..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 py-3 bg-transparent outline-none text-sm"
                style={{ color: "var(--text-primary)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Branches Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg" style={{ color: "var(--text-muted)" }}>No branches found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((branch, i) => (
                <SectionReveal key={branch.name} delay={i * 0.05}>
                  <GlassCard className="h-full">
                    <div className="flex items-start gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "rgba(212,175,55,0.1)" }}
                      >
                        <MapPin size={16} style={{ color: "var(--gold)" }} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                          {branch.name}
                        </h3>
                        <p className="text-xs font-semibold" style={{ color: "var(--gold)" }}>
                          {branch.city}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-3">
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        {branch.address}
                      </p>
                      <div className="flex items-center gap-2">
                        <Phone size={12} style={{ color: "var(--gold)" }} />
                        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                          {branch.phone}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </SectionReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <GlassCard className="p-12 text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(212,175,55,0.1)" }}>
                <MapPin size={28} style={{ color: "var(--gold)" }} />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
                Interactive Map Coming Soon
              </h3>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                A detailed interactive map showing all branch locations across Karnataka will be available soon.
              </p>
            </GlassCard>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
