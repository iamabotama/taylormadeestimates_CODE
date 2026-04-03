/* =============================================================
   TESTIMONIALS SECTION — Taylor Made Estimates
   Placeholder testimonials with professional styling
   ============================================================= */

import { useEffect, useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Taylor Made Estimates has become an essential part of our operation. Their turnaround is fast, the scopes are thorough, and they understand how carriers think. We've seen our supplement approval rate improve significantly.",
    author: "Restoration Contractor",
    role: "Mid-Size Restoration Company",
    initials: "RC",
  },
  {
    quote:
      "We were drowning in backlog during a surge period. Taylor Made stepped in and handled our overflow estimating seamlessly. The estimates came back clean, carrier-ready, and on time. Exactly what we needed.",
    author: "Operations Manager",
    role: "Regional Restoration Firm",
    initials: "OM",
  },
  {
    quote:
      "The level of detail in their Xactimate estimates is exceptional. Line items are well-supported, sketches are accurate, and the documentation holds up under carrier review. These are professional estimates.",
    author: "Project Manager",
    role: "Reconstruction & Mitigation Company",
    initials: "PM",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-up").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
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
      id="testimonials"
      ref={sectionRef}
      className="py-20 lg:py-28"
      style={{ background: "oklch(0.22 0.07 152)" }}
    >
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14 fade-up">
          <span
            className="tme-section-label"
            style={{ color: "oklch(0.62 0.11 152)" }}
          >
            Client Feedback
          </span>
          <h2
            className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            What Contractors
            <br />
            <span style={{ color: "oklch(0.62 0.11 152)" }}>Are Saying</span>
          </h2>
          <p className="mt-4 text-base text-white/70">
            Testimonials and references from restoration contractors and insurance professionals
            who have worked directly with the Taylor Made team.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="fade-up rounded-xl p-7 flex flex-col gap-5"
              style={{
                background: "oklch(0.28 0.09 152)",
                border: "1px solid oklch(0.34 0.10 152)",
              }}
            >
              <Quote className="w-8 h-8" style={{ color: "oklch(0.52 0.12 152)" }} />
              <p className="text-base leading-relaxed text-white/90 flex-1 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: "oklch(0.42 0.11 152)", color: "white" }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.author}</div>
                  <div className="text-xs text-white/60">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="fade-up text-center text-sm text-white/50 mt-8 italic">
          * Testimonials are representative of client feedback. References available upon request.
        </p>
      </div>
    </section>
  );
}
