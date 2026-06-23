"use client";

import PageHero from "@/components/ui/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import SectionReveal from "@/components/ui/SectionReveal";

export default function TermsPage() {
  return (
    <div style={{ background: "var(--bg-primary)" }}>
      <PageHero
        title="Terms & Conditions"
        subtitle="Please read these terms carefully before using our services"
        breadcrumb={["Home", "Terms & Conditions"]}
      />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {[
            {
              title: "Acceptance of Terms",
              content: "By accessing or using the services of Imarat-e-Shariyah Karnataka, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not access our services.",
            },
            {
              title: "Services Description",
              content: "Imarat-e-Shariyah Karnataka provides Islamic judicial services through Darul Qaza, religious guidance through Darul Ifta, educational programs, community welfare initiatives, and related services. All services are provided in accordance with Islamic principles and Shariah law.",
            },
            {
              title: "User Responsibilities",
              content: "Users are responsible for providing accurate and complete information when engaging with our services. You agree to conduct yourself respectfully and truthfully in all interactions with our scholars, staff, and other community members.",
            },
            {
              title: "Case Filing Terms",
              content: "When filing a case with Darul Qaza, you agree to provide all relevant documentation truthfully, attend scheduled hearings, abide by the court's procedures, and accept the ruling issued in accordance with Shariah principles. Case filings are subject to review and acceptance.",
            },
            {
              title: "Intellectual Property",
              content: "All content on our website and materials produced by Imarat-e-Shariyah Karnataka, including text, graphics, logos, and documents, are the property of the organization and are protected by applicable intellectual property laws.",
            },
            {
              title: "Limitation of Liability",
              content: "Imarat-e-Shariyah Karnataka shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our liability is limited to the maximum extent permitted by law.",
            },
            {
              title: "Dispute Resolution",
              content: "Any disputes arising from these terms or our services shall be resolved through Islamic arbitration in accordance with Shariah principles. The decision of the arbitration panel shall be final and binding.",
            },
            {
              title: "Modifications",
              content: "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after changes constitutes acceptance of the modified terms.",
            },
            {
              title: "Governing Law",
              content: "These terms shall be governed by and construed in accordance with the laws of India. Any legal proceedings shall be subject to the jurisdiction of the courts in Karnataka.",
            },
          ].map((section, i) => (
            <SectionReveal key={section.title} delay={i * 0.05}>
              <GlassCard>
                <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
                  {section.title}
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {section.content}
                </p>
              </GlassCard>
            </SectionReveal>
          ))}

          <SectionReveal>
            <p className="text-xs text-center mt-8" style={{ color: "var(--text-muted)" }}>
              Last updated: January 2025
            </p>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
