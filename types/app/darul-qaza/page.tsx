"use client";

import { Scale, FileText, Users, Gavel, ArrowRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import SectionReveal from "@/components/ui/SectionReveal";
import { LEADERSHIP } from "@/lib/data";

const services = [
  { icon: FileText, title: "Marriage Disputes", desc: "Resolution of marital conflicts according to Shariah principles." },
  { icon: Scale, title: "Property Settlement", desc: "Fair distribution of property and assets in accordance with Islamic law." },
  { icon: FileText, title: "Inheritance Cases", desc: "Guidance on Islamic inheritance laws and distribution." },
  { icon: Users, title: "Business Disputes", desc: "Mediation and resolution of commercial conflicts." },
  { icon: Users, title: "Family Mediation", desc: "Reconciliation and mediation services for family matters." },
  { icon: Gavel, title: "Arbitration", desc: "Islamic arbitration services for various disputes." },
];

const process = [
  { step: "01", title: "File Application", desc: "Submit your case with relevant documentation." },
  { step: "02", title: "Document Review", desc: "Our scholars review all submitted materials." },
  { step: "03", title: "Hearing Scheduled", desc: "A hearing date is set and parties are notified." },
  { step: "04", title: "Mediation Attempt", desc: "Efforts are made to reach an amicable settlement." },
  { step: "05", title: "Shariah Ruling", desc: "If mediation fails, a ruling is issued based on Islamic law." },
  { step: "06", title: "Resolution", desc: "The case is resolved and documented." },
];

export default function DarulQazaPage() {
  return (
    <div style={{ background: "var(--bg-primary)" }}>
      <PageHero
        title="Darul Qaza"
        subtitle="Islamic judicial court resolving disputes according to Sharia"
        breadcrumb={["Home", "Darul Qaza"]}
      />

      {/* About */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionReveal>
            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>About Darul Qaza</h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                Darul Qaza is the Islamic judicial court of Imarat-e-Shariyah Karnataka, established to resolve disputes among Muslims according to the principles of Shariah. Our panel of qualified scholars and jurists provides accessible, fair, and expedient justice rooted in Islamic jurisprudence.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                The court handles a wide range of cases including family disputes, property matters, inheritance issues, and commercial conflicts. All proceedings are conducted with the utmost confidentiality, fairness, and adherence to Islamic principles.
              </p>
            </GlassCard>
          </SectionReveal>
        </div>
      </section>

      {/* Judges */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="section-label">Judges</div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-12" style={{ color: "var(--text-primary)" }}>
              Our Qazis
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {LEADERSHIP.slice(0, 3).map((judge, i) => (
              <SectionReveal key={judge.name} delay={i * 0.1}>
                <GlassCard className="text-center h-full">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4"
                    style={{
                      background: "rgba(212,175,55,0.12)",
                      border: "1px solid rgba(212,175,55,0.22)",
                      color: "var(--gold)",
                    }}
                  >
                    {judge.initials}
                  </div>
                  <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--gold)" }}>
                    {judge.role}
                  </p>
                  <h3 className="text-base font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                    {judge.name}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {judge.bio}
                  </p>
                </GlassCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="section-label">Services</div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-12" style={{ color: "var(--text-primary)" }}>
              What We Handle
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <SectionReveal key={service.title} delay={i * 0.08}>
                <GlassCard className="h-full">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(212,175,55,0.1)" }}>
                    <service.icon size={20} style={{ color: "var(--gold)" }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                    {service.title}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {service.desc}
                  </p>
                </GlassCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <div className="section-label">Case Process</div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-12 text-center" style={{ color: "var(--text-primary)" }}>
              How It Works
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {process.map((item, i) => (
              <SectionReveal key={item.step} delay={i * 0.08}>
                <GlassCard className="h-full relative">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-bold text-lg"
                      style={{ background: "rgba(212,175,55,0.1)", color: "var(--gold)" }}
                    >
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-base font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                        {item.title}
                      </h3>
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Information */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionReveal>
            <div className="section-label">Information</div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-12" style={{ color: "var(--text-primary)" }}>
              Frequently Asked Questions
            </h2>
          </SectionReveal>

          <div className="space-y-5">
            {[
              { q: "How to file a case?", a: "Visit any of our branches with your identification documents and a written complaint. Our staff will guide you through the registration process and help you understand the next steps." },
              { q: "What documents are needed?", a: "You will need valid identification (Aadhaar card, passport), relevant case documents, witness information if applicable, and any supporting evidence. Our team will provide a detailed checklist based on your case type." },
              { q: "Is the ruling binding?", a: "Darul Qaza rulings are morally binding for Muslims who voluntarily submit to the court's jurisdiction. While not legally enforceable in civil courts, our decisions are respected within the community and often facilitate peaceful resolutions." },
            ].map((faq, i) => (
              <SectionReveal key={i} delay={i * 0.08}>
                <GlassCard>
                  <h3 className="text-lg font-bold mb-3 flex items-start gap-3" style={{ color: "var(--text-primary)" }}>
                    <ArrowRight size={18} className="mt-1 shrink-0" style={{ color: "var(--gold)" }} />
                    {faq.q}
                  </h3>
                  <p className="text-sm leading-relaxed ml-9" style={{ color: "var(--text-secondary)" }}>
                    {faq.a}
                  </p>
                </GlassCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
