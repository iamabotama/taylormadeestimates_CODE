/* =============================================================
   TOOLS SECTION — Taylor Made Estimates
   Placeholder for future calculators and tools
   ============================================================= */

import { useEffect, useRef } from "react";
import { Calculator, BarChart3, FileSpreadsheet, Wrench } from "lucide-react";
import { toast } from "sonner";

const upcomingTools = [
  {
    icon: Calculator,
    title: "Estimate Cost Calculator",
    description:
      "Approximate your estimating costs before contacting us. Enter claim size, complexity, and turnaround requirements for a quick estimate.",
    badge: "Coming Soon",
  },
  {
    icon: BarChart3,
    title: "Supplement Value Analyzer",
    description:
      "Analyze your existing estimates to identify potential supplement opportunities and missing line items.",
    badge: "Coming Soon",
  },
  {
    icon: FileSpreadsheet,
    title: "Xactimate Pricing Reference",
    description:
      "Quick reference tool for common Xactimate line items, pricing categories, and scope documentation requirements.",
    badge: "Coming Soon",
  },
  {
    icon: Wrench,
    title: "Scope Checklist Generator",
    description:
      "Generate customized scope checklists by loss type to ensure complete documentation before submitting your claim.",
    badge: "Coming Soon",
  },
];

export default function ToolsSection() {
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
      id="tools"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-white"
    >
      <div className="container">
        <div className="max-w-2xl mb-14 fade-up">
          <span className="tme-section-label">Tools & Resources</span>
          <h2
            className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.20 0.025 152)" }}
          >
            Estimating Tools
            <br />
            <span style={{ color: "oklch(0.28 0.09 152)" }}>Built for Contractors</span>
          </h2>
          <p className="mt-4 text-lg" style={{ color: "oklch(0.45 0.02 152)" }}>
            We're building a suite of tools to help restoration contractors streamline
            their estimating process. These resources will be available to clients and
            visitors — check back soon.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {upcomingTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.title}
                className="fade-up rounded-xl p-6 flex flex-col gap-4 cursor-pointer group transition-all duration-200 hover:-translate-y-1"
                style={{
                  background: "oklch(0.97 0.015 152)",
                  border: "1px solid oklch(0.88 0.04 152)",
                  boxShadow: "0 2px 8px oklch(0.20 0.025 152 / 0.05)",
                }}
                onClick={() => toast.info("This tool is coming soon!", {
                  description: `${tool.title} will be available in a future update.`,
                })}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center"
                    style={{ background: "oklch(0.28 0.09 152)" }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span
                    className="text-xs font-bold px-2 py-1 rounded-full"
                    style={{
                      background: "oklch(0.68 0.14 65)",
                      color: "white",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {tool.badge}
                  </span>
                </div>
                <div>
                  <h3
                    className="text-base font-bold mb-2"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.20 0.025 152)" }}
                  >
                    {tool.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "oklch(0.50 0.02 152)" }}>
                    {tool.description}
                  </p>
                </div>
                <div
                  className="text-xs font-semibold mt-auto pt-2 border-t"
                  style={{ borderColor: "oklch(0.85 0.04 152)", color: "oklch(0.42 0.11 152)" }}
                >
                  Click to get notified →
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA to contact */}
        <div className="fade-up mt-12 text-center">
          <p className="text-base mb-4" style={{ color: "oklch(0.45 0.02 152)" }}>
            Need a custom quote now? Don't wait for the calculator.
          </p>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-7 py-3 rounded-md text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            style={{
              background: "oklch(0.28 0.09 152)",
              boxShadow: "0 4px 16px oklch(0.28 0.09 152 / 0.3)",
            }}
          >
            Contact Us for a Custom Quote
          </button>
        </div>
      </div>
    </section>
  );
}
