import { Link } from "wouter";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useApp } from "@/context/AppContext";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Taruf Nama", href: "/taruf" },
  { label: "Leadership", href: "/emarat" },
  { label: "Departments", href: "/shuaba" },
  { label: "News & Updates", href: "/news" },
];

const departments = [
  "Darul Kaza (Judicial)",
  "Darul Ifta (Fatwa)",
  "Taleemi (Education)",
  "Tabligh (Outreach)",
  "Mushawarat (Counsel)",
  "Media & Publications",
];

export default function Footer() {
  const { lang, settings } = useApp();

  const address = settings?.footer_address || "Markazi Darul Qaza, Shivajinagar, Bengaluru, Karnataka 560001, India";
  const phone = settings?.footer_phone || "+91 80 2559 0000";
  const email = settings?.footer_email || "info@imarateshariah.in";
  const hours = settings?.footer_hours || "Sat–Thu, 9 AM – 5 PM IST";
  const orgDesc = settings?.org_description || "Karnataka's supreme Islamic judicial authority — delivering Sharia-based justice and community guidance since its founding.";
  const orgDescUrdu = settings?.org_description_urdu || "اعلیٰ دینی عدالتی ادارہ — بنگلور، کرناٹک";

  return (
    <footer
      className="islamic-pattern-dark"
      style={{
        background: "#0A0A0A",
        borderTop: "1px solid rgba(212,175,55,0.12)",
      }}
    >
      <div className="gold-divider" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                style={{ background: "linear-gradient(135deg,#D4AF37,#F3D28B)" }}
              >
                ع
              </div>
              <div>
                <p className="font-semibold text-sm text-white">Imarat-e-Shariah</p>
                <p className="text-xs mt-0.5" style={{ color: "#D4AF37", fontFamily: "'Noto Nastaliq Urdu', serif" }}>
                  امارت شریعہ
                </p>
              </div>
            </div>
            <p className="text-[13px] leading-relaxed mb-4" style={{ color: "#777" }}>
              {orgDesc}
            </p>
            <p
              className="text-[12px] leading-relaxed"
              dir="rtl"
              style={{ color: "rgba(212,175,55,0.65)", fontFamily: "'Noto Nastaliq Urdu', serif" }}
            >
              {lang === "kn"
                ? "ಕರ್ನಾಟಕದ ಸರ್ವೋಚ್ಚ ಇಸ್ಲಾಮಿಕ್ ನ್ಯಾಯಾಂಗ ಪ್ರಾಧಿಕಾರ"
                : orgDescUrdu}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-widest uppercase mb-5" style={{ color: "#D4AF37" }}>
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[13px] transition-colors hover:text-amber-400" style={{ color: "#777" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-widest uppercase mb-5" style={{ color: "#D4AF37" }}>
              Departments
            </h4>
            <ul className="space-y-2.5">
              {departments.map((d) => (
                <li key={d}>
                  <Link href="/shuaba" className="text-[13px] transition-colors hover:text-amber-400" style={{ color: "#777" }}>
                    {d}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-widest uppercase mb-5" style={{ color: "#D4AF37" }}>
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={13} className="mt-0.5 shrink-0" style={{ color: "#D4AF37" }} />
                <span className="text-[13px] leading-relaxed" style={{ color: "#777" }}>
                  {address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={13} className="shrink-0" style={{ color: "#D4AF37" }} />
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-[13px] hover:text-amber-400 transition-colors" style={{ color: "#777" }}>
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={13} className="shrink-0" style={{ color: "#D4AF37" }} />
                <a href={`mailto:${email}`} className="text-[13px] hover:text-amber-400 transition-colors" style={{ color: "#777" }}>
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={13} className="shrink-0" style={{ color: "#D4AF37" }} />
                <span className="text-[13px]" style={{ color: "#777" }}>
                  {hours}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="gold-divider mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px]" style={{ color: "#444" }}>
            © {new Date().getFullYear()} Imarat-e-Shariah Karnataka. All rights reserved.
          </p>
          <p
            className="text-[12px]"
            dir="rtl"
            style={{ color: "#444", fontFamily: "'Noto Nastaliq Urdu', serif" }}
          >
            جملہ حقوق محفوظ ہیں — کرناٹک
          </p>
        </div>
      </div>
    </footer>
  );
}
