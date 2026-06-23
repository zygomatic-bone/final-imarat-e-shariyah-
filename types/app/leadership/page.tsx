"use client";

import PageHero from "@/components/ui/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import SectionReveal from "@/components/ui/SectionReveal";
import { LEADERSHIP } from "@/lib/data";

export default function LeadershipPage() {
  const president = LEADERSHIP[0];
  const others = LEADERSHIP.slice(1);

  return (
    <div style={{ background: "var(--bg-primary)" }}>
      <PageHero
        title="Leadership"
        subtitle="Guided by eminent Islamic scholars carrying forward decades of wisdom"
        breadcrumb={["Home", "Leadership"]}
      />

      {/* President */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionReveal>
            <GlassCard className="p-8 sm:p-12 text-center">
              <div
                className="w-24 h-24 rounded-3xl flex items-center justify-center text-3xl font-bold mx-auto mb-6"
                style={{
                  background: "rgba(212,175,55,0.12)",
                  border: "2px solid rgba(212,175,55,0.3)",
                  color: "var(--gold)",
                }}
              >
                {president.initials}
              </div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
                {president.role}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                {president.name}
              </h2>
              <p className="text-base leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
                {president.bio}
              </p>
            </GlassCard>
          </SectionReveal>
        </div>
      </section>

      {/* Majlis Members */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="section-label">Majlis</div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-12" style={{ color: "var(--text-primary)" }}>
              Our Scholars
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {others.map((leader, i) => (
              <SectionReveal key={leader.name} delay={i * 0.08}>
                <GlassCard className="text-center h-full">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4"
                    style={{
                      background: "rgba(212,175,55,0.12)",
                      border: "1px solid rgba(212,175,55,0.22)",
                      color: "var(--gold)",
                    }}
                  >
                    {leader.initials}
                  </div>
                  <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--gold)" }}>
                    {leader.role}
                  </p>
                  <h3 className="text-base font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                    {leader.name}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {leader.bio}
                  </p>
                </GlassCard>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <GlassCard className="p-8">
              <h3 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                Majlis-e-Shoora
              </h3>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                The Majlis-e-Shoora (Consultative Council) is the governing body of Imarat-e-Shariyah Karnataka, comprising eminent scholars and community leaders. The council meets regularly to discuss organizational matters, provide religious guidance, and ensure the institution remains true to its mission of serving the Muslim community with justice, wisdom, and compassion.
              </p>
            </GlassCard>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
