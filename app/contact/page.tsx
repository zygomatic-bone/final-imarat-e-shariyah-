"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import SectionReveal from "@/components/ui/SectionReveal";
import GlassButton from "@/components/ui/GlassButton";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div style={{ background: "var(--bg-primary)" }}>
      <PageHero
        title="Contact Us"
        subtitle="Reach out for inquiries, case filings, or general guidance"
        breadcrumb={["Home", "Contact Us"]}
      />

      {/* Contact Info + Form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-5">
              <SectionReveal>
                <div className="section-label">Get In Touch</div>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6" style={{ color: "var(--text-primary)" }}>
                  Contact Information
                </h2>
              </SectionReveal>

              {[
                { icon: MapPin, label: "Address", value: "Imarat-e-Shariyah Karnataka, Bengaluru, Karnataka, India" },
                { icon: Phone, label: "Phone", value: "+91 96320 48130" },
                { icon: Mail, label: "Email", value: "info@imarateshariyah.in" },
                { icon: Clock, label: "Hours", value: "Saturday - Thursday, 9 AM - 5 PM IST" },
              ].map((item, i) => (
                <SectionReveal key={item.label} delay={i * 0.08}>
                  <GlassCard>
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "rgba(212,175,55,0.1)" }}
                      >
                        <item.icon size={18} style={{ color: "var(--gold)" }} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--text-muted)" }}>
                          {item.label}
                        </p>
                        <p className="text-sm" style={{ color: "var(--text-primary)" }}>
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </SectionReveal>
              ))}
            </div>

            {/* Contact Form */}
            <SectionReveal delay={0.2}>
              <GlassCard className="p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(212,175,55,0.12)" }}>
                      <span style={{ color: "var(--gold)", fontSize: 28 }}>✓</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                      Message Sent
                    </h3>
                    <p style={{ color: "var(--text-secondary)" }}>We will get back to you shortly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
                      Send us a Message
                    </h3>

                    {[
                      { id: "name", label: "Your Name", type: "text", placeholder: "Enter your full name" },
                      { id: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
                      { id: "subject", label: "Subject", type: "text", placeholder: "How can we help?" },
                    ].map((field) => (
                      <div key={field.id}>
                        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          required
                          value={formData[field.id as keyof typeof formData]}
                          onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                          style={{
                            background: "var(--bg-secondary)",
                            border: "1px solid var(--card-border)",
                            color: "var(--text-primary)",
                          }}
                          placeholder={field.placeholder}
                        />
                      </div>
                    ))}

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>
                        Message
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                        style={{
                          background: "var(--bg-secondary)",
                          border: "1px solid var(--card-border)",
                          color: "var(--text-primary)",
                        }}
                        placeholder="Your message..."
                      />
                    </div>

                    <GlassButton variant="gold" size="lg" type="submit" className="w-full">
                      Send Message
                    </GlassButton>
                  </form>
                )}
              </GlassCard>
            </SectionReveal>
          </div>
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
                Our Location
              </h3>
              <p className="text-base mb-6" style={{ color: "var(--text-secondary)" }}>
                Markazi Darul Qaza, Shivajinagar, Bengaluru, Karnataka 560001
              </p>
              <div
                className="w-full h-64 rounded-xl"
                style={{
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--card-border)",
                }}
              />
            </GlassCard>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
