"use client";

import PageHero from "@/components/ui/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import SectionReveal from "@/components/ui/SectionReveal";

export default function PrivacyPolicyPage() {
  return (
    <div style={{ background: "var(--bg-primary)" }}>
      <PageHero
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information"
        breadcrumb={["Home", "Privacy Policy"]}
      />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {[
            {
              title: "Information We Collect",
              content: "We collect personal information that you voluntarily provide to us when you contact us, file a case, or engage with our services. This includes your name, contact details, identification documents, and case-related information. We also collect technical information such as IP addresses and browser types when you visit our website.",
            },
            {
              title: "How We Use Your Information",
              content: "Your information is used to provide our judicial services, communicate with you regarding your cases and inquiries, process applications, maintain records, and improve our services. We use your information to fulfill our mission of serving the Muslim community with justice and guidance.",
            },
            {
              title: "Data Protection",
              content: "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All case records and personal data are stored securely with restricted access.",
            },
            {
              title: "Third-Party Sharing",
              content: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law or as necessary to provide our services. We may share information with our branches, scholars, and authorized personnel on a need-to-know basis.",
            },
            {
              title: "Cookie Policy",
              content: "Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, though this may affect some functionality of the website.",
            },
            {
              title: "Your Rights",
              content: "You have the right to access, correct, or delete your personal information that we hold. You may also object to certain processing of your data. To exercise these rights, please contact us using the information provided on our Contact page.",
            },
            {
              title: "Contact Us",
              content: "If you have any questions or concerns about this Privacy Policy, please contact us at info@imarateshariyah.in or visit our office in Bengaluru.",
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
