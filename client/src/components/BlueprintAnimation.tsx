/**
 * BlueprintAnimation
 * Subtle SVG watermark animation for the hero section background.
 * Settings: opacity 40%, density ~15 simultaneous elements, speed 3 (1400ms spawn interval)
 * Architectural line elements draw in via stroke-dashoffset, hold, then fade out.
 */

import { useEffect, useRef } from "react";

const NS = "http://www.w3.org/2000/svg";
const COLOR = "#1a4a2e";
const OPACITY = 0.40;
const MAX_ACTIVE = 15;
const SPAWN_INTERVAL = 1400; // ms

function setAttrs(el: Element, attrs: Record<string, string | number>) {
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
}

function addLine(
  p: SVGGElement,
  x1: number, y1: number, x2: number, y2: number,
  sw = 1.2,
  dash?: string
): SVGLineElement {
  const el = document.createElementNS(NS, "line") as SVGLineElement;
  setAttrs(el, { x1, y1, x2, y2, stroke: COLOR, "stroke-width": sw, "stroke-linecap": "round" });
  if (dash) el.setAttribute("stroke-dasharray", dash);
  p.appendChild(el);
  return el;
}

function addPolyline(p: SVGGElement, points: string, sw = 1): SVGPolylineElement {
  const el = document.createElementNS(NS, "polyline") as SVGPolylineElement;
  setAttrs(el, { points, stroke: COLOR, "stroke-width": sw, fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" });
  p.appendChild(el);
  return el;
}

function addRect(p: SVGGElement, x: number, y: number, w: number, h: number, sw = 0.9): SVGRectElement {
  const el = document.createElementNS(NS, "rect") as SVGRectElement;
  setAttrs(el, { x, y, width: w, height: h, stroke: COLOR, "stroke-width": sw, fill: "none" });
  p.appendChild(el);
  return el;
}

function addCircle(p: SVGGElement, cx: number, cy: number, r: number): SVGCircleElement {
  const el = document.createElementNS(NS, "circle") as SVGCircleElement;
  setAttrs(el, { cx, cy, r, stroke: COLOR, "stroke-width": 0.9, fill: "none" });
  p.appendChild(el);
  return el;
}

function addText(
  p: SVGGElement,
  x: number, y: number,
  text: string,
  size: number,
  rotate = 0,
  weight = 400
): SVGTextElement {
  const el = document.createElementNS(NS, "text") as SVGTextElement;
  setAttrs(el, {
    x, y,
    "font-size": size,
    "font-family": "JetBrains Mono, monospace",
    "font-weight": weight,
    fill: COLOR,
    "text-anchor": "middle",
    "dominant-baseline": "middle",
  });
  if (rotate) el.setAttribute("transform", `rotate(${rotate},${x},${y})`);
  el.textContent = text;
  p.appendChild(el);
  return el;
}

function getLen(el: SVGElement): number {
  const tag = el.tagName.toLowerCase();
  if (tag === "line") {
    const dx = Number(el.getAttribute("x2")) - Number(el.getAttribute("x1"));
    const dy = Number(el.getAttribute("y2")) - Number(el.getAttribute("y1"));
    return Math.sqrt(dx * dx + dy * dy) || 1;
  }
  if (tag === "rect") return 2 * (Number(el.getAttribute("width")) + Number(el.getAttribute("height")));
  if (tag === "circle") return 2 * Math.PI * Number(el.getAttribute("r"));
  if (tag === "polyline") {
    const pts = (el.getAttribute("points") || "").trim().split(/\s+/).map(p => p.split(",").map(Number));
    let l = 0;
    for (let i = 1; i < pts.length; i++) {
      const dx = pts[i][0] - pts[i - 1][0];
      const dy = pts[i][1] - pts[i - 1][1];
      l += Math.sqrt(dx * dx + dy * dy);
    }
    return l || 1;
  }
  return 80;
}

type TemplateFn = (svg: SVGSVGElement, x: number, y: number, s: number) => SVGGElement;

const templates: TemplateFn[] = [
  // Horizontal wall + dimension
  (svg, x, y, s) => {
    const len = (90 + Math.random() * 130) * s;
    const g = document.createElementNS(NS, "g") as SVGGElement;
    svg.appendChild(g);
    addLine(g, x, y, x + len, y, 1.6);
    addLine(g, x, y - 7 * s, x, y + 7 * s, 1);
    addLine(g, x + len, y - 7 * s, x + len, y + 7 * s, 1);
    const ft = Math.round(len / s / 10);
    const inch = Math.floor(Math.random() * 11);
    addText(g, x + len / 2, y - 12 * s, `${ft}'-${inch}"`, 10 * s);
    return g;
  },
  // Vertical wall + dimension
  (svg, x, y, s) => {
    const len = (70 + Math.random() * 110) * s;
    const g = document.createElementNS(NS, "g") as SVGGElement;
    svg.appendChild(g);
    addLine(g, x, y, x, y + len, 1.6);
    addLine(g, x - 7 * s, y, x + 7 * s, y, 1);
    addLine(g, x - 7 * s, y + len, x + 7 * s, y + len, 1);
    const ft = Math.round(len / s / 10);
    addText(g, x + 16 * s, y + len / 2, `${ft}'-0"`, 10 * s, -90);
    return g;
  },
  // Room corner (L-shape)
  (svg, x, y, s) => {
    const w = (55 + Math.random() * 90) * s;
    const h = (45 + Math.random() * 80) * s;
    const g = document.createElementNS(NS, "g") as SVGGElement;
    svg.appendChild(g);
    addLine(g, x, y + h, x, y, 1.6);
    addLine(g, x, y, x + w, y, 1.6);
    addRect(g, x, y, 5 * s, 5 * s);
    return g;
  },
  // Roof pitch triangle
  (svg, x, y, s) => {
    const g = document.createElementNS(NS, "g") as SVGGElement;
    svg.appendChild(g);
    const pitch = [4, 5, 6, 7, 8][Math.floor(Math.random() * 5)];
    const w = 65 * s, h = 38 * s;
    addPolyline(g, `${x},${y + h} ${x + w / 2},${y} ${x + w},${y + h}`, 1.4);
    addText(g, x + w / 2, y - 9 * s, `${pitch}/12 pitch`, 9 * s);
    addLine(g, x - 8 * s, y + h, x + w + 8 * s, y + h, 1);
    return g;
  },
  // Unit label
  (svg, x, y, s) => {
    const g = document.createElementNS(NS, "g") as SVGGElement;
    svg.appendChild(g);
    const unit = ["SF", "LF", "EA", "SY", "CY"][Math.floor(Math.random() * 5)];
    addText(g, x, y, unit, 15 * s, 0, 600);
    addLine(g, x - 3 * s, y + 5 * s, x + 20 * s, y + 5 * s, 0.8);
    return g;
  },
  // Dimension arrow
  (svg, x, y, s) => {
    const g = document.createElementNS(NS, "g") as SVGGElement;
    svg.appendChild(g);
    const len = (110 + Math.random() * 160) * s;
    addLine(g, x, y, x + len, y, 1);
    addPolyline(g, `${x + 9 * s},${y - 5 * s} ${x},${y} ${x + 9 * s},${y + 5 * s}`);
    addPolyline(g, `${x + len - 9 * s},${y - 5 * s} ${x + len},${y} ${x + len - 9 * s},${y + 5 * s}`);
    const val = (Math.random() * 18 + 4).toFixed(1);
    addText(g, x + len / 2, y - 9 * s, `${val}'`, 9 * s);
    return g;
  },
  // Cross-hair
  (svg, x, y, s) => {
    const g = document.createElementNS(NS, "g") as SVGGElement;
    svg.appendChild(g);
    const r = 14 * s;
    addLine(g, x - r, y, x + r, y, 1);
    addLine(g, x, y - r, x, y + r, 1);
    addCircle(g, x, y, 3.5 * s);
    return g;
  },
  // Dashed hidden line
  (svg, x, y, s) => {
    const g = document.createElementNS(NS, "g") as SVGGElement;
    svg.appendChild(g);
    const len = (70 + Math.random() * 130) * s;
    const horiz = Math.random() < 0.5;
    addLine(g, x, y, horiz ? x + len : x, horiz ? y : y + len, 1, "7,4");
    return g;
  },
  // Wall thickness callout
  (svg, x, y, s) => {
    const g = document.createElementNS(NS, "g") as SVGGElement;
    svg.appendChild(g);
    const t = [3.5, 5.5, 6, 7][Math.floor(Math.random() * 4)];
    addLine(g, x, y, x + 45 * s, y, 1.6);
    addLine(g, x, y + t * s * 2, x + 45 * s, y + t * s * 2, 1.6);
    addLine(g, x + 22 * s, y, x + 22 * s, y + t * s * 2, 0.8);
    addText(g, x + 52 * s, y + t * s, `${t}"`, 9 * s);
    return g;
  },
  // Stud spacing
  (svg, x, y, s) => {
    const g = document.createElementNS(NS, "g") as SVGGElement;
    svg.appendChild(g);
    const spacing = [16, 24][Math.floor(Math.random() * 2)];
    addLine(g, x, y, x + 60 * s, y, 1.4);
    for (let i = 0; i <= 3; i++) {
      addLine(g, x + i * (spacing * s * 0.6), y - 5 * s, x + i * (spacing * s * 0.6), y + 5 * s, 0.8);
    }
    addText(g, x + 30 * s, y - 14 * s, `${spacing}" O.C.`, 9 * s);
    return g;
  },
  // Room label box
  (svg, x, y, s) => {
    const g = document.createElementNS(NS, "g") as SVGGElement;
    svg.appendChild(g);
    const rooms = ["LIVING RM", "KITCHEN", "BEDROOM", "BATH", "HALLWAY", "GARAGE"];
    const room = rooms[Math.floor(Math.random() * rooms.length)];
    const w = room.length * 5.5 * s, h = 14 * s;
    addRect(g, x - w / 2, y - h / 2, w, h, 0.7);
    addText(g, x, y, room, 8 * s, 0, 500);
    return g;
  },
];

function animateGroup(group: SVGGElement, instant: boolean, onDone: () => void) {
  const lines = Array.from(group.querySelectorAll("line,polyline,rect,circle")) as SVGElement[];
  const texts = Array.from(group.querySelectorAll("text")) as SVGElement[];

  texts.forEach(t => {
    (t as unknown as HTMLElement).style.opacity = "0";
    (t as unknown as HTMLElement).style.transition = "none";
  });

  const drawDur = instant ? 0 : 2000;
  let delay = 0;

  lines.forEach(el => {
    const len = getLen(el);
    (el as unknown as HTMLElement).style.strokeDasharray = String(len);
    (el as unknown as HTMLElement).style.strokeDashoffset = instant ? "0" : String(len);
    (el as unknown as HTMLElement).style.transition = "none";
    if (!instant) {
      const dur = Math.max(250, (drawDur / Math.max(lines.length, 1)) * (0.6 + Math.random() * 0.8));
      setTimeout(() => {
        (el as unknown as HTMLElement).style.transition = `stroke-dashoffset ${dur}ms cubic-bezier(0.4,0,0.2,1)`;
        (el as unknown as HTMLElement).style.strokeDashoffset = "0";
      }, delay);
      delay += dur * 0.55;
    }
  });

  const fadeInDelay = instant ? 0 : 80;
  setTimeout(() => {
    group.style.transition = instant ? "none" : "opacity 350ms ease";
    group.style.opacity = String(OPACITY);
  }, fadeInDelay);

  const textDelay = instant ? 0 : delay + 180;
  texts.forEach((t, i) => {
    setTimeout(() => {
      (t as unknown as HTMLElement).style.transition = "opacity 500ms ease";
      (t as unknown as HTMLElement).style.opacity = "1";
    }, textDelay + i * 120);
  });

  const holdDur = 5500 + Math.random() * 3000;
  const totalDur = (instant ? 0 : textDelay + texts.length * 120) + holdDur;
  setTimeout(() => {
    group.style.transition = "opacity 1800ms ease";
    group.style.opacity = "0";
    setTimeout(() => {
      group.remove();
      onDone();
    }, 1800);
  }, totalDur);
}

export default function BlueprintAnimation() {
  const svgRef = useRef<SVGSVGElement>(null);
  const activeCountRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    function resize() {
      if (!svg) return;
      svg.setAttribute("width", String(window.innerWidth));
      svg.setAttribute("height", String(window.innerHeight));
    }
    resize();
    window.addEventListener("resize", resize);

    function spawnElement(instant = false) {
      if (!svg) return;
      if (activeCountRef.current >= MAX_ACTIVE) return;
      const W = window.innerWidth;
      const H = window.innerHeight;
      // Bias toward left 65% of screen (headline side)
      const x = Math.random() < 0.65 ? Math.random() * W * 0.65 : Math.random() * W;
      const y = 80 + Math.random() * (H - 140);
      const s = 0.65 + Math.random() * 0.65;
      const tmpl = templates[Math.floor(Math.random() * templates.length)];
      const group = tmpl(svg, x, y, s);
      group.style.opacity = "0";
      activeCountRef.current++;
      animateGroup(group, instant, () => { activeCountRef.current--; });
    }

    // Pre-populate immediately
    const preCount = Math.round(MAX_ACTIVE * 0.75);
    for (let i = 0; i < preCount; i++) {
      setTimeout(() => spawnElement(true), i * 60);
    }

    // Continuous spawn loop
    timerRef.current = setInterval(() => spawnElement(false), SPAWN_INTERVAL);

    return () => {
      window.removeEventListener("resize", resize);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
