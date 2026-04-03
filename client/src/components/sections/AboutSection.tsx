/* =============================================================
   ABOUT SECTION — Taylor Made Estimates
   Team background, certifications, experience highlights
   Woman-owned note is subtle, in the closing paragraph
   ============================================================= */

import { useEffect, useRef } from "react";
import { Award, Users, TrendingUp, Wrench } from "lucide-react";

const ABOUT_PHOTO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663273809872/5KZhWMVrwRJzfGPbbY3g4v/tme-about-v2-6V2raoVyhZZdHMTMH5988U.webp";

const certifications = [
  { label: "Xactimate Level 3 Certified", highlight: true },
  { label: "IICRC — Water Restoration (WRT)" },
  { label: "IICRC — Mold Remediation (AMRT)" },
  { label: "IICRC — Fire & Smoke Restoration (FSRT)" },
  { label: "IICRC — Applied Structural Drying (ASD)" },
  { label: "IICRC — Odor Control (OCT)" },
];

const experienceHighlights = [
  { icon: Users, stat: "40+", label: "Employees Managed", sub: "Across mitigation, reconstruction & estimating" },
  { icon: TrendingUp, stat: "30+", label: "Years Experience", sub: "Restoration, construction & insurance claims" },
  { icon: Award, stat: "Level 3", label: "Xactimate Certified", sub: "Highest professional certification level" },
  { icon: Wrench, stat: "5 IICRC", label: "Certifications", sub: "Water, fire, mold, smoke, odor" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-up").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
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
    <section
      id="about"
      ref={sectionRef}
      className="py-20 lg:py-28"
      style={{ background: "oklch(0.98 0.005 90)" }}
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* Left: Content */}
          <div>
            <div className="fade-up">
              <span className="tme-section-label">About Taylor Made Estimates</span>
              <h2
                className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold"
                style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.20 0.025 152)" }}
              >
                Built by People Who've
                <br />
                <span style={{ color: "oklch(0.28 0.09 152)" }}>Worked the Field</span>
              </h2>
            </div>

            <div className="fade-up mt-6 space-y-4 text-base leading-relaxed" style={{ color: "oklch(0.40 0.02 152)" }}>
              <p>
                Taylor Made Estimates is led by professionals with <strong style={{ color: "oklch(0.28 0.09 152)" }}>30+ years of combined experience</strong> across
                restoration operations, reconstruction estimating, and insurance claims. Our team brings hands-on field
                expertise together with advanced Xactimate proficiency — producing estimates that are precise
                and aligned with carrier expectations.
              </p>
              <p>
                The Taylor Made team has progressed from field technician roles through senior
                operational leadership, including Director of Operations responsibilities overseeing 40+ employees
                across mitigation, reconstruction, estimating, and administrative teams. That operational background
                means we understand how restoration projects are actually executed — and we write estimates that
                reflect real-world project requirements.
              </p>
              <p>
                Our background spans water mitigation and structural drying, fire and smoke damage restoration,
                mold remediation, reconstruction estimating, insurance claim negotiation, collecting on claims, and supplement documentation.
                We've managed large restoration portfolios, negotiated directly with insurance adjusters, and overseen
                significant monthly claim volumes from approval through payment collection.
              </p>
              <p>
                The team also brings experience in related home service industries — plumbing, HVAC, electrical, and
                restoration — providing additional technical insight when identifying causes of damage and properly
                documenting claims for carrier review.
              </p>
              <p className="text-sm italic" style={{ color: "oklch(0.55 0.02 152)" }}>
                Taylor Made Estimates is a woman-owned professional services company committed to delivering
                exceptional estimating quality for restoration contractors nationwide.
              </p>
            </div>

            {/* Certifications */}
            <div className="fade-up mt-8">
              <h3
                className="text-lg font-bold mb-4"
                style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.20 0.025 152)" }}
              >
                Certifications
              </h3>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div
                    key={cert.label}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg"
                    style={{
                      background: cert.highlight ? "oklch(0.28 0.09 152)" : "white",
                      border: cert.highlight ? "none" : "1px solid oklch(0.88 0.03 152)",
                    }}
                  >
                    <span
                      className="text-sm font-semibold"
                      style={{ color: cert.highlight ? "white" : "oklch(0.30 0.05 152)" }}
                    >
                      {cert.highlight ? "★ " : "✓ "}{cert.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Photo + Stats */}
          <div className="flex flex-col gap-6">
            <div className="fade-up relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 20px 60px oklch(0.20 0.025 152 / 0.12)" }}>
              <img
                src={ABOUT_PHOTO_URL}
                alt="Taylor Made Estimates team"
                className="w-full h-auto"
              />
            </div>

            {/* Experience stats grid */}
            <div className="fade-up grid grid-cols-2 gap-4">
              {experienceHighlights.map(({ icon: Icon, stat, label, sub }) => (
                <div
                  key={label}
                  className="rounded-xl p-5"
                  style={{
                    background: "white",
                    border: "1px solid oklch(0.88 0.03 152)",
                    boxShadow: "0 2px 8px oklch(0.20 0.025 152 / 0.05)",
                  }}
                >
                  <Icon className="w-5 h-5 mb-3" style={{ color: "oklch(0.42 0.11 152)" }} />
                  <div
                    className="text-2xl font-bold mb-1"
                    style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.28 0.09 152)" }}
                  >
                    {stat}
                  </div>
                  <div className="text-sm font-semibold" style={{ color: "oklch(0.25 0.04 152)" }}>
                    {label}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "oklch(0.55 0.02 152)" }}>
                    {sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
