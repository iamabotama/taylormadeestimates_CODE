/* =============================================================
   WHY TME + PROCESS SECTION — Taylor Made Estimates
   3-column value props + 5-step horizontal process timeline
   ============================================================= */

import { useEffect, useRef } from "react";
import { Zap, Shield, Users, Clock, FileCheck, MessageSquare, Send, RefreshCw } from "lucide-react";

const PROCESS_BG_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663273809872/5KZhWMVrwRJzfGPbbY3g4v/tme-process-bg-cEwtUwXdt5UGxDJTF5XamH.webp";

const whyItems = [
  {
    icon: Shield,
    title: "IICRC-Certified Expertise",
    description:
      "Xactimate Level 3 certified and IICRC-certified in water damage, structural drying, odor control, and related restoration services. We know the standards carriers expect.",
  },
  {
    icon: Zap,
    title: "Fast, Reliable Turnaround",
    description:
      "Standard 24–48 hour delivery. Same-day rush available for emergency situations. We keep your claims moving and your backlog clear.",
  },
  {
    icon: Users,
    title: "30+ Years Field Experience",
    description:
      "Our professional team has served in roles ranging from field technician to director of operations, with experience at every stage in between.",
  },
];

const processSteps = [
  {
    number: "01",
    icon: Send,
    title: "Submit Your Claim Info",
    description:
      "Send us photos, scope notes, measurements, Matterport scans, sketch files, monitor sheets, plumber's reports, demo sheets, and all available documentation.",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "We Review & Confirm",
    description:
      "Our team reviews your documentation and confirms scope details. We'll reach out if we need clarification to ensure accuracy.",
  },
  {
    number: "03",
    icon: FileCheck,
    title: "Estimate Written in Xactimate",
    description:
      "Your estimate is built line-by-line in Xactimate with accurate pricing, proper documentation, and carrier-compliant formatting.",
  },
  {
    number: "04",
    icon: Clock,
    title: "Delivered in 24–48 Hours",
    description:
      "Completed estimate delivered via email or secure file link — ESX file and PDF, ready for carrier submission.",
  },
  {
    number: "05",
    icon: RefreshCw,
    title: "Supplement Support",
    description:
      "If the carrier requests additional justification, we prepare supplement documentation and revisions to support your full scope.",
  },
];

const materialsAccepted = [
  "Photos", "Scope Notes", "Measurements", "Matterport Scans",
  "Sketch Files", "Insurance Scope / Carrier Estimate",
  "Monitor Sheets", "Demo Sheets", "Plumber's Report",
];

export default function ProcessSection() {
  const whyRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

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
    if (whyRef.current) observer.observe(whyRef.current);
    if (processRef.current) observer.observe(processRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Why Taylor Made */}
      <section
        ref={whyRef}
        className="py-20 lg:py-28"
        style={{ background: "oklch(0.97 0.015 152)" }}
      >
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14 fade-up">
            <span className="tme-section-label">Why Choose Us</span>
            <h2
              className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold"
              style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.20 0.025 152)" }}
            >
              The Estimating Partner
              <br />
              <span style={{ color: "oklch(0.28 0.09 152)" }}>Contractors Rely On</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="fade-up rounded-xl p-8 bg-white"
                  style={{ boxShadow: "0 2px 16px oklch(0.20 0.025 152 / 0.07)" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: "oklch(0.28 0.09 152)" }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.20 0.025 152)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: "oklch(0.45 0.02 152)" }}>
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* No contracts callout */}
          <div
            className="fade-up mt-10 rounded-xl p-6 lg:p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left"
            style={{ background: "oklch(0.28 0.09 152)" }}
          >
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                No Monthly Contracts. No Annual Commitments.
              </h3>
              <p className="text-sm text-white/80">
                Use Taylor Made Estimates on an as-needed basis — for overflow, vacations, staffing gaps, or as your dedicated estimating team.
                Custom agreements available for high-volume clients.
              </p>
            </div>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="flex-shrink-0 px-6 py-3 bg-white rounded-md text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ color: "oklch(0.28 0.09 152)" }}
            >
              Get a Custom Quote
            </button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section
        id="process"
        ref={processRef}
        className="py-20 lg:py-28 relative overflow-hidden"
        style={{ background: "white" }}
      >
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `url(${PROCESS_BG_URL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="container relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14 fade-up">
            <span className="tme-section-label">How It Works</span>
            <h2
              className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold"
              style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.20 0.025 152)" }}
            >
              Simple Process.
              <br />
              <span style={{ color: "oklch(0.28 0.09 152)" }}>Professional Results.</span>
            </h2>
            <p className="mt-4 text-lg" style={{ color: "oklch(0.45 0.02 152)" }}>
              Submit your claim documentation and we handle the rest — from scope review
              to final estimate delivery.
            </p>
          </div>

          {/* Process Steps */}
          <div className="relative">
            {/* Connector line (desktop) */}
            <div
              className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 pointer-events-none"
              style={{ background: "oklch(0.80 0.05 152)" }}
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {processSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.number} className="fade-up flex flex-col items-center text-center lg:items-center">
                    {/* Step circle */}
                    <div
                      className="relative w-20 h-20 rounded-full flex flex-col items-center justify-center mb-5 z-10"
                      style={{
                        background: "oklch(0.28 0.09 152)",
                        boxShadow: "0 4px 16px oklch(0.28 0.09 152 / 0.3)",
                      }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                      <span
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{
                          background: "oklch(0.68 0.14 65)",
                          color: "white",
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {i + 1}
                      </span>
                    </div>
                    <h3
                      className="text-base font-bold mb-2"
                      style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.20 0.025 152)" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "oklch(0.50 0.02 152)" }}>
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Materials Accepted */}
          <div
            className="fade-up mt-14 rounded-xl p-6 lg:p-8"
            style={{ background: "oklch(0.97 0.015 152)", border: "1px solid oklch(0.88 0.04 152)" }}
          >
            <h3
              className="text-lg font-bold mb-4"
              style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.20 0.025 152)" }}
            >
              Materials We Accept From Clients
            </h3>
            <div className="flex flex-wrap gap-2">
              {materialsAccepted.map((m) => (
                <span
                  key={m}
                  className="px-3 py-1.5 rounded-md text-sm font-medium"
                  style={{
                    background: "white",
                    color: "oklch(0.35 0.05 152)",
                    border: "1px solid oklch(0.85 0.04 152)",
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
