/* =============================================================
   HERO SECTION — Taylor Made Estimates
   Asymmetric layout: bold left headline + right illustration
   Theme: Off-white bg, deep green text
   Font: Outfit (headlines + body) + JetBrains Mono (stats)
   Animation: BlueprintAnimation SVG watermark at 40% opacity
   ============================================================= */

import { useEffect, useRef } from "react";
import { ArrowRight, CheckCircle2, Shield } from "lucide-react";
import BlueprintAnimation from "@/components/BlueprintAnimation";

const HERO_ILLUSTRATION_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663273809872/5KZhWMVrwRJzfGPbbY3g4v/tme-hero-v2-58XAL7a88gwvCyNArLzit8.webp";

// Image already shows Level 3 and 24-48hr — only show non-redundant stats here
const stats = [
  { icon: Shield, value: "IICRC Certified", label: "Water · Fire · Mold · Drying · Odor" },
  { icon: CheckCircle2, value: "No Contracts", label: "Required" },
];

const lossTypes = ["Water Mitigation", "Fire Damage", "Mold Remediation", "Reconstruction"];

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const children = el.querySelectorAll(".hero-animate");
    children.forEach((child, i) => {
      (child as HTMLElement).style.opacity = "0";
      (child as HTMLElement).style.transform = "translateY(28px)";
      setTimeout(() => {
        (child as HTMLElement).style.transition = "opacity 0.6s ease, transform 0.6s ease";
        (child as HTMLElement).style.opacity = "1";
        (child as HTMLElement).style.transform = "translateY(0)";
      }, 100 + i * 110);
    });
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 lg:pt-24 overflow-hidden"
      style={{ background: "oklch(0.98 0.005 90)" }}
    >
      {/* Blueprint watermark animation */}
      <BlueprintAnimation />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.80 0.05 152 / 0.15) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.80 0.05 152 / 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          zIndex: 1,
        }}
      />

      {/* Green accent blob top-right */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-8 pointer-events-none"
        style={{ background: "oklch(0.42 0.11 152)", zIndex: 1 }}
      />

      <div className="container relative py-16 lg:py-24" style={{ zIndex: 2 }}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Content */}
          <div className="flex flex-col gap-6">
            <div className="hero-animate">
              <span className="tme-section-label">Professional Xactimate Estimating</span>
            </div>

            <h1
              className="hero-animate font-bold leading-tight"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2.6rem, 5vw, 3.8rem)",
                color: "oklch(0.20 0.025 152)",
                lineHeight: "1.08",
                letterSpacing: "-0.025em",
              }}
            >
              From the Field
              <br />
              <span style={{ color: "oklch(0.28 0.09 152)" }}>to the File.</span>
            </h1>

            <p
              className="hero-animate font-semibold"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                color: "oklch(0.38 0.04 152)",
                letterSpacing: "-0.015em",
              }}
            >
              Estimates That Get Approved.
            </p>

            <p
              className="hero-animate text-lg leading-relaxed max-w-xl"
              style={{ color: "oklch(0.45 0.02 152)", fontFamily: "'Outfit', sans-serif" }}
            >
              Taylor Made Estimates delivers accurate, certified Xactimate estimates
              for restoration contractors and insurance carriers — backed by 30+ years
              of hands-on field and claims experience.
            </p>

            {/* Loss type chips */}
            <div className="hero-animate flex flex-wrap gap-2">
              {lossTypes.map((type) => (
                <span
                  key={type}
                  className="px-3 py-1.5 text-sm font-medium rounded-full border"
                  style={{
                    borderColor: "oklch(0.60 0.10 152)",
                    color: "oklch(0.28 0.09 152)",
                    background: "oklch(0.96 0.02 152)",
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  {type}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hero-animate flex flex-col sm:flex-row gap-3">
              <button
                onClick={scrollToContact}
                className="group flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white rounded-md transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  background: "oklch(0.28 0.09 152)",
                  boxShadow: "0 4px 16px oklch(0.28 0.09 152 / 0.35)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "oklch(0.22 0.07 152)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "oklch(0.28 0.09 152)"; }}
              >
                Request an Estimate
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={scrollToServices}
                className="flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold rounded-md border-2 transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  borderColor: "oklch(0.28 0.09 152)",
                  color: "oklch(0.28 0.09 152)",
                  background: "transparent",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "oklch(0.94 0.03 152)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                View Our Services
              </button>
            </div>

            {/* Non-redundant stat chips (image already shows Level 3 + 24-48hr) */}
            <div className="hero-animate flex flex-wrap gap-3 pt-2">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={value} className="tme-stat-chip flex-col items-start gap-1 py-3">
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" style={{ color: "oklch(0.42 0.11 152)" }} />
                    <span className="text-sm font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {value}
                    </span>
                  </div>
                  <span className="text-xs font-normal" style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.45 0.02 152)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Illustration — image already contains Level 3 + 24-48hr badges */}
          <div className="hero-animate relative flex items-center justify-center">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "oklch(0.94 0.03 152)",
                padding: "2rem",
                boxShadow: "0 20px 60px oklch(0.22 0.07 152 / 0.15)",
              }}
            >
              <img
                src={HERO_ILLUSTRATION_URL}
                alt="Xactimate Level 3 certified estimate — house blueprint with measurement tools and Xactimate software"
                className="w-full h-auto rounded-xl"
                style={{ maxWidth: "520px" }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ zIndex: 2 }}>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
