"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import SectionReveal from "@/components/ui/SectionReveal";
import { GALLERY_IMAGES } from "@/lib/data";

const categoryGradients: Record<string, string> = {
  events: "linear-gradient(135deg, #D4AF37 0%, #FFD8A8 100%)",
  judicial: "linear-gradient(135deg, #4169E1 0%, #6C5CE7 100%)",
  community: "linear-gradient(135deg, #2ECC71 0%, #00CEC9 100%)",
  education: "linear-gradient(135deg, #A29BFE 0%, #E84393 100%)",
  leadership: "linear-gradient(135deg, #D4AF37 0%, #F3D28B 100%)",
};

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filters = [
    { id: "all", label: "All" },
    { id: "events", label: "Events" },
    { id: "judicial", label: "Judicial" },
    { id: "community", label: "Community" },
    { id: "education", label: "Education" },
    { id: "leadership", label: "Leadership" },
  ];

  const filtered = activeFilter === "all" ? GALLERY_IMAGES : GALLERY_IMAGES.filter((img) => img.category === activeFilter);

  return (
    <div style={{ background: "var(--bg-primary)" }}>
      <PageHero
        title="Gallery"
        subtitle="Captured moments from events, sessions, and community gatherings"
        breadcrumb={["Home", "Gallery"]}
      />

      {/* Filter Tabs */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: activeFilter === filter.id ? "rgba(212,175,55,0.15)" : "var(--card-bg)",
                  color: activeFilter === filter.id ? "var(--gold)" : "var(--text-secondary)",
                  border: "1px solid",
                  borderColor: activeFilter === filter.id ? "rgba(212,175,55,0.3)" : "var(--card-border)",
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((img, i) => (
              <SectionReveal key={img.id} delay={i * 0.05}>
                <motion.div
                  className="relative rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    background: categoryGradients[img.category] || categoryGradients.events,
                    border: "1px solid var(--card-border)",
                    aspectRatio: i % 3 === 0 ? "1" : i % 3 === 1 ? "3/4" : "4/3",
                  }}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setSelectedImage(img.id)}
                >
                  <div
                    className="absolute inset-0 flex items-end p-4"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent 60%)" }}
                  >
                    <div>
                      <p className="text-white text-xs font-semibold mb-1">{img.title}</p>
                      <p className="text-white/70 text-[10px] capitalize">{img.category}</p>
                    </div>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(10px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: categoryGradients[GALLERY_IMAGES.find((img) => img.id === selectedImage)?.category || "events"],
                  aspectRatio: "16/9",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white text-2xl font-bold mb-2">
                      {GALLERY_IMAGES.find((img) => img.id === selectedImage)?.title}
                    </p>
                    <p className="text-white/70 text-sm capitalize">
                      {GALLERY_IMAGES.find((img) => img.id === selectedImage)?.category}
                    </p>
                  </div>
                </div>
              </div>
              <button
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white"
                style={{ background: "rgba(0,0,0,0.5)" }}
                onClick={() => setSelectedImage(null)}
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
