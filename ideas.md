# Taylor Made Estimates — Design Brainstorm

## Selected Direction: "Field to File" — Grounded Authority

**Design Movement:** Modern Professional Services meets Construction Industry Precision  
**Chosen because:** The client base (restoration contractors, insurance carriers) is field-oriented and values credibility, speed, and technical accuracy. The green palette from the logo is already established and signals expertise in the restoration/construction space.

---

## Core Principles
1. **Credibility First** — Every visual decision reinforces trust: certifications, experience, and turnaround speed are front-and-center.
2. **Grounded Modernity** — The design feels rooted in the construction/restoration world but executed with modern, clean precision. Not corporate-generic, not trendy-startup.
3. **Clarity at a Glance** — A restoration contractor visiting this site should understand within 3 seconds what TME does, who it's for, and how to get started.
4. **Purposeful Density** — Content is rich but never cluttered. Whitespace is used to breathe, not to hide.

---

## Color Philosophy
- **Primary Green:** `#1A3D2B` (deep forest green — from logo) — Authority, expertise, construction
- **Mid Green:** `#2D6A4F` — Hover states, section accents
- **Light Green:** `#52B788` — Highlights, active states, stat callouts
- **Off-White:** `#F7F8F4` — Warm background, not clinical white
- **Steel Gray:** `#4A5568` — Body text, secondary info
- **Charcoal:** `#1C2B20` — Headlines, deep contrast
- **White:** `#FFFFFF` — Cards, clean surfaces
- **Amber Accent:** `#D4860A` — Sparingly for CTAs and key highlights

---

## Typography System
- **Display/Headlines:** `Playfair Display` — Authoritative, premium, slightly editorial. Used for H1/H2.
- **Body/UI:** `DM Sans` — Clean, modern, highly readable. Used for body, nav, labels.
- **Mono/Stats:** `JetBrains Mono` — For numbers, stats, certifications. Technical precision signal.
- Hierarchy: Display 56–72px → H2 36–48px → H3 24px → Body 16–18px → Caption 13–14px

---

## Layout Paradigm
- Sticky top navigation with smooth scroll to anchor sections
- Asymmetric hero: large left-aligned headline with right-side visual
- Full-width trust/certification bar between hero and services
- Alternating left/right content blocks for services detail
- Horizontal numbered process timeline
- Card-based services grid with top accent bars
- Full-width green CTA band before footer

---

## Signature Elements
1. **Green top-accent cards** — Service cards with a 4px forest green top border, white background, subtle shadow
2. **Stat callout chips** — Monospace numbers in green-tinted chips (24–48 Hr, Level 3, 5 IICRC)
3. **Section dividers** — Subtle diagonal or angled cuts between sections using the off-white/green contrast

---

## Interaction Philosophy
- Smooth scroll navigation
- Cards lift slightly on hover (translateY + shadow increase)
- Nav link underline slides in on hover
- CTA buttons have subtle scale + shadow on hover
- Entrance animations: fade-up on scroll for section content

---

## Animation Guidelines
- Hero: fade-in + slight upward drift on load (0.3s delay stagger)
- Section content: IntersectionObserver-triggered fade-up (60px → 0, 0.5s ease)
- Cards: hover translateY(-4px) + box-shadow increase
- Nav: sticky with backdrop-blur on scroll
- No excessive motion — professional restraint

---

## Page Sections (Scroll Architecture)
1. **Hero** — Headline, subheadline, trust chips, dual CTA
2. **Trust Bar** — Xactimate + IICRC certification badges
3. **Services** — 6-card grid with type-of-loss callouts
4. **Why Taylor Made** — 3-column value props
5. **How It Works** — 5-step numbered process
6. **About** — Team background, experience, woman-owned note
7. **Testimonials** — Placeholder with quote styling
8. **Tools** — Placeholder section for future calculators
9. **Contact / Get a Quote** — Simple contact form + info
10. **Footer** — Logo, nav links, certifications, copyright
