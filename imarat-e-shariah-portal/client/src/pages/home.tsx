import { useRef, useState } from "react";
import { Link } from "wouter";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight, ArrowUpRight, BookOpen, Building2, Calendar,
  Globe, Mail, MapPin, Phone, Scale, Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MeshGradient from "@/components/MeshGradient";
import { useApp } from "@/context/AppContext";
import { useMousePosition } from "@/hooks/useMouse";
import {
  useListNewsArticles,
  useLeadership,
  useGallery,
  type NewsArticle,
  type LeadershipMember,
  type GalleryImage,
} from "@/lib/api";

/* ── Word Reveal ── */
function WordReveal({ text, delay = 0, style = {} }: { text: string; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const words = text.split(" ");
  return (
    <span ref={ref} style={style}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: "0.28em" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0, filter: "blur(6px)" }}
            animate={inView ? { y: 0, opacity: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.65, delay: delay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ── Scroll Reveal ── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Tilt Card ── */
function TiltCard({ children, className = "", dark = false }: { children: React.ReactNode; className?: string; dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -y * 7, y: x * 7 });
  };

  return (
    <motion.div
      ref={ref}
      className={`reflection-sweep ${dark ? "glass-card-dark" : "glass-card"} ${className}`}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: hovered ? 1.02 : 1,
        boxShadow: hovered
          ? dark
            ? "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.15)"
            : "0 24px 60px rgba(0,0,0,0.11), 0 8px 20px rgba(0,0,0,0.07)"
          : undefined,
      }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
      style={{ transformStyle: "preserve-3d", perspective: 900 }}
    >
      {children}
    </motion.div>
  );
}

/* ── Magnetic Button ── */
function MagneticBtn({
  children, className = "", style = {}, href, onClick,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.25;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
    el.style.transition = "transform 0.12s ease-out";
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) { el.style.transform = "translate(0,0)"; el.style.transition = "transform 0.5s cubic-bezier(0.22,1,0.36,1)"; }
  };

  const props = { ref, className, style, onMouseMove: handleMove, onMouseLeave: handleLeave, onClick };

  if (href) {
    return <a {...props} href={href}>{children}</a>;
  }
  return <button {...props}>{children}</button>;
}

/* ── Dark Gold Particles ── */
function GoldParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="gold-particle"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 30}%`,
            animationDuration: `${4 + Math.random() * 6}s`,
            animationDelay: `${Math.random() * 5}s`,
            width: Math.random() > 0.7 ? "3px" : "1.5px",
            height: Math.random() > 0.7 ? "3px" : "1.5px",
            opacity: 0.6 + Math.random() * 0.4,
          }}
        />
      ))}
    </div>
  );
}

/* ── Department data (structural, not CMS-managed) ── */
const DEPTS = [
  { icon: Scale,    title: "Darul Qaza",        titleUrdu: "دارالقضاء",    desc: "Islamic judicial court resolving disputes according to Sharia." },
  { icon: BookOpen, title: "Darul Ifta",         titleUrdu: "دارالافتاء",   desc: "Authoritative fatwa council for religious rulings and guidance." },
  { icon: Users,    title: "Mushawarat",         titleUrdu: "مشاورت",       desc: "Community counsel and mediation services." },
  { icon: Globe,    title: "Tabligh wa Irshad",  titleUrdu: "تبلیغ و ارشاد", desc: "Outreach, education, and guidance across Karnataka." },
  { icon: Building2,title: "Idara e Taleemi",    titleUrdu: "ادارہ تعلیمی", desc: "Educational initiatives and madrassa oversight." },
  { icon: Calendar, title: "Media & Publications",titleUrdu: "میڈیا و اشاعت", desc: "Official communications and Islamic publications." },
];

export default function Home() {
  const mouse = useMousePosition();
  const heroRef = useRef(null);
  const { theme, t, settings } = useApp();
  const isDark = theme === "dark";
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [formSending, setFormSending] = useState(false);
  const [formError, setFormError] = useState("");

  /* ── Fetch from API ── */
  const { data: newsData } = useListNewsArticles({ limit: 4 });
  const { data: leadershipData } = useLeadership("majlis");
  const { data: galleryData } = useGallery();

  const newsArticles: NewsArticle[] = newsData?.items ?? [];
  const leaders: LeadershipMember[] = (leadershipData?.items ?? []).slice(0, 3);
  const galleryImages: GalleryImage[] = galleryData?.items ?? [];

  /* ── Build stats from settings ── */
  const STATS = settings ? [
    { value: settings.stat_1_value || "1971", label: settings.stat_1_label || "Founded", labelUrdu: settings.stat_1_label_urdu || "قیام" },
    { value: settings.stat_2_value || "20+", label: settings.stat_2_label || "Branches", labelUrdu: settings.stat_2_label_urdu || "شاخیں" },
    { value: settings.stat_3_value || "6", label: settings.stat_3_label || "Departments", labelUrdu: settings.stat_3_label_urdu || "شعبے" },
    { value: settings.stat_4_value || "50+", label: settings.stat_4_label || "Years Serving", labelUrdu: settings.stat_4_label_urdu || "سال خدمت" },
  ] : [
    { value: "1971", label: "Founded", labelUrdu: "قیام" },
    { value: "20+", label: "Branches", labelUrdu: "شاخیں" },
    { value: "6", label: "Departments", labelUrdu: "شعبے" },
    { value: "50+", label: "Years Serving", labelUrdu: "سال خدمت" },
  ];

  /* ── Build ticker from settings ── */
  let TICKER: string[] = [];
  try {
    TICKER = settings?.ticker_items ? JSON.parse(settings.ticker_items) : [];
  } catch {
    TICKER = [];
  }

  const heroTitle = settings?.hero_title || "Imarat-e-Shariah";
  const heroSub = settings?.hero_subtitle || "A Supreme Islamic Judicial Authority";
  const heroDesc = settings?.hero_description || "اعلیٰ دینی عدالتی ادارہ — بنگلور، کرناٹک";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSending(true);
    setFormError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to send");
      setFormSent(true);
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setFormSending(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--page-bg)" }}>
      <Navbar />

      {/* ══ HERO ══ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ background: "var(--page-bg)" }}
      >
        <MeshGradient />
        <div className={`${isDark ? "islamic-pattern-dark" : "islamic-pattern"} absolute inset-0 pointer-events-none`} />
        {isDark && <GoldParticles />}
        <div className="light-streak" style={{ left: "18%", animationDelay: "0s" }} />
        <div className="light-streak" style={{ left: "72%", animationDelay: "2.8s" }} />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, paddingTop: "5rem" }}
          className="relative z-10 w-full text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-[11px] font-semibold tracking-widest uppercase"
            style={{
              background: isDark ? "rgba(212,175,55,0.12)" : "rgba(212,175,55,0.10)",
              border: "1px solid rgba(212,175,55,0.25)",
              color: "#B8960C",
            }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#D4AF37" }}
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            {t("badge")}
          </motion.div>

          <div
            className="select-none overflow-hidden px-2"
            style={{
              fontFamily: "'Noto Nastaliq Urdu', serif",
              color: "#D4AF37",
              fontSize: "clamp(4.5rem, 17vw, 15rem)",
              lineHeight: 1.18,
              textShadow: "0 0 120px rgba(212,175,55,0.28), 0 0 40px rgba(212,175,55,0.15)",
              marginBottom: "0.15em",
            }}
            dir="rtl"
          >
            <WordReveal text={heroDesc} delay={0.15} />
          </div>

          <h1
            className="font-black tracking-tight mb-6 leading-none px-6"
            style={{
              color: "var(--text-primary)",
              fontSize: "clamp(2.2rem, 6.5vw, 5.5rem)",
            }}
          >
            <WordReveal text={heroTitle} delay={0.3} />
          </h1>

          <motion.p
            className="text-lg sm:text-xl max-w-xl mx-auto mb-3"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.7 }}
          >
            {heroSub}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 1.0 }}
          >
            <Link href="/taruf">
              <MagneticBtn
                className="flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-semibold text-white"
                style={{
                  background: "linear-gradient(135deg,#D4AF37 0%,#B8960C 100%)",
                  boxShadow: "0 8px 32px rgba(212,175,55,0.28)",
                }}
              >
                {t("explore")} <ArrowRight size={14} />
              </MagneticBtn>
            </Link>
            <Link href="/news">
              <MagneticBtn
                className="flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-semibold"
                style={{
                  background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                  border: isDark ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(0,0,0,0.10)",
                  color: "var(--text-primary)",
                }}
              >
                {t("latest")} <ArrowUpRight size={14} />
              </MagneticBtn>
            </Link>
          </motion.div>

          {/* Floating stat panels */}
          <div className="relative mt-16 h-44 hidden lg:block">
            {STATS.map((s, i) => {
              const offsets = [
                { x: -340, y: -10 },
                { x: -110, y: 28 },
                { x: 100,  y: 10 },
                { x: 320,  y: -18 },
              ];
              const depths = [0.016, 0.028, 0.020, 0.013];
              const off = offsets[i];
              const d   = depths[i];
              const mx  = typeof window !== "undefined" ? (mouse.x - window.innerWidth  / 2) * d : 0;
              const my  = typeof window !== "undefined" ? (mouse.y - window.innerHeight / 2) * d : 0;
              return (
                <motion.div
                  key={s.label}
                  className={isDark ? "glass-card-dark" : "glass-card"}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    minWidth: 118,
                    padding: "16px 20px",
                    textAlign: "center",
                    ...(isDark ? { border: "1px solid rgba(212,175,55,0.15)" } : {}),
                  }}
                  initial={{ opacity: 0, x: off.x - 59, y: off.y - 44 }}
                  animate={{
                    opacity: 1,
                    x: off.x - 59 + mx,
                    y: off.y - 44 + my,
                  }}
                  transition={
                    i === 0
                      ? { duration: 0.7, delay: 1.2 }
                      : { type: "spring", stiffness: 55, damping: 18, delay: i * 0.06 }
                  }
                >
                  <p className="text-2xl font-black" style={{ color: "#D4AF37" }}>{s.value}</p>
                  <p className="text-[10px] font-semibold tracking-wide uppercase mt-1" style={{ color: "var(--text-muted)" }}>
                    {s.label}
                  </p>
                  <p className="text-[10px] mt-0.5" style={{ color: "rgba(212,175,55,0.65)", fontFamily: "'Noto Nastaliq Urdu', serif" }}>
                    {s.labelUrdu}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase" style={{ color: "var(--text-muted)" }}>
            {t("scroll")}
          </span>
          <motion.div
            className="w-px h-8"
            style={{ background: "linear-gradient(to bottom,#D4AF37,transparent)" }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ══ TICKER ══ */}
      {TICKER.length > 0 && (
        <div
          className="overflow-hidden py-3"
          style={{
            background: "#0D0D0D",
            borderTop: "1px solid rgba(212,175,55,0.14)",
            borderBottom: "1px solid rgba(212,175,55,0.14)",
          }}
        >
          <div className="ticker-track">
            {[...TICKER, ...TICKER].map((item, i) => (
              <span key={i} className="text-[12px] font-medium px-8" style={{ color: "#999" }}>
                <span className="mr-8" style={{ color: "#D4AF37" }}>◆</span>
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ══ STATS — MOBILE ══ */}
      <section className="lg:hidden py-12 px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div
                className={isDark ? "glass-card-dark" : "glass-card"}
                style={{ padding: "20px 16px", textAlign: "center" }}
              >
                <p className="text-2xl font-black" style={{ color: "#D4AF37" }}>{s.value}</p>
                <p className="text-[11px] font-semibold uppercase tracking-wide mt-1" style={{ color: "var(--text-muted)" }}>
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ DEPARTMENTS ══ */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="section-label">Our Work</div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4" style={{ color: "var(--text-primary)" }}>
              <WordReveal text="Departments & Services" />
            </h2>
            <p className="text-base max-w-xl mb-14" style={{ color: "var(--text-secondary)" }}>
              Six specialised divisions serving the Muslim community across Karnataka.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DEPTS.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.07}>
                <TiltCard className="p-7 h-full" dark={isDark}>
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: isDark ? "rgba(212,175,55,0.12)" : "rgba(212,175,55,0.10)" }}
                  >
                    <d.icon size={20} style={{ color: "#D4AF37" }} />
                  </div>
                  <p className="text-sm mb-1" dir="rtl" style={{ color: "#D4AF37", fontFamily: "'Noto Nastaliq Urdu', serif" }}>
                    {d.titleUrdu}
                  </p>
                  <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>{d.title}</h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>{d.desc}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ LEADERSHIP — DARK ══ */}
      <section
        className="section-dark islamic-pattern-dark py-24 px-6 relative overflow-hidden"
        style={{ background: "#0A0A0A" }}
      >
        <GoldParticles />
        <div className="relative z-10 max-w-7xl mx-auto">
          <Reveal>
            <div className="section-label" style={{ color: "#D4AF37" }}>Leadership</div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-3 text-white">
              <WordReveal text="Guided by Scholars" />
            </h2>
            <p className="text-base max-w-xl mb-14" style={{ color: "#888" }}>
              Imarat-e-Shariah Karnataka is led by eminent Islamic scholars carrying forward decades of wisdom and service.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {leaders.map((leader, i) => (
              <Reveal key={leader.name} delay={i * 0.1}>
                <TiltCard className="p-8" dark>
                  {leader.photoUrl ? (
                    <img src={leader.photoUrl} alt={leader.name} className="w-16 h-16 rounded-2xl object-cover mb-6 mx-auto" style={{ border: "1px solid rgba(212,175,55,0.22)" }} />
                  ) : (
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-2xl mx-auto"
                      style={{ background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.22)" }}
                    >
                      ع
                    </div>
                  )}
                  <p className="text-[11px] font-semibold tracking-widest uppercase mb-3" style={{ color: "#D4AF37" }}>
                    {leader.role}
                  </p>
                  <p className="text-[11px] mb-3" style={{ color: "rgba(212,175,55,0.65)", fontFamily: "'Noto Nastaliq Urdu', serif" }} dir="rtl">
                    {leader.roleUrdu}
                  </p>
                  <h3 className="text-[15px] font-bold text-white mb-2 leading-snug">{leader.name}</h3>
                  <p className="text-sm" dir="rtl" style={{ color: "#D4AF37", fontFamily: "'Noto Nastaliq Urdu', serif" }}>
                    {leader.nameUrdu}
                  </p>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <Link href="/emarat">
              <motion.button
                className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold"
                style={{
                  background: "rgba(212,175,55,0.10)",
                  border: "1px solid rgba(212,175,55,0.25)",
                  color: "#D4AF37",
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Full Leadership <ArrowRight size={14} />
              </motion.button>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══ FEATURED NEWS — DARK ══ */}
      <section className="section-dark py-24 px-6 relative overflow-hidden" style={{ background: "#0F0F0F" }}>
        <div className="relative z-10 max-w-7xl mx-auto">
          <Reveal>
            <div className="section-label" style={{ color: "#D4AF37" }}>Latest</div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-white">
              <WordReveal text="News & Updates" />
            </h2>
          </Reveal>

          {newsArticles.length > 0 && (
            <>
              <Reveal delay={0.1}>
                <TiltCard className="mb-6 p-8 sm:p-12" dark>
                  <div className="max-w-2xl">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5"
                      style={{ background: "rgba(212,175,55,0.12)", color: "#D4AF37" }}
                    >
                      {newsArticles[0].tag}
                    </span>
                    <p className="text-xs mb-3" style={{ color: "#555" }}>
                      {new Date(newsArticles[0].publishedAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 leading-snug">{newsArticles[0].title}</h3>
                    {newsArticles[0].titleUrdu && (
                      <p className="text-base mb-3" dir="rtl" style={{ color: "#D4AF37", fontFamily: "'Noto Nastaliq Urdu', serif" }}>
                        {newsArticles[0].titleUrdu}
                      </p>
                    )}
                    <p className="text-sm mb-8 leading-relaxed" style={{ color: "#888" }}>{newsArticles[0].excerpt}</p>
                    <Link href="/news">
                      <motion.button
                        className="flex items-center gap-2 text-sm font-semibold"
                        style={{ color: "#D4AF37" }}
                        whileHover={{ x: 4 }}
                      >
                        Read Full Article <ArrowRight size={14} />
                      </motion.button>
                    </Link>
                  </div>
                </TiltCard>
              </Reveal>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {newsArticles.slice(1, 4).map((item, i) => (
                  <Reveal key={item.id} delay={i * 0.08}>
                    <TiltCard className="p-6 h-full" dark>
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className="inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold"
                          style={{ background: "rgba(212,175,55,0.10)", color: "#D4AF37" }}
                        >
                          {item.tag}
                        </span>
                        <span className="text-[11px]" style={{ color: "#555" }}>
                          {new Date(item.publishedAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-2 leading-snug">{item.title}</h4>
                      {item.titleUrdu && (
                        <p className="text-xs mb-3" dir="rtl" style={{ color: "rgba(212,175,55,0.65)", fontFamily: "'Noto Nastaliq Urdu', serif" }}>
                          {item.titleUrdu}
                        </p>
                      )}
                      <p className="text-[12px] leading-relaxed" style={{ color: "#777" }}>{item.excerpt}</p>
                    </TiltCard>
                  </Reveal>
                ))}
              </div>
            </>
          )}

          <Reveal delay={0.2}>
            <div className="mt-8">
              <Link href="/news">
                <motion.button
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold"
                  style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.20)", color: "#D4AF37" }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  All News & Updates <ArrowRight size={14} />
                </motion.button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ GALLERY ══ */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="section-label">Gallery</div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4" style={{ color: "var(--text-primary)" }}>
              <WordReveal text="Our Moments" />
            </h2>
            <p className="text-base max-w-xl mb-14" style={{ color: "var(--text-secondary)" }}>
              Captured moments from judicial sessions, conferences, and community gatherings across Karnataka.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {galleryImages.length > 0 ? (
              galleryImages.slice(0, 8).map((item, i) => (
                <Reveal key={item.id} delay={i * 0.05}>
                  <motion.div
                    className={`${i % 3 === 0 ? "h-72" : i % 3 === 1 ? "h-52" : "h-40"} rounded-2xl relative overflow-hidden cursor-pointer`}
                    style={{
                      background: isDark
                        ? i % 3 === 0 ? "rgba(212,175,55,0.07)" : i % 3 === 1 ? "rgba(255,255,255,0.03)" : "rgba(212,175,55,0.04)"
                        : i % 3 === 0 ? "rgba(212,175,55,0.08)" : i % 3 === 1 ? "rgba(0,0,0,0.04)" : "rgba(212,175,55,0.05)",
                      border: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.06)",
                    }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    {item.url ? (
                      <img src={item.url} alt={item.caption} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl opacity-20" style={{ color: "#D4AF37" }}>ع</span>
                      </div>
                    )}
                    <motion.div
                      className="absolute inset-0 flex items-end p-4"
                      style={{ background: "linear-gradient(to top,rgba(0,0,0,0.55) 0%,transparent 60%)" }}
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <p className="text-white text-xs font-medium">{item.caption}</p>
                    </motion.div>
                  </motion.div>
                </Reveal>
              ))
            ) : (
              Array.from({ length: 8 }).map((_, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <motion.div
                    className={`${i % 3 === 0 ? "h-72" : i % 3 === 1 ? "h-52" : "h-40"} rounded-2xl relative overflow-hidden cursor-pointer`}
                    style={{
                      background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)",
                      border: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.06)",
                    }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl opacity-20" style={{ color: "#D4AF37" }}>ع</span>
                    </div>
                  </motion.div>
                </Reveal>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section
        id="contact"
        className="py-24 px-6"
        style={{ background: isDark ? "#0A0A0A" : "#F4F4F4" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <Reveal>
              <div className="section-label">Get In Touch</div>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-5" style={{ color: "var(--text-primary)" }}>
                <WordReveal text="Contact Us" />
              </h2>
              <p className="text-base mb-10" style={{ color: "var(--text-secondary)" }}>
                Reach out for inquiries, case filings, or general guidance. Our team is available Saturday through Thursday.
              </p>
              <div className="space-y-6">
                {[
                  { icon: MapPin, label: "Address", value: settings?.footer_address || "Markazi Darul Qaza, Shivajinagar, Bengaluru, Karnataka 560001" },
                  { icon: Phone,  label: "Phone",   value: settings?.footer_phone || "+91 80 2559 0000" },
                  { icon: Mail,   label: "Email",   value: settings?.footer_email || "info@imarateshariah.in" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: isDark ? "rgba(212,175,55,0.12)" : "rgba(212,175,55,0.10)" }}
                    >
                      <c.icon size={15} style={{ color: "#D4AF37" }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--text-muted)" }}>{c.label}</p>
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <TiltCard className="p-8" dark={isDark}>
                <AnimatePresence mode="wait">
                  {formSent ? (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12"
                    >
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{ background: "rgba(212,175,55,0.12)" }}
                      >
                        <span style={{ color: "#D4AF37", fontSize: 28 }}>✓</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Message Sent</h3>
                      <p style={{ color: "var(--text-secondary)" }}>We will get back to you shortly.</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      {[
                        { id: "name",    label: "Your Name",     type: "text",  placeholder: "Enter your full name" },
                        { id: "email",   label: "Email Address", type: "email", placeholder: "your@email.com" },
                      ].map((f) => (
                        <div key={f.id}>
                          <label className="block text-[11px] font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--text-muted)" }}>
                            {f.label}
                          </label>
                          <input
                            type={f.type}
                            required
                            value={(formData as Record<string,string>)[f.id]}
                            onChange={(e) => setFormData({ ...formData, [f.id]: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                            style={{
                              background: "var(--input-bg)",
                              border: "1px solid var(--input-border)",
                              color: "var(--text-primary)",
                            }}
                            placeholder={f.placeholder}
                          />
                        </div>
                      ))}
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--text-muted)" }}>
                          Message
                        </label>
                        <textarea
                          rows={5}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                          style={{
                            background: "var(--input-bg)",
                            border: "1px solid var(--input-border)",
                            color: "var(--text-primary)",
                          }}
                          placeholder="How can we help you?"
                        />
                      </div>
                      {formError && (
                        <p className="text-xs text-red-500">{formError}</p>
                      )}
                      <MagneticBtn
                        className="w-full py-3.5 rounded-2xl text-sm font-semibold text-white"
                        style={{
                          background: "linear-gradient(135deg,#D4AF37 0%,#B8960C 100%)",
                          boxShadow: "0 8px 24px rgba(212,175,55,0.25)",
                          opacity: formSending ? 0.7 : 1,
                        }}
                      >
                        {formSending ? "Sending…" : "Send Message"}
                      </MagneticBtn>
                    </motion.form>
                  )}
                </AnimatePresence>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
