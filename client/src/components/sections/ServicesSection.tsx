/* =============================================================
   SERVICES SECTION — Taylor Made Estimates
   6-card grid with green top-accent cards + loss type callouts
   ============================================================= */

import { useEffect, useRef } from "react";
import {
  FileText, PenTool, Search, Camera, FolderOpen,
  TrendingUp, Package, Handshake
} from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Xactimate Estimate Writing",
    description:
      "Complete, line-item Xactimate estimates for mitigation, reconstruction, and contents. Accurate scopes that align with carrier expectations and industry pricing.",
  },
  {
    icon: PenTool,
    title: "Sketch Creation",
    description:
      "Professional Xactimate sketches built from photos, measurements, Matterport scans, or provided sketch files. Precise floor plans that support your estimate scope.",
  },
  {
    icon: Search,
    title: "Scope & Claim Review",
    description:
      "Thorough review of existing estimates, carrier scopes, and claim files to identify missing line items, pricing gaps, and documentation deficiencies.",
  },
  {
    icon: Camera,
    title: "Photo Review",
    description:
      "Detailed review of job site photos to identify scope items, document conditions, and support estimate accuracy and supplement justification.",
  },
  {
    icon: TrendingUp,
    title: "Supplement Writing",
    description:
      "Expert supplement development and documentation when additional claim justification is required. We build the case to support your full scope of work.",
  },
  {
    icon: Handshake,
    title: "Insurance Negotiation Support",
    description:
      "Strategic support when negotiating scope and pricing with insurance adjusters. Backed by 30+ years of claims experience on both sides of the table.",
  },
  {
    icon: Package,
    title: "Insurance Collections Support",
    description:
      "Dedicated support for claim payment follow-up and collections assistance. We help ensure your completed work gets paid — from initial submission through final resolution.",
  },
  {
    icon: FolderOpen,
    title: "Claim File Review",
    description:
      "Comprehensive review of complete claim files including monitor sheets, demo sheets, and carrier correspondence to ensure nothing is missed.",
  },
];

const lossTypes = [
  { label: "Water Mitigation", color: "oklch(0.42 0.11 152)" },
  { label: "Fire & Smoke Damage", color: "oklch(0.42 0.11 152)" },
  { label: "Mold Remediation", color: "oklch(0.42 0.11 152)" },
  { label: "Reconstruction / Rebuild", color: "oklch(0.42 0.11 152)" },
];

const deliverables = [
  "Xactimate ESX File",
  "PDF Estimate",
  "Supplement Documentation",
  "Detailed Written Scope of Repairs",
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-up").forEach((el, i) => {
              setTimeout(() => {
                el.classList.add("visible");
              }, i * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-20 lg:py-28 bg-white">
      <div className="container">
        {/* Header */}
        <div className="max-w-2xl mb-14 fade-up">
          <span className="tme-section-label">What We Do</span>
          <h2
            className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold"
            style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.20 0.025 152)" }}
          >
            Estimating Services Built
            <br />
            <span style={{ color: "oklch(0.28 0.09 152)" }}>for Restoration Professionals</span>
          </h2>
          <p className="mt-4 text-lg" style={{ color: "oklch(0.45 0.02 152)" }}>
            From a single estimate to full-volume estimating partnership — we handle
            every type of loss, every step of the claim lifecycle.
          </p>
        </div>

        {/* Loss Types */}
        <div className="fade-up flex flex-wrap gap-3 mb-12">
          <span className="text-sm font-semibold mr-2" style={{ color: "oklch(0.45 0.02 152)" }}>
            Types of Losses:
          </span>
          {lossTypes.map((lt) => (
            <span
              key={lt.label}
              className="px-4 py-1.5 rounded-full text-sm font-semibold"
              style={{
                background: "oklch(0.94 0.03 152)",
                color: "oklch(0.28 0.09 152)",
                border: "1px solid oklch(0.80 0.05 152)",
              }}
            >
              {lt.label}
            </span>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div key={service.title} className="tme-service-card fade-up">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "oklch(0.94 0.03 152)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "oklch(0.28 0.09 152)" }} />
                </div>
                <h3
                  className="text-base font-bold mb-2"
                  style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.20 0.025 152)" }}
                >
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "oklch(0.50 0.02 152)" }}>
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Deliverables */}
        <div
          className="fade-up rounded-xl p-6 lg:p-8 flex flex-col lg:flex-row items-start lg:items-center gap-6"
          style={{ background: "oklch(0.97 0.015 152)", border: "1px solid oklch(0.88 0.04 152)" }}
        >
          <div className="flex-1">
            <h3
              className="text-xl font-bold mb-1"
              style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.20 0.025 152)" }}
            >
              What You Receive
            </h3>
            <p className="text-sm" style={{ color: "oklch(0.45 0.02 152)" }}>
              Every completed estimate is delivered with professional documentation ready for carrier submission.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {deliverables.map((d) => (
              <span
                key={d}
                className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold"
                style={{
                  background: "oklch(0.28 0.09 152)",
                  color: "white",
                }}
              >
                <span className="text-xs opacity-70">✓</span>
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
