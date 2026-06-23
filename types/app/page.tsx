"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Heart,
  GraduationCap,
  Users,
  MapPin,
  ChevronRight,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import SectionReveal from "@/components/ui/SectionReveal";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import StatCard from "@/components/ui/StatCard";
import GlassButton from "@/components/ui/GlassButton";
import AuroraRibbon from "@/components/aurora/AuroraRibbon";
import { FEATURES, STATS, BRANCHES, LEADERSHIP, GALLERY_IMAGES, MEDIA_ITEMS } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  BookOpen,
  Heart,
  GraduationCap,
  Users,
};

const categoryGradients: Record<string, string> = {
  events: "linear-gradient(135deg, #D4AF37 0%, #FFD8A8 100%)",
  judicial: "linear-gradient(135deg, #4169E1 0%, #6C5CE7 100%)",
  community: "linear-gradient(135deg, #2ECC71 0%, #00CEC9 100%)",
  education: "linear-gradient(135deg, #A29BFE 0%, #E84393 100%)",
  leadership: "linear-gradient(135deg, #D4AF37 0%, #F3D28B 100%)",
};

export default function HomePage() {
  return (
    <div style={{ background: "var(--bg-primary)" }}>
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
        <AuroraRibbon />
        <div className="islamic-pattern absolute inset-0 pointer-events-none opacity-50" />

        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-[11px] font-semibold tracking-widest uppercase"
            style={{
              background: "rgba(212,175,55,0.1)",
              border: "1px solid rgba(212,175,55,0.25)",
              color: "var(--gold)",
            }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#D4AF37" }}
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            Since 1971
          </motion.div>

          <div className="glass-card p-8 sm:p-12 lg:p-16">
            <motion.div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl sm:text-3xl gold-gradient shadow-xl mx-auto mb-8"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              ع
            </motion.div>

            <AnimatedHeading
              text="Imarat-e-Shariyah Karnataka"
              className="text-3xl sm:text-4xl lg:text-6xl mb-4"
              as="h1"
              delay={0.3}
            />

            <motion.p
              className="text-base sm:text-lg max-w-xl mx-auto mb-8"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Preserving Shariah. Serving Ummah. Building Harmony.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <GlassButton variant="gold" size="lg" href="/about">
                Explore More <ArrowRight size={16} />
              </GlassButton>
              <GlassButton variant="outline" size="lg" href="/branches">
                Our Branches
              </GlassButton>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase" style={{ color: "var(--text-muted)" }}>
            Scroll
          </span>
          <motion.div
            className="w-px h-8"
            style={{ background: "linear-gradient(to bottom,#D4AF37,transparent)" }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="section-label">Our Work</div>
            <AnimatedHeading text="What We Do" className="text-3xl sm:text-4xl lg:text-5xl mb-4" as="h2" />
            <p className="text-base max-w-2xl mb-14" style={{ color: "var(--text-secondary)" }}>
              Dedicated to serving the Muslim community through judicial excellence, education, and social welfare.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => {
              const Icon = iconMap[f.icon] || BookOpen;
              return (
                <SectionReveal key={f.title} delay={i * 0.08}>
                  <GlassCard className="h-full">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                      style={{ background: "rgba(212, 175, 55, 0.1)" }}
                    >
                      <Icon size={22} style={{ color: "var(--gold)" }} />
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                      {f.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {f.description}
                    </p>
                  </GlassCard>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map((s, i) => (
              <StatCard key={s.label} value={s.value} label={s.label} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP PREVIEW */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: "#0A0A0A" }}>
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="section-label" style={{ color: "#D4AF37" }}>
              Leadership
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 text-white">
              Guided by Scholars
            </h2>
            <p className="text-base max-w-2xl mb-14" style={{ color: "#888" }}>
              Eminent Islamic scholars carrying forward decades of wisdom and service.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {LEADERSHIP.slice(0, 3).map((leader, i) => (
              <SectionReveal key={leader.name} delay={i * 0.1}>
                <div
                  className="glass-card p-8 text-center reflection-sweep"
                  style={{ background: "rgba(14,14,14,0.8)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-6"
                    style={{
                      background: "rgba(212,175,55,0.12)",
                      border: "1px solid rgba(212,175,55,0.22)",
                      color: "#D4AF37",
                    }}
                  >
                    {leader.initials}
                  </div>
                  <p className="text-[11px] font-semibold tracking-widest uppercase mb-3" style={{ color: "#D4AF37" }}>
                    {leader.role}
                  </p>
                  <h3 className="text-[15px] font-bold text-white mb-2">{leader.name}</h3>
                  <p className="text-sm" style={{ color: "#777" }}>
                    {leader.bio}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <Link href="/leadership">
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold"
                style={{
                  background: "rgba(212,175,55,0.1)",
                  border: "1px solid rgba(212,175,55,0.25)",
                  color: "#D4AF37",
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Full Leadership <ArrowRight size={14} />
              </motion.button>
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* LATEST NEWS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="section-label">Latest</div>
            <AnimatedHeading text="News & Updates" className="text-3xl sm:text-4xl lg:text-5xl mb-4" as="h2" />
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {MEDIA_ITEMS.slice(0, 3).map((item, i) => (
              <SectionReveal key={item.id} delay={i * 0.08}>
                <GlassCard className="h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize"
                      style={{ background: "rgba(212,175,55,0.1)", color: "var(--gold)" }}
                    >
                      {item.type}
                    </span>
                    <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                      {new Date(item.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                    {item.title}
                  </h4>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {item.description}
                  </p>
                </GlassCard>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <Link href="/media">
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold"
                style={{
                  background: "rgba(212,175,55,0.08)",
                  border: "1px solid rgba(212,175,55,0.2)",
                  color: "var(--gold)",
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                All News & Updates <ArrowRight size={14} />
              </motion.button>
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="section-label">Gallery</div>
            <AnimatedHeading text="Our Moments" className="text-3xl sm:text-4xl lg:text-5xl mb-4" as="h2" />
            <p className="text-base max-w-2xl mb-14" style={{ color: "var(--text-secondary)" }}>
              Captured moments from events, sessions, and gatherings across Karnataka.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {GALLERY_IMAGES.slice(0, 6).map((img, i) => (
              <SectionReveal key={img.id} delay={i * 0.05}>
                <motion.div
                  className="h-40 sm:h-48 rounded-2xl relative overflow-hidden cursor-pointer"
                  style={{
                    background: categoryGradients[img.category] || categoryGradients.events,
                    border: "1px solid var(--card-border)",
                  }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="absolute inset-0 flex items-end p-3" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent 60%)" }}>
                    <p className="text-white text-[10px] sm:text-xs font-medium leading-tight">{img.title}</p>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <Link href="/gallery">
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold"
                style={{
                  background: "rgba(212,175,55,0.08)",
                  border: "1px solid rgba(212,175,55,0.2)",
                  color: "var(--gold)",
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Full Gallery <ArrowRight size={14} />
              </motion.button>
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* BRANCHES PREVIEW */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="section-label">Branches</div>
            <AnimatedHeading text="Our Presence" className="text-3xl sm:text-4xl lg:text-5xl mb-4" as="h2" />
            <p className="text-base max-w-2xl mb-14" style={{ color: "var(--text-secondary)" }}>
              Imarat-e-Shariyah has a presence across major cities in Karnataka.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {BRANCHES.slice(0, 4).map((branch, i) => (
              <SectionReveal key={branch.name} delay={i * 0.08}>
                <GlassCard className="h-full">
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(212,175,55,0.1)" }}
                    >
                      <MapPin size={16} style={{ color: "var(--gold)" }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                        {branch.name}
                      </h3>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {branch.city}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {branch.address}
                  </p>
                </GlassCard>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <Link href="/branches">
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold"
                style={{
                  background: "rgba(212,175,55,0.08)",
                  border: "1px solid rgba(212,175,55,0.2)",
                  color: "var(--gold)",
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View All Branches <ChevronRight size={14} />
              </motion.button>
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionReveal>
            <div className="glass-card p-8 sm:p-12 lg:p-16 text-center">
              <div className="section-label justify-center">Get In Touch</div>
              <AnimatedHeading text="Contact Us" className="text-3xl sm:text-4xl lg:text-5xl mb-4" as="h2" />
              <p className="text-base max-w-xl mx-auto mb-8" style={{ color: "var(--text-secondary)" }}>
                Reach out for inquiries, case filings, or general guidance. Our team is available Saturday through Thursday.
              </p>
              <GlassButton variant="gold" size="lg" href="/contact">
                Contact Us <ArrowRight size={16} />
              </GlassButton>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
