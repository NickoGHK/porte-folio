"use client";

import { useEffect, useRef, useState } from "react";

type Point = { at: number; x: number; y: number };

function catmull(p0: Point, p1: Point, p2: Point, p3: Point, u: number) {
  const u2 = u * u;
  const u3 = u2 * u;
  return {
    x:
      0.5 *
      (2 * p1.x +
        (-p0.x + p2.x) * u +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * u2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * u3),
    y:
      0.5 *
      (2 * p1.y +
        (-p0.y + p2.y) * u +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * u2 +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * u3),
  };
}

const SECTION_IDS = ["accueil", "apropos", "escales", "contact"];

/**
 * Single rAF loop driving four imperative (non-React-state) effects, ported
 * from the design reference: scroll-driven parallax on [data-parallax]
 * layers, cursor-driven parallax on [data-mouse-parallax] layers (desktop
 * only — it's simply inert wherever mousemove never fires, e.g. touch), the
 * travel-rocket's Catmull-Rom flight path between the accueil and apropos
 * sections, and — the one piece that DOES feed back into React — which
 * section is centered in the viewport (for the dot nav).
 */
export function useScrollFX() {
  const [activeSection, setActiveSection] = useState("accueil");
  const activeSectionRef = useRef(activeSection);
  const heroAnchor = useRef<{ x: number; y: number } | null>(null);
  const lastRocketRot = useRef(0);
  const rafRef = useRef<number | null>(null);
  const parallaxCache = useRef(new WeakMap<Element, number>());
  const mouse = useRef({ x: 0, y: 0 });
  const mouseParallaxState = useRef(new WeakMap<Element, { x: number; y: number }>());

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    const tick = () => {
      const vh = window.innerHeight;

      let current = activeSectionRef.current;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= vh / 2 && r.bottom > vh / 2) {
          current = id;
          break;
        }
      }
      if (current !== activeSectionRef.current) {
        activeSectionRef.current = current;
        setActiveSection(current);
      }

      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const scene = el.closest("[data-scene]");
        if (!scene) return;
        const r = scene.getBoundingClientRect();
        const d = r.top + r.height / 2 - vh / 2;
        const s = parseFloat(el.getAttribute("data-parallax") || "0");
        const y = Math.round(d * s * 10) / 10;
        if (parallaxCache.current.get(el) !== y) {
          parallaxCache.current.set(el, y);
          el.style.transform = `translate3d(0, ${y}px, 0)`;
        }
      });

      // cursor-follow parallax — eased toward the target each frame rather
      // than snapping straight to it, so it reads as organic drift rather
      // than a rigid 1:1 tracking.
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      document.querySelectorAll<HTMLElement>("[data-mouse-parallax]").forEach((el) => {
        const strength = parseFloat(el.getAttribute("data-mouse-parallax") || "0");
        const targetX = (mouse.current.x - cx) * strength;
        const targetY = (mouse.current.y - cy) * strength;
        const state = mouseParallaxState.current.get(el) || { x: 0, y: 0 };
        state.x += (targetX - state.x) * 0.06;
        state.y += (targetY - state.y) * 0.06;
        mouseParallaxState.current.set(el, state);
        el.style.transform = `translate3d(${state.x.toFixed(1)}px, ${state.y.toFixed(1)}px, 0)`;
      });

      const travel = document.getElementById("travel-rocket");
      const accEl = document.getElementById("accueil");
      const apEl = document.getElementById("apropos");
      if (travel && accEl && apEl) {
        const accTop = accEl.offsetTop;
        const range = apEl.offsetTop + apEl.offsetHeight - accTop;
        const t = range > 0 ? Math.min(1, Math.max(0, (window.scrollY - accTop) / range)) : 0;
        const iw = window.innerWidth;
        const ih = window.innerHeight;

        if (!heroAnchor.current) {
          const sceneLeft = iw / 2 - 720;
          heroAnchor.current = {
            x: sceneLeft + 700 + 27,
            y: accEl.offsetTop + accEl.offsetHeight - 196 - 64,
          };
        }
        const heroX = heroAnchor.current.x;
        const heroY = heroAnchor.current.y - window.scrollY;

        const pts: Point[] = [
          { at: 0.0, x: heroX, y: heroY },
          { at: 0.08, x: heroX, y: heroY - ih * 0.2 },
          { at: 0.26, x: iw * 0.85, y: ih * 0.1 },
          { at: 0.36, x: iw * 1.05, y: ih * 0.18 },
          { at: 0.5, x: iw * 0.7, y: ih * 0.27 },
          { at: 0.64, x: iw * 0.44, y: ih * 0.4 },
          { at: 0.8, x: iw * 0.16, y: ih * 0.58 },
          { at: 0.99, x: -iw * 0.18, y: ih * 0.66 },
        ];
        const posAt = (tt: number) => {
          const n = pts.length;
          if (tt <= pts[0].at) return { x: pts[0].x, y: pts[0].y };
          if (tt >= pts[n - 1].at) return { x: pts[n - 1].x, y: pts[n - 1].y };
          for (let i = 0; i < n - 1; i++) {
            if (tt >= pts[i].at && tt <= pts[i + 1].at) {
              const span = pts[i + 1].at - pts[i].at;
              const u = span > 0 ? (tt - pts[i].at) / span : 0;
              const p0 = pts[i - 1] || pts[i];
              const p1 = pts[i];
              const p2 = pts[i + 1];
              const p3 = pts[i + 2] || pts[i + 1];
              return catmull(p0, p1, p2, p3, u);
            }
          }
          return { x: pts[n - 1].x, y: pts[n - 1].y };
        };

        const { x, y } = posAt(t);
        let opacity = 1;
        if (t > 0.96) opacity = (1 - t) / (1 - 0.96);
        opacity = Math.max(0, Math.min(1, opacity));

        const ahead = posAt(Math.min(1, t + 0.006));
        const behind = posAt(Math.max(0, t - 0.006));
        const dx = ahead.x - behind.x;
        const dy = ahead.y - behind.y;
        let rot = lastRocketRot.current;
        if (Math.abs(dx) > 0.02 || Math.abs(dy) > 0.02) {
          rot = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
          lastRocketRot.current = rot;
        }

        travel.style.opacity = opacity.toFixed(2);
        travel.style.left = x.toFixed(1) + "px";
        travel.style.top = y.toFixed(1) + "px";
        travel.style.transform = `translate(-50%, -50%) rotate(${rot.toFixed(1)}deg)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return activeSection;
}
