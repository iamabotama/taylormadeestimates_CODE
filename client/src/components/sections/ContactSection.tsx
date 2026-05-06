/* =============================================================
   CONTACT SECTION — Taylor Made Estimates
   Quote request form + contact info
   ============================================================= */

import { useEffect, useRef, useState } from "react";
import { Mail, Phone, Clock, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const lossTypeOptions = [
  "Water Mitigation",
  "Fire & Smoke Damage",
  "Mold Remediation",
  "Reconstruction / Rebuild",
  "Supplement Writing",
  "Scope / Claim Review",
  "Other",
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    lossType: "",
    message: "",
    rush: false,
  });
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Please fill in your name and email.");
      return;
    }
    const { error } = await supabase.from("contact_submissions").insert({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      service: formData.lossType || null,
      message: (formData.company ? `Company: ${formData.company}\n` : "") + (formData.message || ""),
    });
    if (error) {
      toast.error("Something went wrong. Please try again or call us directly.");
      console.error(error);
      return;
    }
    setSubmitted(true);
    toast.success("Request submitted!", {
      description: "We'll be in touch within 24 hours.",
    });
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "6px",
    border: "1px solid oklch(0.85 0.03 152)",
    background: "white",
    color: "oklch(0.20 0.025 152)",
    fontSize: "0.9rem",
            fontFamily: "'Outfit', sans-serif",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 lg:py-28"
      style={{ background: "oklch(0.97 0.015 152)" }}
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* Left: Info */}
          <div>
            <div className="fade-up">
              <span className="tme-section-label">Get in Touch</span>
              <h2
                className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold"
                style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.20 0.025 152)" }}
              >
                Ready to Clear
                <br />
                <span style={{ color: "oklch(0.28 0.09 152)" }}>Your Backlog?</span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed" style={{ color: "oklch(0.45 0.02 152)" }}>
                Contact Taylor Made Estimates to discuss your estimating needs and receive
                a custom quote. No contracts required — use us as needed.
              </p>
            </div>

            <div className="fade-up mt-8 space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white" style={{ border: "1px solid oklch(0.88 0.03 152)" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "oklch(0.94 0.03 152)" }}>
                  <Mail className="w-5 h-5" style={{ color: "oklch(0.28 0.09 152)" }} />
                </div>
                <div>
                  <div className="text-xs font-semibold" style={{ color: "oklch(0.55 0.02 152)" }}>Email</div>
                  <a href="mailto:melissa@taylormadeestimates.com" className="text-sm font-semibold" style={{ color: "oklch(0.28 0.09 152)" }}>
                    melissa@taylormadeestimates.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white" style={{ border: "1px solid oklch(0.88 0.03 152)" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "oklch(0.94 0.03 152)" }}>
                  <Phone className="w-5 h-5" style={{ color: "oklch(0.28 0.09 152)" }} />
                </div>
                <div>
                  <div className="text-xs font-semibold" style={{ color: "oklch(0.55 0.02 152)" }}>Phone</div>
                  <a href="tel:+16199554588" className="text-sm font-semibold" style={{ color: "oklch(0.28 0.09 152)", fontFamily: "'JetBrains Mono', monospace" }}>
                    (619) 955-4588
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white" style={{ border: "1px solid oklch(0.88 0.03 152)" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "oklch(0.94 0.03 152)" }}>
                  <Clock className="w-5 h-5" style={{ color: "oklch(0.28 0.09 152)" }} />
                </div>
                <div>
                  <div className="text-xs font-semibold" style={{ color: "oklch(0.55 0.02 152)" }}>Turnaround</div>
                  <div className="text-sm font-semibold" style={{ color: "oklch(0.28 0.09 152)" }}>
                    24–48 hours standard · Same-day rush available
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing note */}
            <div
              className="fade-up mt-6 rounded-xl p-5"
              style={{ background: "oklch(0.28 0.09 152)" }}
            >
              <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Competitive, Transparent Pricing
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Pricing is customized based on claim size, complexity, and turnaround requirements.
                No monthly or annual contracts required. Competitive price matching available.
                High-volume and long-term partnership agreements negotiable.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="fade-up">
            <div
              className="rounded-2xl p-7 lg:p-9"
              style={{
                background: "white",
                boxShadow: "0 8px 40px oklch(0.20 0.025 152 / 0.10)",
                border: "1px solid oklch(0.88 0.03 152)",
              }}
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <CheckCircle2 className="w-16 h-16" style={{ color: "oklch(0.42 0.11 152)" }} />
                  <h3
                    className="text-2xl font-bold"
                    style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.20 0.025 152)" }}
                  >
                    Request Received!
                  </h3>
                  <p style={{ color: "oklch(0.45 0.02 152)" }}>
                    Thank you for reaching out. We'll review your request and be in touch within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-sm font-semibold underline"
                    style={{ color: "oklch(0.42 0.11 152)" }}
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.20 0.025 152)" }}
                  >
                    Request a Quote
                  </h3>
                  <p className="text-sm mb-2" style={{ color: "oklch(0.50 0.02 152)" }}>
                    Tell us about your estimating needs and we'll get back to you with a custom quote.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "oklch(0.35 0.04 152)" }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Your Name"
                        style={inputStyle}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={(e) => (e.target.style.borderColor = "oklch(0.42 0.11 152)")}
                        onBlur={(e) => (e.target.style.borderColor = "oklch(0.85 0.03 152)")}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "oklch(0.35 0.04 152)" }}>
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="ABC Restoration"
                        style={inputStyle}
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        onFocus={(e) => (e.target.style.borderColor = "oklch(0.42 0.11 152)")}
                        onBlur={(e) => (e.target.style.borderColor = "oklch(0.85 0.03 152)")}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "oklch(0.35 0.04 152)" }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="you@company.com"
                        style={inputStyle}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={(e) => (e.target.style.borderColor = "oklch(0.42 0.11 152)")}
                        onBlur={(e) => (e.target.style.borderColor = "oklch(0.85 0.03 152)")}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "oklch(0.35 0.04 152)" }}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="(555) 000-0000"
                        style={inputStyle}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        onFocus={(e) => (e.target.style.borderColor = "oklch(0.42 0.11 152)")}
                        onBlur={(e) => (e.target.style.borderColor = "oklch(0.85 0.03 152)")}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "oklch(0.35 0.04 152)" }}>
                      Type of Service Needed
                    </label>
                    <select
                      style={inputStyle}
                      value={formData.lossType}
                      onChange={(e) => setFormData({ ...formData, lossType: e.target.value })}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.42 0.11 152)")}
                      onBlur={(e) => (e.target.style.borderColor = "oklch(0.85 0.03 152)")}
                    >
                      <option value="">Select service type...</option>
                      {lossTypeOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "oklch(0.35 0.04 152)" }}>
                      Tell Us About Your Needs
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Describe your claim volume, typical job sizes, turnaround requirements, or any specific needs..."
                      style={{ ...inputStyle, resize: "vertical" }}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.42 0.11 152)")}
                      onBlur={(e) => (e.target.style.borderColor = "oklch(0.85 0.03 152)")}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="rush"
                      checked={formData.rush}
                      onChange={(e) => setFormData({ ...formData, rush: e.target.checked })}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: "oklch(0.28 0.09 152)" }}
                    />
                    <label htmlFor="rush" className="text-sm" style={{ color: "oklch(0.45 0.02 152)" }}>
                      I need same-day rush service
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-md text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 mt-2"
                    style={{
                      background: "oklch(0.28 0.09 152)",
                      boxShadow: "0 4px 16px oklch(0.28 0.09 152 / 0.35)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "oklch(0.22 0.07 152)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "oklch(0.28 0.09 152)")}
                  >
                    <Send className="w-4 h-4" />
                    Submit Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
