"use client";

import { Scale, BookOpen, Heart, Users } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import SectionReveal from "@/components/ui/SectionReveal";
import StatCard from "@/components/ui/StatCard";
import { ABOUT_TIMELINE, STATS } from "@/lib/data";

export default function AboutPage() {
  return (
    <div style={{ background: "var(--bg-primary)" }}>
      <PageHero
        title="About Us"
        subtitle="Learn about Imarat-e-Shariyah Karnataka's mission, vision, and history"
        breadcrumb={["Home", "About Us"]}
      />

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SectionReveal>
              <GlassCard className="h-full">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: "rgba(212,175,55,0.1)" }}>
                  <Scale size={22} style={{ color: "var(--gold)" }} />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Our Mission</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  To preserve and uphold Shariah principles while serving the Muslim community of Karnataka through judicial excellence, educational initiatives, and social welfare programs. We strive to provide accessible Islamic justice and guidance rooted in the Quran and Sunnah.
                </p>
              </GlassCard>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <GlassCard className="h-full">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: "rgba(212,175,55,0.1)" }}>
                  <BookOpen size={22} style={{ color: "var(--gold)" }} />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Our Vision</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  To be the leading Islamic judicial authority in Karnataka, fostering justice, education, and harmony across the state. We envision a community united by faith, empowered by knowledge, and guided by Islamic principles.
                </p>
              </GlassCard>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-4xl mx-auto">
          <SectionReveal>
            <div className="section-label">Our Story</div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6" style={{ color: "var(--text-primary)" }}>
              A Legacy of Service
            </h2>
            <div className="glass-card p-8">
              <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                Founded in 1971, Imarat-e-Shariyah Karnataka began as a visionary initiative to establish a supreme Islamic judicial authority for the Muslim community. What started as a single judicial body has grown into a statewide network serving over 25 branches with more than 50 eminent scholars.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Over five decades, we have remained committed to delivering Sharia-based justice, promoting Islamic education, and fostering community welfare. Our journey reflects the dedication of generations of scholars who have served with wisdom, integrity, and devotion to the Ummah.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="section-label">Our Objectives</div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-12" style={{ color: "var(--text-primary)" }}>
              What We Stand For
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Scale, title: "Shariah Justice", desc: "Delivering fair and just rulings according to Islamic law." },
              { icon: BookOpen, title: "Education", desc: "Promoting Islamic knowledge and scholarly research." },
              { icon: Heart, title: "Community Welfare", desc: "Serving the needs of the Muslim community with compassion." },
              { icon: Users, title: "Unity", desc: "Fostering unity and harmony within the Ummah." },
            ].map((obj, i) => (
              <SectionReveal key={obj.title} delay={i * 0.08}>
                <GlassCard className="h-full text-center">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(212,175,55,0.1)" }}>
                    <obj.icon size={24} style={{ color: "var(--gold)" }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>{obj.title}</h3>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{obj.desc}</p>
                </GlassCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <div className="section-label">Timeline</div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-12 text-center" style={{ color: "var(--text-primary)" }}>
              Our Journey
            </h2>
          </SectionReveal>

          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, var(--gold), transparent)" }} />

            {ABOUT_TIMELINE.map((item, i) => (
              <SectionReveal key={item.year} delay={i * 0.05}>
                <div className={`relative flex flex-col sm:flex-row items-start mb-8 ${i % 2 === 0 ? "sm:flex-row-reverse" : ""}`}>
                  <div className="absolute left-4 sm:left-1/2 w-3 h-3 rounded-full -translate-x-1.5 sm:-translate-x-1.5 mt-6" style={{ background: "var(--gold)" }} />
                  <div className={`ml-12 sm:ml-0 sm:w-1/2 ${i % 2 === 0 ? "sm:pr-12" : "sm:pl-12"}`}>
                    <GlassCard>
                      <p className="text-2xl font-black gold-text mb-2">{item.year}</p>
                      <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{item.description}</p>
                    </GlassCard>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map((s, i) => (
              <StatCard key={s.label} value={s.value} label={s.label} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
