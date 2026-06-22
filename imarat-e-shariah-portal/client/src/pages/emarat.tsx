import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";
import { useLeadership, type LeadershipMember } from "@/lib/api";

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function GoldParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 14 }).map((_, i) => (
        <div key={i} className="gold-particle" style={{
          left: `${Math.random() * 100}%`, bottom: `${Math.random() * 40}%`,
          animationDuration: `${4 + Math.random() * 6}s`, animationDelay: `${Math.random() * 5}s`,
        }} />
      ))}
    </div>
  );
}

const SECTION_META: Record<string, { titleUrdu: string; title: string; subtitle: string }> = {
  majlis: { titleUrdu: "مجلس امارت", title: "Majlis e Emarat", subtitle: "Current Leadership Council" },
  sabiq:  { titleUrdu: "سابق امراء", title: "Sabiq Umara", subtitle: "Former Amirs" },
  arkan:  { titleUrdu: "ارکان شوریٰ", title: "Arkan e Shura", subtitle: "Advisory Council Members" },
  umumi:  { titleUrdu: "مجلس عمومی", title: "Majlis e Umumi", subtitle: "General Assembly" },
};

const SECTION_ORDER = ["majlis", "sabiq", "arkan", "umumi"];

export default function Emarat() {
  const [openSection, setOpenSection] = useState<string | null>("majlis");
  const { theme } = useApp();
  const isDark = theme === "dark";

  const { data: allLeadership } = useLeadership();
  const members: LeadershipMember[] = allLeadership?.items ?? [];

  const grouped: Record<string, LeadershipMember[]> = {};
  for (const section of SECTION_ORDER) {
    grouped[section] = members.filter((m) => m.section === section);
  }

  const majlisMembers = grouped["majlis"] ?? [];

  return (
    <div className="min-h-screen" style={{ background: "var(--page-bg)" }}>
      <Navbar />

      <section className="section-dark islamic-pattern-dark pt-36 pb-20 px-6 text-center relative overflow-hidden" style={{ background: "#0A0A0A" }}>
        <GoldParticles />
        <div className="relative z-10">
          <Reveal>
            <div className="section-label justify-center" style={{ color: "#D4AF37" }}>Leadership</div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-white mb-3">Emarat e Shariya</h1>
            <p className="text-2xl mb-4" style={{ color: "#D4AF37", fontFamily: "'Noto Nastaliq Urdu', serif" }} dir="rtl">امارت شریعہ — قیادت</p>
            <p className="text-base max-w-xl mx-auto" style={{ color: "#888" }}>
              The scholarly leadership guiding Imarat-e-Shariah Karnataka through decades of Islamic jurisprudence and community service.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-5xl mx-auto mt-14">
            {majlisMembers.map((leader, i) => (
              <Reveal key={leader.name} delay={i * 0.1}>
                <motion.div className="glass-card-dark p-7 text-center"
                  style={{ border: "1px solid rgba(212,175,55,0.15)" }}
                  whileHover={{ scale: 1.02, boxShadow: "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.20)" }}
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}>
                  {leader.photoUrl ? (
                    <img src={leader.photoUrl} alt={leader.name} className="w-16 h-16 rounded-2xl object-cover mx-auto mb-5" style={{ border: "1px solid rgba(212,175,55,0.20)" }} />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl"
                      style={{ background: "rgba(212,175,55,0.10)", border: "1px solid rgba(212,175,55,0.20)" }}>ع</div>
                  )}
                  <p className="text-[10px] font-semibold tracking-widest uppercase mb-2" style={{ color: "#D4AF37" }}>{leader.role}</p>
                  <p className="text-[10px] mb-3" style={{ color: "rgba(212,175,55,0.55)", fontFamily: "'Noto Nastaliq Urdu', serif" }} dir="rtl">{leader.roleUrdu}</p>
                  <h3 className="text-[13.5px] font-bold text-white mb-2 leading-snug">{leader.name}</h3>
                  <p className="text-xs" dir="rtl" style={{ color: "#D4AF37", fontFamily: "'Noto Nastaliq Urdu', serif" }}>{leader.nameUrdu}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {SECTION_ORDER.map((sectionId, si) => {
            const meta = SECTION_META[sectionId];
            const sectionMembers = grouped[sectionId] ?? [];
            if (sectionMembers.length === 0) return null;

            return (
              <Reveal key={sectionId} delay={si * 0.07}>
                <div className="rounded-2xl overflow-hidden" style={{
                  background: isDark ? "rgba(18,18,18,0.90)" : "#fff",
                  border: isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)",
                  boxShadow: isDark ? "0 4px 24px rgba(0,0,0,0.4)" : "0 4px 24px rgba(0,0,0,0.05)",
                }}>
                  <button className="w-full flex items-center justify-between px-7 py-6 text-left"
                    style={{ background: openSection === sectionId ? "rgba(212,175,55,0.04)" : "transparent" }}
                    onClick={() => setOpenSection(openSection === sectionId ? null : sectionId)}>
                    <div>
                      <p className="text-sm mb-1" dir="rtl" style={{ color: "#D4AF37", fontFamily: "'Noto Nastaliq Urdu', serif" }}>{meta.titleUrdu}</p>
                      <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{meta.title}</h3>
                      <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>{meta.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: "rgba(212,175,55,0.10)", color: "#B8960C" }}>
                        <Users size={11} /> {sectionMembers.length}
                      </span>
                      <motion.div animate={{ rotate: openSection === sectionId ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                        <ChevronDown size={17} style={{ color: "#AAA" }} />
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {openSection === sectionId && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}>
                        <div className="px-7 pb-7" style={{ borderTop: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.05)" }}>
                          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {sectionMembers.map((m, i) => (
                              <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.06 }} className="flex items-start gap-4 p-4 rounded-xl"
                                style={{
                                  background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                                  border: isDark ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(0,0,0,0.04)",
                                }}>
                                {m.photoUrl ? (
                                  <img src={m.photoUrl} alt={m.name} className="w-10 h-10 rounded-xl object-cover shrink-0" />
                                ) : (
                                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm"
                                    style={{ background: "rgba(212,175,55,0.10)", color: "#D4AF37" }}>ع</div>
                                )}
                                <div>
                                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{m.name}</p>
                                  <p className="text-xs mt-0.5" dir="rtl" style={{ color: "#D4AF37", fontFamily: "'Noto Nastaliq Urdu', serif" }}>{m.nameUrdu}</p>
                                  <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{m.role}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
