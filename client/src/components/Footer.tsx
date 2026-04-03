/* =============================================================
   FOOTER — Taylor Made Estimates
   Deep forest green footer with logo, nav, certs, copyright
   ============================================================= */

// Inverted logo for dark footer background: light house shape, green TME letterforms
const TmeLogo = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 364.73 324.34" aria-hidden="true">
    <rect fill="#f8f8f8" x="279.55" y="181.69" width="45.02" height="23.39"/>
    <g>
      <rect fill="#f8f8f8" x="9.38" y="129.97" width="341.3" height="181.18" rx="3.37" ry="3.37"/>
      <path fill="#f8f8f8" d="M182.19,13.07l166.76,116.11c3.07,2.14,1.56,6.97-2.19,6.97H13.24c-3.75,0-5.26-4.83-2.19-6.97L177.81,13.07c1.31-.91,3.06-.91,4.37,0Z"/>
    </g>
    <g>
      <rect fill="#22563f" x="40.07" y="142.19" width="284.5" height="33.64"/>
      <rect fill="#22563f" x="75.11" y="175.82" width="30.13" height="114.31"/>
      <rect fill="#22563f" x="117.68" y="181.87" width="24.44" height="108.26"/>
      <rect fill="#22563f" x="217.23" y="181.87" width="24.44" height="108.26"/>
      <rect fill="#22563f" x="253.23" y="181.87" width="26.32" height="108.26"/>
      <rect fill="#22563f" x="279.55" y="224.31" width="37.05" height="23.39"/>
      <polygon fill="#22563f" points="150.79 181.87 180.22 250.45 209.65 181.87 217.53 181.87 217.01 223.12 189.68 281.99 169.18 281.99 142.12 223.12 142.12 181.87 150.79 181.87"/>
      <rect fill="#22563f" x="279.55" y="181.87" width="45.02" height="23.39"/>
      <rect fill="#22563f" x="279.55" y="266.74" width="45.02" height="23.39"/>
    </g>
    <g>
      <rect fill="#f8f8f8" x="261.99" y="140.31" width="4.4" height="18.7" rx="1.38" ry="1.38"/>
      <rect fill="#f8f8f8" x="275.15" y="140.31" width="4.4" height="18.7" rx="1.38" ry="1.38"/>
      <rect fill="#f8f8f8" x="288.31" y="140.31" width="4.4" height="18.7" rx="1.38" ry="1.38"/>
      <rect fill="#f8f8f8" x="301.47" y="140.31" width="4.4" height="18.7" rx="1.38" ry="1.38"/>
      <rect fill="#f8f8f8" x="314.63" y="140.31" width="3.99" height="26.54" rx="1.38" ry="1.38"/>
      <rect fill="#f8f8f8" x="78.62" y="220.2" width="4.4" height="18.7" rx="1.38" ry="1.38" transform="translate(310.38 148.73) rotate(90)"/>
      <rect fill="#f8f8f8" x="78.62" y="233.36" width="4.4" height="18.7" rx="1.38" ry="1.38" transform="translate(323.54 161.89) rotate(90)"/>
      <rect fill="#f8f8f8" x="78.62" y="246.52" width="4.4" height="18.7" rx="1.38" ry="1.38" transform="translate(336.7 175.05) rotate(90)"/>
      <rect fill="#f8f8f8" x="78.62" y="259.68" width="4.4" height="18.7" rx="1.38" ry="1.38" transform="translate(349.86 188.21) rotate(90)"/>
      <rect fill="#f8f8f8" x="82.72" y="268.75" width="4.05" height="26.54" rx="1.38" ry="1.38" transform="translate(366.76 197.27) rotate(90)"/>
    </g>
  </svg>
);

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const certifications = [
  "Xactimate Level 3 Certified",
  "IICRC — WRT (Water Damage Restoration)",
  "IICRC — ASD (Applied Structural Drying)",
  "IICRC — OCT (Odor Control)",
  "IICRC — FSRT (Fire & Smoke Restoration)",
  "IICRC — CCT (Carpet Cleaning)",
];

const scrollTo = (href: string) => {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Footer() {
  return (
    <footer
      style={{
        background: "oklch(0.18 0.07 152)",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* Main footer content */}
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <TmeLogo className="h-12 w-auto flex-shrink-0" />
              <div className="flex flex-col leading-tight">
                <span
                  className="font-bold text-white"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.05rem", letterSpacing: "-0.02em" }}
                >
                  Taylor Made
                </span>
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.8rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase" as const,
                    color: "oklch(0.62 0.11 152)",
                  }}
                >
                  Estimates
                </span>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed mb-5 max-w-sm"
              style={{ color: "oklch(0.62 0.11 152)" }}
            >
              Professional Xactimate estimating services for restoration contractors
              and insurance carriers. Accurate, certified, and delivered in 24–48 hours.
            </p>
            <div className="mt-5 flex flex-col gap-1 text-sm">
              <a href="mailto:melissa@taylormadeestimates.com" className="hover:text-white transition-colors" style={{ color: "oklch(0.62 0.11 152)" }}>
                melissa@taylormadeestimates.com
              </a>
              <a href="tel:+16199554588" className="hover:text-white transition-colors" style={{ color: "oklch(0.62 0.11 152)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem" }}>
                (619) 955-4588
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-xs font-semibold mb-4 uppercase tracking-widest"
              style={{ color: "oklch(0.48 0.09 152)" }}
            >
              Navigation
            </h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: "oklch(0.62 0.11 152)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h4
              className="text-xs font-semibold mb-4 uppercase tracking-widest"
              style={{ color: "oklch(0.48 0.09 152)" }}
            >
              Certifications
            </h4>
            <ul className="flex flex-col gap-2">
              {certifications.map((cert) => (
                <li
                  key={cert}
                  className="text-xs leading-snug"
                  style={{ color: "oklch(0.55 0.08 152)" }}
                >
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: "oklch(0.25 0.06 152)" }}
      >
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-xs"
            style={{ color: "oklch(0.42 0.07 152)" }}
          >
            © {new Date().getFullYear()} Taylor Made Estimates. All rights reserved.
          </p>
          <p
            className="text-xs"
            style={{ color: "oklch(0.38 0.06 152)" }}
          >
            Professional Xactimate Estimating Services
          </p>
        </div>
      </div>
    </footer>
  );
}
