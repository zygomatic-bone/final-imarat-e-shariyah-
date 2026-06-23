"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Footer() {
  const quickLinks = NAV_LINKS.slice(0, 5);
  const mediaLinks = [
    { label: "News & Articles", href: "/media" },
    { label: "Gallery", href: "/gallery" },
    { label: "Videos", href: "/media" },
  ];
  const resourceLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Contact Us", href: "/contact" },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <footer className="relative z-10" style={{ background: "#0A0A0A", borderTop: "1px solid rgba(212,175,55,0.1)" }}>
      <div className="gold-divider" />

      <motion.div
        className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold gold-gradient">
                ع
              </div>
              <div>
                <p className="font-semibold text-sm text-white">Imarat-e-Shariyah</p>
                <p className="text-xs mt-0.5" style={{ color: "#D4AF37", fontFamily: "'Noto Nastaliq Urdu', serif" }}>
                  امارت شریعہ
                </p>
              </div>
            </div>
            <p className="text-[13px] leading-relaxed mb-5" style={{ color: "#777" }}>
              Preserving Shariah. Serving Ummah. Building Harmony.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: XIcon, label: "X" },
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube, label: "YouTube" },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href="#"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                  style={{ background: "rgba(255,255,255,0.06)", color: "#777" }}
                  whileHover={{ background: "rgba(212,175,55,0.15)", color: "#D4AF37" }}
                  aria-label={s.label}
                >
                  {typeof s.icon === "function" && s.icon.toString().includes("svg") ? (
                    <s.icon />
                  ) : (
                    <s.icon size={14} />
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-[11px] font-semibold tracking-widest uppercase mb-5" style={{ color: "#D4AF37" }}>
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] transition-colors hover:text-amber-400" style={{ color: "#777" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Media */}
          <motion.div variants={itemVariants}>
            <h4 className="text-[11px] font-semibold tracking-widest uppercase mb-5" style={{ color: "#D4AF37" }}>
              Media
            </h4>
            <ul className="space-y-2.5">
              {mediaLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[13px] transition-colors hover:text-amber-400" style={{ color: "#777" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants}>
            <h4 className="text-[11px] font-semibold tracking-widest uppercase mb-5" style={{ color: "#D4AF37" }}>
              Resources
            </h4>
            <ul className="space-y-2.5">
              {resourceLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[13px] transition-colors hover:text-amber-400" style={{ color: "#777" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h4 className="text-[11px] font-semibold tracking-widest uppercase mb-5" style={{ color: "#D4AF37" }}>
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={13} className="mt-0.5 shrink-0" style={{ color: "#D4AF37" }} />
                <span className="text-[13px]" style={{ color: "#777" }}>+91 96320 48130</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={13} className="mt-0.5 shrink-0" style={{ color: "#D4AF37" }} />
                <span className="text-[13px]" style={{ color: "#777" }}>info@imarateshariyah.in</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={13} className="mt-0.5 shrink-0" style={{ color: "#D4AF37" }} />
                <span className="text-[13px] leading-relaxed" style={{ color: "#777" }}>
                  Imarat-e-Shariyah Karnataka, Bengaluru, Karnataka, India
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="gold-divider mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px]" style={{ color: "#444" }}>
            &copy; 2025 Imarat-e-Shariyah Karnataka. All rights reserved.
          </p>
          <p className="text-[12px]" dir="rtl" style={{ color: "#444", fontFamily: "'Noto Nastaliq Urdu', serif" }}>
            جملہ حقوق محفوظ ہیں — کرناٹک
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
