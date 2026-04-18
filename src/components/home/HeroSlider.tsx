"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Wrench,
  Building2,
  Headphones,
  Users,
} from "lucide-react";

const slides = [
  {
    id: 1,
    eyebrow: "Chromatography Excellence",
    title: "Chromatography Solutions & Consumables",
    subtitle:
      "Genuine chromatography consumables and spares for various brands, collaborating with worldwide partners.",
    cta: { label: "Explore Products", href: "/products" },
    cta2: { label: "Get a Quote", href: "/contact" },
    icon: FlaskConical,
    gradient: "from-[#0D2240] via-[#1565C0] to-[#0097A7]",
    accent: "#00E5FF",
    pattern: "molecules",
  },
  {
    id: 2,
    eyebrow: "Laboratory Equipment",
    title: "World-Class Laboratory Equipment & Instruments",
    subtitle:
      "Analytical, Life Sciences and General Laboratory equipment from global OEM providers.",
    cta: { label: "View Equipment", href: "/products" },
    cta2: { label: "About Us", href: "/about" },
    icon: Building2,
    gradient: "from-[#0A2535] via-[#006064] to-[#0D47A1]",
    accent: "#69F0AE",
    pattern: "grid",
  },
  {
    id: 3,
    eyebrow: "Complete Lab Setup",
    title: "Turnkey Lab Projects & Furniture",
    subtitle:
      "From concept and design to full execution — furniture, equipment, and installations in a compliance environment.",
    cta: { label: "Our Services", href: "/services" },
    cta2: { label: "Contact Us", href: "/contact" },
    icon: Wrench,
    gradient: "from-[#0D1B2A] via-[#1B4332] to-[#0D47A1]",
    accent: "#FFCA28",
    pattern: "dots",
  },
  {
    id: 4,
    eyebrow: "Post-Purchase Support",
    title: "After-Sales Service & Support",
    subtitle:
      "Maintenance, training, calibration, and technical support to ensure reliable performance of your instruments.",
    cta: { label: "Service Contracts", href: "/services" },
    cta2: { label: "Contact Us", href: "/contact" },
    icon: Headphones,
    gradient: "from-[#1A0533] via-[#4A148C] to-[#0D47A1]",
    accent: "#EA80FC",
    pattern: "waves",
  },
  {
    id: 5,
    eyebrow: "Multivendor Support",
    title: "Elevating Analytical Service & Lab Equipment Solutions",
    subtitle:
      "Expert multivendor support for Agilent, Waters, Shimadzu, Sciex instruments at competitive costs.",
    cta: { label: "Learn More", href: "/services" },
    cta2: { label: "Our Partners", href: "/partners" },
    icon: Users,
    gradient: "from-[#0A1628] via-[#0D2240] to-[#004D40]",
    accent: "#40C4FF",
    pattern: "circuit",
  },
];

export default function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [current, setCurrent] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setCurrent(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  return (
    <section className="relative overflow-hidden">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide) => {
            const Icon = slide.icon;
            return (
              <div key={slide.id} className="flex-[0_0_100%] min-w-0">
                <div
                  className={`relative bg-gradient-to-br ${slide.gradient} min-h-[85vh] flex items-center`}
                >
                  {/* Background pattern */}
                  <div className="absolute inset-0 sci-grid-bg opacity-20" />
                  <div className="absolute inset-0 dot-pattern opacity-30" />

                  {/* Animated orbs */}
                  <div
                    className="absolute top-20 right-20 w-72 h-72 rounded-full blur-3xl opacity-15"
                    style={{ background: slide.accent }}
                  />
                  <div
                    className="absolute bottom-20 left-10 w-48 h-48 rounded-full blur-2xl opacity-10"
                    style={{ background: slide.accent }}
                  />

                  {/* Floating molecules decoration */}
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block opacity-10">
                    <svg viewBox="0 0 300 300" width="300" height="300">
                      <circle
                        cx="150"
                        cy="150"
                        r="80"
                        fill="none"
                        stroke="white"
                        strokeWidth="1"
                        strokeDasharray="4 8"
                      />
                      <circle
                        cx="150"
                        cy="150"
                        r="140"
                        fill="none"
                        stroke="white"
                        strokeWidth="0.5"
                        strokeDasharray="2 12"
                      />
                      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                        const x = Number(
                          (
                            150 +
                            80 * Math.cos((angle * Math.PI) / 180)
                          ).toFixed(2),
                        );
                        const y = Number(
                          (
                            150 +
                            80 * Math.sin((angle * Math.PI) / 180)
                          ).toFixed(2),
                        );
                        return (
                          <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="6"
                            fill="white"
                            opacity="0.8"
                          />
                        );
                      })}
                      <circle
                        cx="150"
                        cy="150"
                        r="15"
                        fill="white"
                        opacity="0.6"
                      />
                    </svg>
                  </div>

                  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                      key={slide.id}
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      className="text-white"
                    >
                      {/* Eyebrow */}
                      <div className="flex items-center gap-2 mb-5">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5">
                          <Icon size={14} style={{ color: slide.accent }} />
                          <span
                            className="text-xs font-bold uppercase tracking-[0.15em]"
                            style={{ color: slide.accent }}
                          >
                            {slide.eyebrow}
                          </span>
                        </div>
                      </div>

                      <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight mb-5">
                        {slide.title}
                      </h1>
                      <p className="text-blue-100 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
                        {slide.subtitle}
                      </p>

                      <div className="flex flex-wrap gap-3">
                        <Link
                          href={slide.cta.href}
                          className="group flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                          style={{
                            background: `linear-gradient(135deg, ${slide.accent}30, ${slide.accent}60)`,
                            border: `1px solid ${slide.accent}60`,
                          }}
                        >
                          {slide.cta.label}
                          <span className="group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </Link>
                        <Link
                          href={slide.cta2.href}
                          className="flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:-translate-y-0.5"
                        >
                          {slide.cta2.label}
                        </Link>
                      </div>

                      {/* Stats strip */}
                      <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-white/10">
                        {[
                          { label: "Years Experience", value: "10+" },
                          { label: "Global Partners", value: "15+" },
                          { label: "Happy Clients", value: "200+" },
                        ].map((stat) => (
                          <div key={stat.label}>
                            <div
                              className="text-2xl font-bold"
                              style={{ color: slide.accent }}
                            >
                              {stat.value}
                            </div>
                            <div className="text-xs text-blue-200 uppercase tracking-wide">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Right side icon display */}
                    <motion.div
                      key={`icon-${slide.id}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="hidden lg:flex items-center justify-center"
                    >
                      <div className="relative w-64 h-64">
                        <div
                          className="absolute inset-0 rounded-full blur-3xl opacity-20"
                          style={{ background: slide.accent }}
                        />
                        <div
                          className="relative w-full h-full rounded-full border border-white/10 flex items-center justify-center"
                          style={{ background: "rgba(255,255,255,0.05)" }}
                        >
                          <Icon size={80} className="text-white opacity-80" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 z-10"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 z-10"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-6 h-2 bg-white"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
