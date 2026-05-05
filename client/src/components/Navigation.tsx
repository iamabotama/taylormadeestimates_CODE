/* =============================================================
   NAVIGATION — Taylor Made Estimates
   Sticky top nav with smooth scroll links, mobile hamburger menu
   Theme: Deep Forest Green + Off-White
   Font: Outfit (nav labels + company name) + JetBrains Mono (phone)
   Logo: SVG icon mark + live "Taylor Made Estimates" text
   ============================================================= */

import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";

// Inline SVG to ensure CSS classes render correctly in all browsers
const TmeLogo = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 364.73 324.34" aria-hidden="true">
    <rect fill="#f8f8f8" x="279.55" y="181.69" width="45.02" height="23.39"/>
    <g>
      <g>
        <rect fill="#22563f" x="9.38" y="129.97" width="341.3" height="181.18" rx="3.37" ry="3.37"/>
        <path fill="#22563f" d="M182.19,13.07l166.76,116.11c3.07,2.14,1.56,6.97-2.19,6.97H13.24c-3.75,0-5.26-4.83-2.19-6.97L177.81,13.07c1.31-.91,3.06-.91,4.37,0Z"/>
      </g>
      <g>
        <rect fill="#f8f8f8" x="40.07" y="142.19" width="284.5" height="33.64"/>
        <rect fill="#f8f8f8" x="75.11" y="175.82" width="30.13" height="114.31"/>
        <rect fill="#f8f8f8" x="117.68" y="181.87" width="24.44" height="108.26"/>
        <rect fill="#f8f8f8" x="217.23" y="181.87" width="24.44" height="108.26"/>
        <rect fill="#f8f8f8" x="253.23" y="181.87" width="26.32" height="108.26"/>
        <rect fill="#f8f8f8" x="279.55" y="224.31" width="37.05" height="23.39"/>
        <polygon fill="#f8f8f8" points="150.79 181.87 180.22 250.45 209.65 181.87 217.53 181.87 217.01 223.12 189.68 281.99 169.18 281.99 142.12 223.12 142.12 181.87 150.79 181.87"/>
        <rect fill="#f8f8f8" x="279.55" y="181.87" width="45.02" height="23.39"/>
        <rect fill="#f8f8f8" x="279.55" y="266.74" width="45.02" height="23.39"/>
      </g>
    </g>
    <g>
      <g>
        <rect fill="#22563f" x="261.99" y="140.31" width="4.4" height="18.7" rx="1.38" ry="1.38"/>
        <rect fill="#22563f" x="275.15" y="140.31" width="4.4" height="18.7" rx="1.38" ry="1.38"/>
        <rect fill="#22563f" x="288.31" y="140.31" width="4.4" height="18.7" rx="1.38" ry="1.38"/>
        <rect fill="#22563f" x="301.47" y="140.31" width="4.4" height="18.7" rx="1.38" ry="1.38"/>
        <rect fill="#22563f" x="314.63" y="140.31" width="3.99" height="26.54" rx="1.38" ry="1.38"/>
      </g>
      <rect fill="#22563f" x="71.47" y="227.35" width="18.7" height="4.4" rx="1.38" ry="1.38"/>
      <rect fill="#22563f" x="71.47" y="240.51" width="18.7" height="4.4" rx="1.38" ry="1.38"/>
      <rect fill="#22563f" x="71.47" y="253.67" width="18.7" height="4.4" rx="1.38" ry="1.38"/>
      <rect fill="#22563f" x="71.47" y="266.83" width="18.7" height="4.4" rx="1.38" ry="1.38"/>
      <rect fill="#22563f" x="71.47" y="279.99" width="26.54" height="4.05" rx="1.38" ry="1.38"/>
    </g>
  </svg>
);

// Tools removed — section hidden for now
const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map(l => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-[oklch(0.88_0.02_152)]"
          : "bg-white border-b border-[oklch(0.92_0.02_152)]"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo: SVG icon + live company name */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
            className="flex items-center gap-3 flex-shrink-0 group"
            aria-label="Taylor Made Estimates — Home"
          >
            <TmeLogo className="h-10 lg:h-12 w-auto flex-shrink-0" />
            <div className="flex flex-col leading-tight">
              <span
                className="font-bold text-[oklch(0.22_0.07_152)] group-hover:text-[oklch(0.28_0.09_152)] transition-colors"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: "1.15",
                }}
              >
                Taylor Made
              </span>
              <span
                className="font-medium text-[oklch(0.42_0.11_152)] group-hover:text-[oklch(0.34_0.10_152)] transition-colors"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(0.75rem, 1.1vw, 0.9rem)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  lineHeight: "1.15",
                }}
              >
                Estimates
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md group
                    ${isActive
                      ? "text-[oklch(0.28_0.09_152)]"
                      : "text-[oklch(0.35_0.02_152)] hover:text-[oklch(0.28_0.09_152)]"
                    }`}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-0.5 bg-[oklch(0.28_0.09_152)] rounded-full transition-all duration-200
                      ${isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-100"}`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Standard tel: link — opens native dialer on mobile, Skype/FaceTime on desktop */}
            <a
              href="tel:+16199554588"
              className="flex items-center gap-2 text-sm font-medium text-[oklch(0.35_0.02_152)] hover:text-[oklch(0.28_0.09_152)] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem" }}>(619) 955-4588</span>
            </a>
            <a
              href="/login"
              className="px-4 py-2.5 border border-[oklch(0.28_0.09_152)] text-[oklch(0.28_0.09_152)] text-sm font-semibold rounded-md hover:bg-[oklch(0.94_0.03_152)] transition-all duration-200"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Client Portal
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
              className="px-5 py-2.5 bg-[oklch(0.28_0.09_152)] text-white text-sm font-semibold rounded-md hover:bg-[oklch(0.22_0.07_152)] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Get a Quote
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 rounded-md text-[oklch(0.28_0.09_152)] hover:bg-[oklch(0.94_0.03_152)] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-screen border-t border-[oklch(0.88_0.02_152)]" : "max-h-0"
        } bg-white`}
      >
        <div className="container py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className="px-4 py-3 text-sm font-medium text-[oklch(0.30_0.05_152)] hover:bg-[oklch(0.94_0.03_152)] hover:text-[oklch(0.22_0.07_152)] rounded-md transition-colors"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-[oklch(0.88_0.02_152)] mt-2 flex flex-col gap-2">
            {/* Mobile: prominent tel: call button */}
            <a
              href="tel:+16199554588"
              className="flex items-center justify-center gap-2 w-full px-5 py-3 border-2 border-[oklch(0.28_0.09_152)] text-[oklch(0.28_0.09_152)] text-sm font-semibold rounded-md hover:bg-[oklch(0.94_0.03_152)] transition-colors"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <Phone className="w-4 h-4" />
              Call Us
            </a>
            <a
              href="/login"
              className="block w-full text-center px-5 py-3 border border-[oklch(0.28_0.09_152)] text-[oklch(0.28_0.09_152)] text-sm font-semibold rounded-md hover:bg-[oklch(0.94_0.03_152)] transition-colors"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Client Portal
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
              className="block w-full text-center px-5 py-3 bg-[oklch(0.28_0.09_152)] text-white text-sm font-semibold rounded-md hover:bg-[oklch(0.22_0.07_152)] transition-colors"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Get a Quote
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
