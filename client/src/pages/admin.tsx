import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Edit2, Trash2, Save, X, Eye, EyeOff,
  Newspaper, Bell, Users, MapPin, Scale, LogOut, Check, Mail, MailOpen,
  Settings, Image, Key, Upload,
} from "lucide-react";

/* ── Types ── */
type Tab = "news" | "notices" | "leadership" | "branches" | "judges" | "messages" | "settings" | "media" | "password";

interface NewsArticle    { id: number; title: string; titleUrdu: string; excerpt: string; content: string; tag: string; isPublished: boolean; publishedAt: string; }
interface Notice         { id: number; title: string; titleUrdu: string; content: string; tag: string; isPublished: boolean; publishedAt: string; }
interface LeaderMember   { id: number; name: string; nameUrdu: string; role: string; roleUrdu: string; section: string; photoUrl: string; bio: string; sortOrder: number; isActive: boolean; }
interface Branch         { id: number; city: string; cityUrdu: string; cityKn: string; address: string; phone: string; photoUrl: string; description: string; isActive: boolean; sortOrder: number; }
interface Judge          { id: number; name: string; nameUrdu: string; role: string; roleUrdu: string; photoUrl: string; since: string; isActive: boolean; sortOrder: number; }
interface ContactMessage { id: number; name: string; email: string; message: string; isRead: boolean; createdAt: string; }
interface GalleryItem    { id: number; url: string; caption: string; category: string; sortOrder: number; }

/* ── API helper with JWT ── */
function useAdminApi(token: string) {
  const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${token}` };
  const base = "/api/admin";

  const get  = (path: string) => fetch(`${base}${path}`, { headers }).then((r) => r.json());
  const post = (path: string, body: object) => fetch(`${base}${path}`, { method: "POST", headers, body: JSON.stringify(body) }).then((r) => r.json());
  const put  = (path: string, body: object) => fetch(`${base}${path}`, { method: "PUT",  headers, body: JSON.stringify(body) }).then((r) => r.json());
  const del  = (path: string) => fetch(`${base}${path}`, { method: "DELETE", headers }).then((r) => r.json());

  return { get, post, put, del, headers };
}

/* ── Toast ── */
function useToast() {
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const show = useCallback((text: string, ok = true) => {
    setMsg({ text, ok });
    setTimeout(() => setMsg(null), 3000);
  }, []);
  return { msg, show };
}

/* ── Field ── */
function Field({ label, value, onChange, textarea = false, small = false }: {
  label: string; value: string | boolean | number; onChange: (v: string | boolean) => void;
  textarea?: boolean; small?: boolean;
}) {
  const style: React.CSSProperties = {
    width: "100%", padding: "8px 12px", borderRadius: 10, fontSize: 13,
    background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.10)",
    color: "#111", outline: "none", fontFamily: "inherit",
  };

  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
        <div className="w-9 h-5 rounded-full relative transition-colors"
          style={{ background: value ? "#D4AF37" : "#DDD" }}
          onClick={() => onChange(!value)}>
          <div className="w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all" style={{ left: value ? "20px" : "2px" }} />
        </div>
        <span style={{ color: "#555" }}>{label}</span>
      </label>
    );
  }

  return (
    <div>
      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{label}</label>
      {textarea ? (
        <textarea rows={small ? 3 : 5} value={String(value)} onChange={(e) => onChange(e.target.value)} style={{ ...style, resize: "vertical" }} />
      ) : (
        <input type={typeof value === "number" ? "number" : "text"} value={String(value)}
          onChange={(e) => onChange(typeof value === "number" ? e.target.value : e.target.value)} style={style} />
      )}
    </div>
  );
}

/* ── Modal ── */
function Modal({ title, onClose, onSave, children }: { title: string; onClose: () => void; onSave: () => void; children: React.ReactNode }) {
  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }} />
      <motion.div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-7 shadow-2xl"
        initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.97 }}
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold" style={{ color: "#111" }}>{title}</h3>
          <div className="flex gap-2">
            <button onClick={onSave} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg,#D4AF37,#B8960C)" }}>
              <Save size={14} /> Save
            </button>
            <button onClick={onClose} className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,0,0,0.06)" }}>
              <X size={15} />
            </button>
          </div>
        </div>
        <div className="space-y-4">{children}</div>
      </motion.div>
    </motion.div>
  );
}

/* ── Row actions ── */
function RowActions({ onEdit, onDelete, isPublished, onToggle }: { onEdit: () => void; onDelete: () => void; isPublished?: boolean; onToggle?: () => void; }) {
  return (
    <div className="flex items-center gap-1.5">
      {onToggle !== undefined && (
        <button onClick={onToggle} title={isPublished ? "Unpublish" : "Publish"}
          className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
          style={{ background: isPublished ? "rgba(212,175,55,0.12)" : "rgba(0,0,0,0.05)", color: isPublished ? "#D4AF37" : "#AAA" }}>
          {isPublished ? <Eye size={12} /> : <EyeOff size={12} />}
        </button>
      )}
      <button onClick={onEdit} className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,0,0,0.05)" }}>
        <Edit2 size={12} style={{ color: "#555" }} />
      </button>
      <button onClick={onDelete} className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(220,50,50,0.08)" }}>
        <Trash2 size={12} style={{ color: "#E55" }} />
      </button>
    </div>
  );
}

/* ══════════════════ MAIN ADMIN PAGE ══════════════════ */
export default function Admin() {
  const [token, setToken]     = useState<string | null>(() => sessionStorage.getItem("ies-jwt-token"));
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [tab, setTab]         = useState<Tab>("news");
  const [loading, setLoading] = useState(false);
  const { msg, show }         = useToast();

  /* Data */
  const [news,       setNews]       = useState<NewsArticle[]>([]);
  const [notices,    setNotices]    = useState<Notice[]>([]);
  const [leadership, setLeadership] = useState<LeaderMember[]>([]);
  const [branches,   setBranches]   = useState<Branch[]>([]);
  const [judges,     setJudges]     = useState<Judge[]>([]);
  const [messages,   setMessages]   = useState<ContactMessage[]>([]);
  const [gallery,    setGallery]    = useState<GalleryItem[]>([]);
  const [siteSettings, setSiteSettings] = useState<Record<string, string>>({});

  /* Modals */
  const [editNews,       setEditNews]       = useState<Partial<NewsArticle> | null>(null);
  const [editNotice,     setEditNotice]     = useState<Partial<Notice> | null>(null);
  const [editLeader,     setEditLeader]     = useState<Partial<LeaderMember> | null>(null);
  const [editBranch,     setEditBranch]     = useState<Partial<Branch> | null>(null);
  const [editJudge,      setEditJudge]      = useState<Partial<Judge> | null>(null);
  const [editGallery,    setEditGallery]    = useState<Partial<GalleryItem> | null>(null);

  /* Password change */
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const api = useAdminApi(token ?? "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ── Load ── */
  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [n, no, l, b, j, m, g, s] = await Promise.all([
        api.get("/news"),
        api.get("/notices"),
        api.get("/leadership"),
        api.get("/branches"),
        api.get("/judges"),
        api.get("/messages"),
        api.get("/gallery"),
        fetch("/api/admin/settings", { headers: { "Authorization": `Bearer ${token}` } }).then(r => r.json()),
      ]);
      setNews(n.items ?? []);
      setNotices(no.items ?? []);
      setLeadership(l.items ?? []);
      setBranches(b.items ?? []);
      setJudges(j.items ?? []);
      setMessages(m.items ?? []);
      setGallery(g.items ?? []);
      setSiteSettings(s);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { load(); }, [load]);

  /* ── Login (JWT) ── */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErr("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }).then((r) => r.json());

      if (res.token) {
        sessionStorage.setItem("ies-jwt-token", res.token);
        setToken(res.token);
      } else {
        setLoginErr(res.error || "Invalid credentials");
      }
    } catch {
      setLoginErr("Connection error");
    }
  };

  const logout = () => {
    sessionStorage.removeItem("ies-jwt-token");
    setToken(null);
    setEmail("");
    setPassword("");
  };

  /* ── Password change ── */
  const handleChangePassword = async () => {
    if (newPw !== confirmPw) { show("Passwords do not match", false); return; }
    if (newPw.length < 8) { show("Password must be at least 8 characters", false); return; }
    const res = await api.post("/auth/change-password", { currentPassword: currentPw, newPassword: newPw });
    if (res.ok) {
      show("Password changed successfully");
      setCurrentPw(""); setNewPw(""); setConfirmPw("");
    } else {
      show(res.error || "Failed to change password", false);
    }
  };

  /* ── Save settings ── */
  const handleSaveSettings = async () => {
    await api.put("/settings", siteSettings);
    show("Settings saved");
  };

  /* ── Image upload (Cloudinary direct) ── */
  const handleImageUpload = async (file: File) => {
    if (!token) return;
    try {
      const signRes = await fetch("/api/admin/upload/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ folder: "imarat-e-shariah" }),
      }).then(r => r.json());

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signRes.apiKey);
      formData.append("timestamp", String(signRes.timestamp));
      formData.append("signature", signRes.signature);
      formData.append("folder", signRes.folder);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${signRes.cloudName}/auto/upload`,
        { method: "POST", body: formData }
      ).then(r => r.json());

      if (uploadRes.secure_url) {
        return uploadRes.secure_url;
      }
    } catch (err) {
      console.error("Upload failed:", err);
    }
    return null;
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await handleImageUpload(file);
    if (url) {
      await api.post("/gallery", { url, caption: file.name, category: "general" });
      show("Image uploaded");
      load();
    } else {
      show("Upload failed", false);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ─── Login screen ─── */
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAFAFA" }}>
        <motion.div className="bg-white rounded-2xl p-10 w-full max-w-sm shadow-xl"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-white text-xl font-bold mx-auto"
            style={{ background: "linear-gradient(135deg,#D4AF37,#B8960C)" }}>ع</div>
          <h1 className="text-2xl font-black text-center mb-1" style={{ color: "#111" }}>Admin Panel</h1>
          <p className="text-sm text-center mb-8" style={{ color: "#999" }}>Imarat-e-Shariah Karnataka</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.10)", color: "#111" }}
                placeholder="admin@imarateshariah.in" autoFocus required />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.10)", color: "#111" }}
                placeholder="Enter password" required />
            </div>
            {loginErr && <p className="text-xs text-red-500">{loginErr}</p>}
            <button type="submit" className="w-full py-3 rounded-xl text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg,#D4AF37,#B8960C)" }}>
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  /* ─── Dashboard ─── */
  const unread = messages.filter((m) => !m.isRead).length;
  const TABS = [
    { id: "news" as Tab, label: "News", icon: Newspaper, count: news.length },
    { id: "notices" as Tab, label: "Notices", icon: Bell, count: notices.length },
    { id: "leadership" as Tab, label: "Leadership", icon: Users, count: leadership.length },
    { id: "branches" as Tab, label: "Branches", icon: MapPin, count: branches.length },
    { id: "judges" as Tab, label: "Judges", icon: Scale, count: judges.length },
    { id: "messages" as Tab, label: "Inbox", icon: Mail, count: messages.length, badge: unread },
    { id: "settings" as Tab, label: "Settings", icon: Settings, count: 0 },
    { id: "media" as Tab, label: "Media", icon: Image, count: gallery.length },
    { id: "password" as Tab, label: "Security", icon: Key, count: 0 },
  ];

  const headerStyle: React.CSSProperties = { background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.07)", padding: "0 24px" };
  const th: React.CSSProperties = { padding: "10px 14px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#AAA", textAlign: "left" as const, borderBottom: "1px solid rgba(0,0,0,0.06)" };
  const td: React.CSSProperties = { padding: "12px 14px", fontSize: 13, color: "#333", borderBottom: "1px solid rgba(0,0,0,0.04)", verticalAlign: "middle" };

  /* ─── Save helpers ─── */
  const saveNews = async () => {
    if (!editNews) return;
    if (editNews.id) { await api.put(`/news/${editNews.id}`, editNews); show("Article saved"); }
    else { await api.post("/news", editNews); show("Article created"); }
    setEditNews(null); load();
  };
  const saveNotice = async () => {
    if (!editNotice) return;
    if (editNotice.id) { await api.put(`/notices/${editNotice.id}`, editNotice); show("Notice saved"); }
    else { await api.post("/notices", editNotice); show("Notice created"); }
    setEditNotice(null); load();
  };
  const saveLeader = async () => {
    if (!editLeader) return;
    if (editLeader.id) { await api.put(`/leadership/${editLeader.id}`, editLeader); show("Member saved"); }
    else { await api.post("/leadership", editLeader); show("Member created"); }
    setEditLeader(null); load();
  };
  const saveBranch = async () => {
    if (!editBranch) return;
    if (editBranch.id) { await api.put(`/branches/${editBranch.id}`, editBranch); show("Branch saved"); }
    else { await api.post("/branches", editBranch); show("Branch created"); }
    setEditBranch(null); load();
  };
  const saveJudge = async () => {
    if (!editJudge) return;
    if (editJudge.id) { await api.put(`/judges/${editJudge.id}`, editJudge); show("Judge saved"); }
    else { await api.post("/judges", editJudge); show("Judge created"); }
    setEditJudge(null); load();
  };
  const saveGalleryItem = async () => {
    if (!editGallery) return;
    if (editGallery.id) { await api.put(`/gallery/${editGallery.id}`, editGallery); show("Image saved"); }
    else { await api.post("/gallery", editGallery); show("Image added"); }
    setEditGallery(null); load();
  };

  const del = async (path: string, reload: () => void) => {
    if (!confirm("Delete this item?")) return;
    await api.del(path); show("Deleted", false); reload();
  };

  const newNewsDefault: Partial<NewsArticle> = { title: "", titleUrdu: "", excerpt: "", content: "", tag: "General", isPublished: true, publishedAt: new Date().toISOString() };
  const newNoticeDefault: Partial<Notice> = { title: "", titleUrdu: "", content: "", tag: "Notice", isPublished: true, publishedAt: new Date().toISOString() };
  const newLeaderDefault: Partial<LeaderMember> = { name: "", nameUrdu: "", role: "", roleUrdu: "", section: "majlis", photoUrl: "", bio: "", sortOrder: 0, isActive: true };
  const newBranchDefault: Partial<Branch> = { city: "", cityUrdu: "", cityKn: "", address: "", phone: "", photoUrl: "", description: "", isActive: true, sortOrder: 0 };
  const newJudgeDefault: Partial<Judge> = { name: "", nameUrdu: "", role: "", roleUrdu: "", photoUrl: "", since: "", isActive: true, sortOrder: 0 };
  const newGalleryDefault: Partial<GalleryItem> = { url: "", caption: "", category: "general", sortOrder: 0 };

  return (
    <div className="min-h-screen" style={{ background: "#F7F7F7" }}>
      {/* Toast */}
      <AnimatePresence>
        {msg && (
          <motion.div className="fixed bottom-6 right-6 z-[100] flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold text-white shadow-xl"
            style={{ background: msg.ok ? "linear-gradient(135deg,#D4AF37,#B8960C)" : "#333" }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10 }}>
            {msg.ok ? <Check size={14} /> : <X size={14} />} {msg.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div style={headerStyle} className="flex items-center justify-between h-14">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold" style={{ background: "linear-gradient(135deg,#D4AF37,#B8960C)" }}>ع</div>
          <div>
            <p className="text-sm font-bold" style={{ color: "#111" }}>Admin Panel</p>
            <p className="text-[10px]" style={{ color: "#AAA" }}>Imarat-e-Shariah Karnataka</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" className="text-xs" style={{ color: "#AAA" }}>← View Site</a>
          <button onClick={logout} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl" style={{ background: "rgba(0,0,0,0.05)", color: "#777" }}>
            <LogOut size={12} /> Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 mb-8">
          {TABS.map((t) => (
            <motion.button key={t.id} onClick={() => setTab(t.id)}
              className="bg-white rounded-xl p-3 text-left transition-all relative overflow-hidden"
              style={{ border: tab === t.id ? "2px solid #D4AF37" : "2px solid transparent", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
              whileHover={{ y: -1 }}>
              <t.icon size={14} style={{ color: "#D4AF37", marginBottom: 4 }} />
              <p className="text-[11px] font-semibold" style={{ color: "#111" }}>{t.label}</p>
              {t.count > 0 && <p className="text-lg font-black" style={{ color: "#111" }}>{t.count}</p>}
              {"badge" in t && (t as { badge?: number }).badge! > 0 && (
                <span className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                  style={{ background: "#D4AF37" }}>{(t as { badge?: number }).badge}</span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Tab content */}
        <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
            <h2 className="font-bold text-base" style={{ color: "#111" }}>
              {TABS.find((t) => t.id === tab)?.label}
              {tab === "messages" && unread > 0 && (
                <span className="ml-2 px-2 py-0.5 rounded-full text-[11px] font-bold text-white" style={{ background: "#D4AF37" }}>{unread} unread</span>
              )}
            </h2>
            {tab === "media" && (
              <label className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white cursor-pointer"
                style={{ background: "linear-gradient(135deg,#D4AF37,#B8960C)" }}>
                <Upload size={13} /> Upload Image
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
              </label>
            )}
            {tab === "settings" && (
              <button onClick={handleSaveSettings}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg,#D4AF37,#B8960C)" }}>
                <Save size={13} /> Save All
              </button>
            )}
            {!["messages", "settings", "media", "password"].includes(tab) && (
              <button onClick={() => {
                if (tab === "news") setEditNews(newNewsDefault);
                if (tab === "notices") setEditNotice(newNoticeDefault);
                if (tab === "leadership") setEditLeader(newLeaderDefault);
                if (tab === "branches") setEditBranch(newBranchDefault);
                if (tab === "judges") setEditJudge(newJudgeDefault);
              }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg,#D4AF37,#B8960C)" }}>
                <Plus size={13} /> Add New
              </button>
            )}
          </div>

          {loading ? (
            <div className="p-10 text-center text-sm" style={{ color: "#AAA" }}>Loading…</div>
          ) : (
            <div className="overflow-x-auto">
              {/* ── SETTINGS TAB ── */}
              {tab === "settings" && (
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-bold mb-4" style={{ color: "#111" }}>Hero Section</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Hero Title" value={siteSettings.hero_title ?? ""} onChange={(v) => setSiteSettings({ ...siteSettings, hero_title: v as string })} />
                      <Field label="Hero Subtitle" value={siteSettings.hero_subtitle ?? ""} onChange={(v) => setSiteSettings({ ...siteSettings, hero_subtitle: v as string })} />
                      <Field label="Hero Description (Urdu)" value={siteSettings.hero_description ?? ""} onChange={(v) => setSiteSettings({ ...siteSettings, hero_description: v as string })} />
                      <Field label="Hero Banner Image URL" value={siteSettings.hero_banner_image ?? ""} onChange={(v) => setSiteSettings({ ...siteSettings, hero_banner_image: v as string })} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold mb-4" style={{ color: "#111" }}>Organization</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Organization Description" value={siteSettings.org_description ?? ""} onChange={(v) => setSiteSettings({ ...siteSettings, org_description: v as string })} textarea />
                      <Field label="Organization Description (Urdu)" value={siteSettings.org_description_urdu ?? ""} onChange={(v) => setSiteSettings({ ...siteSettings, org_description_urdu: v as string })} />
                      <Field label="Organization Logo URL" value={siteSettings.org_logo ?? ""} onChange={(v) => setSiteSettings({ ...siteSettings, org_logo: v as string })} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold mb-4" style={{ color: "#111" }}>Homepage Statistics</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[1,2,3,4].map((n) => (
                        <div key={n} className="space-y-2">
                          <Field label={`Stat ${n} Value`} value={siteSettings[`stat_${n}_value`] ?? ""} onChange={(v) => setSiteSettings({ ...siteSettings, [`stat_${n}_value`]: v as string })} />
                          <Field label={`Stat ${n} Label`} value={siteSettings[`stat_${n}_label`] ?? ""} onChange={(v) => setSiteSettings({ ...siteSettings, [`stat_${n}_label`]: v as string })} />
                          <Field label={`Stat ${n} Urdu`} value={siteSettings[`stat_${n}_label_urdu`] ?? ""} onChange={(v) => setSiteSettings({ ...siteSettings, [`stat_${n}_label_urdu`]: v as string })} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold mb-4" style={{ color: "#111" }}>Ticker / Announcements</h3>
                    <Field label="Ticker Items (JSON array)" value={siteSettings.ticker_items ?? "[]"} onChange={(v) => setSiteSettings({ ...siteSettings, ticker_items: v as string })} textarea />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold mb-4" style={{ color: "#111" }}>Footer</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Address" value={siteSettings.footer_address ?? ""} onChange={(v) => setSiteSettings({ ...siteSettings, footer_address: v as string })} />
                      <Field label="Phone" value={siteSettings.footer_phone ?? ""} onChange={(v) => setSiteSettings({ ...siteSettings, footer_phone: v as string })} />
                      <Field label="Email" value={siteSettings.footer_email ?? ""} onChange={(v) => setSiteSettings({ ...siteSettings, footer_email: v as string })} />
                      <Field label="Hours" value={siteSettings.footer_hours ?? ""} onChange={(v) => setSiteSettings({ ...siteSettings, footer_hours: v as string })} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold mb-4" style={{ color: "#111" }}>Social Media</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Facebook URL" value={siteSettings.social_facebook ?? ""} onChange={(v) => setSiteSettings({ ...siteSettings, social_facebook: v as string })} />
                      <Field label="Twitter URL" value={siteSettings.social_twitter ?? ""} onChange={(v) => setSiteSettings({ ...siteSettings, social_twitter: v as string })} />
                      <Field label="Instagram URL" value={siteSettings.social_instagram ?? ""} onChange={(v) => setSiteSettings({ ...siteSettings, social_instagram: v as string })} />
                      <Field label="YouTube URL" value={siteSettings.social_youtube ?? ""} onChange={(v) => setSiteSettings({ ...siteSettings, social_youtube: v as string })} />
                      <Field label="WhatsApp URL" value={siteSettings.social_whatsapp ?? ""} onChange={(v) => setSiteSettings({ ...siteSettings, social_whatsapp: v as string })} />
                    </div>
                  </div>
                </div>
              )}

              {/* ── MEDIA TAB ── */}
              {tab === "media" && (
                <div className="p-6">
                  {gallery.length === 0 ? (
                    <div className="text-center py-12" style={{ color: "#CCC" }}>
                      <Image size={32} style={{ margin: "0 auto 10px", opacity: 0.3 }} />
                      <p className="text-sm">No media uploaded yet</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {gallery.map((item) => (
                        <div key={item.id} className="relative group rounded-xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
                          {item.url ? (
                            <img src={item.url} alt={item.caption} className="w-full h-40 object-cover" />
                          ) : (
                            <div className="w-full h-40 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.04)" }}>
                              <Image size={24} style={{ color: "#CCC" }} />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                            <div className="flex-1">
                              <p className="text-white text-xs font-medium">{item.caption}</p>
                              <p className="text-white/60 text-[10px]">{item.category}</p>
                            </div>
                            <div className="flex gap-1">
                              <button onClick={() => setEditGallery(item)} className="w-6 h-6 rounded bg-white/20 flex items-center justify-center">
                                <Edit2 size={10} style={{ color: "#fff" }} />
                              </button>
                              <button onClick={() => del(`/gallery/${item.id}`, load)} className="w-6 h-6 rounded bg-red-500/30 flex items-center justify-center">
                                <Trash2 size={10} style={{ color: "#fff" }} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── PASSWORD TAB ── */}
              {tab === "password" && (
                <div className="p-6 max-w-md">
                  <h3 className="text-sm font-bold mb-4" style={{ color: "#111" }}>Change Password</h3>
                  <div className="space-y-4">
                    <Field label="Current Password" value={currentPw} onChange={(v) => setCurrentPw(v as string)} />
                    <Field label="New Password" value={newPw} onChange={(v) => setNewPw(v as string)} />
                    <Field label="Confirm New Password" value={confirmPw} onChange={(v) => setConfirmPw(v as string)} />
                    <button onClick={handleChangePassword}
                      className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
                      style={{ background: "linear-gradient(135deg,#D4AF37,#B8960C)" }}>
                      <Key size={13} /> Change Password
                    </button>
                  </div>
                </div>
              )}

              {/* ── NEWS ── */}
              {tab === "news" && (
                <table className="w-full">
                  <thead><tr>{["Title", "Urdu Title", "Tag", "Published", "Date", "Actions"].map((h) => <th key={h} style={th}>{h}</th>)}</tr></thead>
                  <tbody>
                    {news.map((a) => (
                      <tr key={a.id} className="hover:bg-amber-50/30 transition-colors">
                        <td style={td}><span className="font-medium" style={{ color: "#111" }}>{a.title}</span></td>
                        <td style={{ ...td, fontFamily: "'Noto Nastaliq Urdu',serif", direction: "rtl" }}>{a.titleUrdu || "—"}</td>
                        <td style={td}><span className="px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: "rgba(212,175,55,0.12)", color: "#B8960C" }}>{a.tag}</span></td>
                        <td style={td}>{a.isPublished ? <span style={{ color: "#22A06B" }}>●</span> : <span style={{ color: "#CCC" }}>●</span>}</td>
                        <td style={td}>{new Date(a.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td>
                        <td style={td}><RowActions onEdit={() => setEditNews(a)} onDelete={() => del(`/news/${a.id}`, load)} isPublished={a.isPublished}
                          onToggle={async () => { await api.put(`/news/${a.id}`, { ...a, isPublished: !a.isPublished }); load(); }} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* ── NOTICES ── */}
              {tab === "notices" && (
                <table className="w-full">
                  <thead><tr>{["Title", "Urdu Title", "Tag", "Published", "Date", "Actions"].map((h) => <th key={h} style={th}>{h}</th>)}</tr></thead>
                  <tbody>
                    {notices.map((n) => (
                      <tr key={n.id} className="hover:bg-amber-50/30 transition-colors">
                        <td style={td}><span className="font-medium" style={{ color: "#111" }}>{n.title}</span></td>
                        <td style={{ ...td, fontFamily: "'Noto Nastaliq Urdu',serif", direction: "rtl" }}>{n.titleUrdu || "—"}</td>
                        <td style={td}><span className="px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: "rgba(212,175,55,0.12)", color: "#B8960C" }}>{n.tag}</span></td>
                        <td style={td}>{n.isPublished ? <span style={{ color: "#22A06B" }}>●</span> : <span style={{ color: "#CCC" }}>●</span>}</td>
                        <td style={td}>{new Date(n.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td>
                        <td style={td}><RowActions onEdit={() => setEditNotice(n)} onDelete={() => del(`/notices/${n.id}`, load)} isPublished={n.isPublished}
                          onToggle={async () => { await api.put(`/notices/${n.id}`, { ...n, isPublished: !n.isPublished }); load(); }} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* ── LEADERSHIP ── */}
              {tab === "leadership" && (
                <table className="w-full">
                  <thead><tr>{["Name", "Role", "Section", "Photo", "Active", "Actions"].map((h) => <th key={h} style={th}>{h}</th>)}</tr></thead>
                  <tbody>
                    {leadership.map((m) => (
                      <tr key={m.id} className="hover:bg-amber-50/30 transition-colors">
                        <td style={td}><span className="font-medium" style={{ color: "#111" }}>{m.name}</span></td>
                        <td style={td}>{m.role}</td>
                        <td style={td}><span className="capitalize px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: "rgba(212,175,55,0.12)", color: "#B8960C" }}>{m.section}</span></td>
                        <td style={td}>{m.photoUrl ? <img src={m.photoUrl} alt="" className="w-8 h-8 rounded-lg object-cover" /> : <span style={{ color: "#CCC" }}>—</span>}</td>
                        <td style={td}>{m.isActive ? <span style={{ color: "#22A06B" }}>●</span> : <span style={{ color: "#CCC" }}>●</span>}</td>
                        <td style={td}><RowActions onEdit={() => setEditLeader(m)} onDelete={() => del(`/leadership/${m.id}`, load)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* ── BRANCHES ── */}
              {tab === "branches" && (
                <table className="w-full">
                  <thead><tr>{["City", "Address", "Phone", "Active", "Actions"].map((h) => <th key={h} style={th}>{h}</th>)}</tr></thead>
                  <tbody>
                    {branches.map((b) => (
                      <tr key={b.id} className="hover:bg-amber-50/30 transition-colors">
                        <td style={td}><span className="font-medium" style={{ color: "#111" }}>{b.city}</span></td>
                        <td style={{ ...td, maxWidth: 260 }}>{b.address}</td>
                        <td style={td}>{b.phone}</td>
                        <td style={td}>{b.isActive ? <span style={{ color: "#22A06B" }}>●</span> : <span style={{ color: "#CCC" }}>●</span>}</td>
                        <td style={td}><RowActions onEdit={() => setEditBranch(b)} onDelete={() => del(`/branches/${b.id}`, load)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* ── JUDGES ── */}
              {tab === "judges" && (
                <table className="w-full">
                  <thead><tr>{["Name", "Role", "Since", "Active", "Actions"].map((h) => <th key={h} style={th}>{h}</th>)}</tr></thead>
                  <tbody>
                    {judges.map((j) => (
                      <tr key={j.id} className="hover:bg-amber-50/30 transition-colors">
                        <td style={td}><span className="font-medium" style={{ color: "#111" }}>{j.name}</span></td>
                        <td style={td}>{j.role}</td>
                        <td style={td}>{j.since || "—"}</td>
                        <td style={td}>{j.isActive ? <span style={{ color: "#22A06B" }}>●</span> : <span style={{ color: "#CCC" }}>●</span>}</td>
                        <td style={td}><RowActions onEdit={() => setEditJudge(j)} onDelete={() => del(`/judges/${j.id}`, load)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* ── MESSAGES ── */}
              {tab === "messages" && (
                messages.length === 0 ? (
                  <div className="p-12 text-center" style={{ color: "#CCC" }}>
                    <Mail size={32} style={{ margin: "0 auto 10px", opacity: 0.3 }} />
                    <p className="text-sm">No enquiries yet</p>
                  </div>
                ) : (
                  <div className="divide-y" style={{ borderColor: "rgba(0,0,0,0.05)" }}>
                    {messages.map((m) => (
                      <div key={m.id} className="p-5 hover:bg-amber-50/20 transition-colors"
                        style={{ background: m.isRead ? "transparent" : "rgba(212,175,55,0.04)" }}>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                              style={{ background: m.isRead ? "rgba(0,0,0,0.05)" : "rgba(212,175,55,0.12)" }}>
                              {m.isRead ? <MailOpen size={14} style={{ color: "#AAA" }} /> : <Mail size={14} style={{ color: "#D4AF37" }} />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-sm" style={{ color: "#111" }}>{m.name}</span>
                                {!m.isRead && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold" style={{ background: "#D4AF37", color: "#fff" }}>NEW</span>}
                                <span className="text-[11px]" style={{ color: "#AAA" }}>
                                  {new Date(m.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                                </span>
                              </div>
                              <a href={`mailto:${m.email}`} className="text-xs mb-2 block" style={{ color: "#D4AF37" }}>{m.email}</a>
                              <p className="text-sm leading-relaxed" style={{ color: "#555", whiteSpace: "pre-wrap" }}>{m.message}</p>
                            </div>
                          </div>
                          <div className="flex gap-1.5 shrink-0">
                            {!m.isRead && (
                              <button onClick={async () => { await api.put(`/messages/${m.id}/read`, {}); load(); }}
                                className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(212,175,55,0.10)" }}>
                                <Check size={12} style={{ color: "#D4AF37" }} />
                              </button>
                            )}
                            <button onClick={() => del(`/messages/${m.id}`, load)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(220,50,50,0.08)" }}>
                              <Trash2 size={12} style={{ color: "#E55" }} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Modals ── */}
      <AnimatePresence>
        {editNews && (
          <Modal title={editNews.id ? "Edit Article" : "New Article"} onClose={() => setEditNews(null)} onSave={saveNews}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><Field label="Title (English)" value={editNews.title ?? ""} onChange={(v) => setEditNews({ ...editNews, title: v as string })} /></div>
              <div className="sm:col-span-2"><Field label="Title (اردو)" value={editNews.titleUrdu ?? ""} onChange={(v) => setEditNews({ ...editNews, titleUrdu: v as string })} /></div>
              <Field label="Tag" value={editNews.tag ?? "General"} onChange={(v) => setEditNews({ ...editNews, tag: v as string })} />
              <Field label="Published At" value={(editNews.publishedAt ?? "").substring(0, 10)} onChange={(v) => setEditNews({ ...editNews, publishedAt: v as string })} />
            </div>
            <Field label="Excerpt" value={editNews.excerpt ?? ""} onChange={(v) => setEditNews({ ...editNews, excerpt: v as string })} textarea small />
            <Field label="Full Content" value={editNews.content ?? ""} onChange={(v) => setEditNews({ ...editNews, content: v as string })} textarea />
            <Field label="Published" value={editNews.isPublished ?? true} onChange={(v) => setEditNews({ ...editNews, isPublished: v as boolean })} />
          </Modal>
        )}
        {editNotice && (
          <Modal title={editNotice.id ? "Edit Notice" : "New Notice"} onClose={() => setEditNotice(null)} onSave={saveNotice}>
            <Field label="Title (English)" value={editNotice.title ?? ""} onChange={(v) => setEditNotice({ ...editNotice, title: v as string })} />
            <Field label="Title (اردو)" value={editNotice.titleUrdu ?? ""} onChange={(v) => setEditNotice({ ...editNotice, titleUrdu: v as string })} />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Tag" value={editNotice.tag ?? "Notice"} onChange={(v) => setEditNotice({ ...editNotice, tag: v as string })} />
              <Field label="Published At" value={(editNotice.publishedAt ?? "").substring(0, 10)} onChange={(v) => setEditNotice({ ...editNotice, publishedAt: v as string })} />
            </div>
            <Field label="Content" value={editNotice.content ?? ""} onChange={(v) => setEditNotice({ ...editNotice, content: v as string })} textarea />
            <Field label="Published" value={editNotice.isPublished ?? true} onChange={(v) => setEditNotice({ ...editNotice, isPublished: v as boolean })} />
          </Modal>
        )}
        {editLeader && (
          <Modal title={editLeader.id ? "Edit Member" : "New Member"} onClose={() => setEditLeader(null)} onSave={saveLeader}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name (English)" value={editLeader.name ?? ""} onChange={(v) => setEditLeader({ ...editLeader, name: v as string })} />
              <Field label="Full Name (اردو)" value={editLeader.nameUrdu ?? ""} onChange={(v) => setEditLeader({ ...editLeader, nameUrdu: v as string })} />
              <Field label="Role (English)" value={editLeader.role ?? ""} onChange={(v) => setEditLeader({ ...editLeader, role: v as string })} />
              <Field label="Role (اردو)" value={editLeader.roleUrdu ?? ""} onChange={(v) => setEditLeader({ ...editLeader, roleUrdu: v as string })} />
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Section</label>
                <select value={editLeader.section ?? "majlis"} onChange={(e) => setEditLeader({ ...editLeader, section: e.target.value })}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: 10, fontSize: 13, background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.10)", color: "#111" }}>
                  <option value="majlis">Majlis e Emarat</option>
                  <option value="sabiq">Sabiq Umara</option>
                  <option value="arkan">Arkan e Shura</option>
                  <option value="umumi">Majlis e Umumi</option>
                </select>
              </div>
              <Field label="Photo URL" value={editLeader.photoUrl ?? ""} onChange={(v) => setEditLeader({ ...editLeader, photoUrl: v as string })} />
              <Field label="Sort Order" value={editLeader.sortOrder ?? 0} onChange={(v) => setEditLeader({ ...editLeader, sortOrder: Number(v) })} />
            </div>
            <Field label="Bio (English)" value={editLeader.bio ?? ""} onChange={(v) => setEditLeader({ ...editLeader, bio: v as string })} textarea small />
            <Field label="Active" value={editLeader.isActive ?? true} onChange={(v) => setEditLeader({ ...editLeader, isActive: v as boolean })} />
          </Modal>
        )}
        {editBranch && (
          <Modal title={editBranch.id ? "Edit Branch" : "New Branch"} onClose={() => setEditBranch(null)} onSave={saveBranch}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="City (English)" value={editBranch.city ?? ""} onChange={(v) => setEditBranch({ ...editBranch, city: v as string })} />
              <Field label="City (اردو)" value={editBranch.cityUrdu ?? ""} onChange={(v) => setEditBranch({ ...editBranch, cityUrdu: v as string })} />
              <Field label="City (ಕನ್ನಡ)" value={editBranch.cityKn ?? ""} onChange={(v) => setEditBranch({ ...editBranch, cityKn: v as string })} />
              <Field label="Phone" value={editBranch.phone ?? ""} onChange={(v) => setEditBranch({ ...editBranch, phone: v as string })} />
              <Field label="Photo URL" value={editBranch.photoUrl ?? ""} onChange={(v) => setEditBranch({ ...editBranch, photoUrl: v as string })} />
              <Field label="Sort Order" value={editBranch.sortOrder ?? 0} onChange={(v) => setEditBranch({ ...editBranch, sortOrder: Number(v) })} />
            </div>
            <Field label="Address" value={editBranch.address ?? ""} onChange={(v) => setEditBranch({ ...editBranch, address: v as string })} />
            <Field label="Description" value={editBranch.description ?? ""} onChange={(v) => setEditBranch({ ...editBranch, description: v as string })} textarea small />
            <Field label="Active" value={editBranch.isActive ?? true} onChange={(v) => setEditBranch({ ...editBranch, isActive: v as boolean })} />
          </Modal>
        )}
        {editJudge && (
          <Modal title={editJudge.id ? "Edit Judge" : "New Judge"} onClose={() => setEditJudge(null)} onSave={saveJudge}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name (English)" value={editJudge.name ?? ""} onChange={(v) => setEditJudge({ ...editJudge, name: v as string })} />
              <Field label="Full Name (اردو)" value={editJudge.nameUrdu ?? ""} onChange={(v) => setEditJudge({ ...editJudge, nameUrdu: v as string })} />
              <Field label="Role (English)" value={editJudge.role ?? ""} onChange={(v) => setEditJudge({ ...editJudge, role: v as string })} />
              <Field label="Role (اردو)" value={editJudge.roleUrdu ?? ""} onChange={(v) => setEditJudge({ ...editJudge, roleUrdu: v as string })} />
              <Field label="Photo URL" value={editJudge.photoUrl ?? ""} onChange={(v) => setEditJudge({ ...editJudge, photoUrl: v as string })} />
              <Field label="Since" value={editJudge.since ?? ""} onChange={(v) => setEditJudge({ ...editJudge, since: v as string })} />
              <Field label="Sort Order" value={editJudge.sortOrder ?? 0} onChange={(v) => setEditJudge({ ...editJudge, sortOrder: Number(v) })} />
            </div>
            <Field label="Active" value={editJudge.isActive ?? true} onChange={(v) => setEditJudge({ ...editJudge, isActive: v as boolean })} />
          </Modal>
        )}
        {editGallery && (
          <Modal title={editGallery.id ? "Edit Image" : "New Image"} onClose={() => setEditGallery(null)} onSave={saveGalleryItem}>
            <Field label="Image URL" value={editGallery.url ?? ""} onChange={(v) => setEditGallery({ ...editGallery, url: v as string })} />
            <Field label="Caption" value={editGallery.caption ?? ""} onChange={(v) => setEditGallery({ ...editGallery, caption: v as string })} />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Category" value={editGallery.category ?? "general"} onChange={(v) => setEditGallery({ ...editGallery, category: v as string })} />
              <Field label="Sort Order" value={editGallery.sortOrder ?? 0} onChange={(v) => setEditGallery({ ...editGallery, sortOrder: Number(v) })} />
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
