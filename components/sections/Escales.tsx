"use client";

import { useRef, useState } from "react";
import StarField from "@/components/StarField";
import { projets } from "@/lib/data";

const N = projets.length;
const TARGET_DEG = 120;
const TILT = (-16 * Math.PI) / 180;

function makeSpheres(idx: number, rot: number) {
  const c = Math.cos(TILT);
  const s = Math.sin(TILT);
  return projets.map((p, i) => {
    const rad = ((TARGET_DEG + i * (360 / N) - rot) * Math.PI) / 180;
    const u = 480 * Math.cos(rad);
    const v = 115 * Math.sin(rad);
    const x = u * c - v * s;
    const y = u * s + v * c;
    const depth = (Math.sin(rad) + 1) / 2;
    const selected = i === idx;
    const size = selected ? 58 : 26 + depth * 20;
    return {
      key: i,
      left: Math.round(320 + x - size / 2),
      top: Math.round(320 + y - size / 2),
      size: Math.round(size),
      bg: p.bg,
      lum: selected ? 1 : Number((0.65 + depth * 0.35).toFixed(2)),
      z: v >= -size / 2 - 2 ? 4 : 1,
      glow: selected
        ? "0 0 0 3px rgba(255, 217, 160, 0.7), 0 0 36px rgba(255, 217, 160, 0.55)"
        : "0 0 14px rgba(20, 14, 52, 0.5)",
    };
  });
}

function easeInOutCubic(p: number) {
  return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
}

export default function Escales() {
  const [idx, setIdx] = useState(0);
  const [rot, setRot] = useState(0);
  const rafRef = useRef<number | null>(null);

  const animateTo = (target: number, from: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const start = from;
    const startTime = performance.now();
    const duration = 850;
    const step = (t: number) => {
      const p = Math.min(1, (t - startTime) / duration);
      const e = easeInOutCubic(p);
      setRot(start + (target - start) * e);
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const precedent = () => {
    const cible = rot - 360 / N;
    setIdx((i) => (i - 1 + N) % N);
    animateTo(cible, rot);
    setRot(cible);
  };

  const suivant = () => {
    const cible = rot + 360 / N;
    setIdx((i) => (i + 1) % N);
    animateTo(cible, rot);
    setRot(cible);
  };

  const pick = (i: number) => {
    const d = (((i * (360 / N) - rot) % 360) + 540) % 360 - 180;
    const cible = rot + d;
    setIdx(i);
    animateTo(cible, rot);
    setRot(cible);
  };

  const spheres = makeSpheres(idx, rot);
  const proj = projets[idx];

  return (
    <section
      id="escales"
      data-scene="escales"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: 860,
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #1B1240 0%, #1B1240 10%, #1A113D 25%, #180F36 50%, #150D2F 75%, #140C2D 90%, #140C2C 100%)",
      }}
    >
      <div data-parallax="-0.3" style={{ position: "absolute", left: 0, right: 0, top: -340, bottom: -340 }}>
        <StarField seed={7654321} />
      </div>

      <div data-parallax="-0.22" style={{ position: "absolute", left: 0, right: 0, top: -260, bottom: -260, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            left: "-12vw",
            bottom: 120,
            width: 700,
            height: 460,
            background: "radial-gradient(closest-side, rgba(127, 216, 212, 0.12), transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-8vw",
            top: 100,
            width: 760,
            height: 460,
            background: "radial-gradient(closest-side, rgba(255, 142, 110, 0.16), transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* trajectoire pleine largeur */}
      <div
        style={{
          position: "absolute",
          left: "-14vw",
          bottom: "-46vh",
          width: 2200,
          height: 900,
          border: "2px dashed rgba(201, 188, 242, 0.28)",
          borderRadius: "50%",
        }}
      />

      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: 1440, height: 900 }}>
        {/* planète du projet + sphères-escales */}
        <div data-parallax="-0.06" style={{ position: "absolute", right: -110, top: 130, width: 640, height: 640 }}>
          <div style={{ position: "absolute", inset: 0, animation: "floaty 11s ease-in-out infinite" }}>
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 960,
                height: 230,
                border: "3px solid rgba(255, 217, 160, 0.45)",
                borderRadius: "50%",
                transform: "translate(-50%, -50%) rotate(-16deg)",
                clipPath: "inset(0 0 50% 0)",
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 960,
                height: 230,
                border: "3px solid rgba(255, 217, 160, 0.45)",
                borderRadius: "50%",
                transform: "translate(-50%, -50%) rotate(-16deg)",
                clipPath: "inset(50% 0 0 0)",
                zIndex: 3,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: -12,
                borderRadius: "50%",
                border: "7px solid rgba(240, 220, 255, 0.2)",
                filter: "blur(8px)",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                overflow: "hidden",
                boxShadow: "0 0 120px rgba(240, 220, 255, 0.22)",
                zIndex: 2,
              }}
            >
              <div style={{ position: "absolute", inset: 0, background: proj.bg, transition: "background 0.4s ease" }} />
              <div
                style={{
                  position: "absolute",
                  left: "6%",
                  top: "20%",
                  width: 340,
                  height: 48,
                  borderRadius: 999,
                  background: "rgba(255, 255, 255, 0.14)",
                  filter: "blur(2px)",
                  animation: "banddrift 16s ease-in-out infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "26%",
                  top: "40%",
                  width: 420,
                  height: 42,
                  borderRadius: 999,
                  background: "rgba(30, 12, 40, 0.24)",
                  filter: "blur(2px)",
                  animation: "banddrift 20s ease-in-out 2s infinite reverse",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "4%",
                  top: "61%",
                  width: 300,
                  height: 38,
                  borderRadius: 999,
                  background: "rgba(30, 12, 40, 0.2)",
                  filter: "blur(2px)",
                  animation: "banddrift 24s ease-in-out 5s infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "58%",
                  top: "12%",
                  width: 46,
                  height: 46,
                  borderRadius: "50%",
                  background: "rgba(30, 12, 40, 0.18)",
                  boxShadow: "inset 3px 4px 6px rgba(8, 5, 24, 0.45), inset -1px -2px 3px rgba(255, 255, 255, 0.12)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "40%",
                  top: "76%",
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: "rgba(30, 12, 40, 0.16)",
                  boxShadow: "inset 2px 3px 5px rgba(8, 5, 24, 0.4), inset -1px -1px 2px rgba(255, 255, 255, 0.1)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "20%",
                  top: "54%",
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "rgba(30, 12, 40, 0.2)",
                  boxShadow: "inset 2px 2px 4px rgba(8, 5, 24, 0.4)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle at 32% 28%, transparent 42%, rgba(8, 5, 26, 0.5) 88%)",
                }}
              />
            </div>

            {spheres.map((sp) => (
              <div
                key={sp.key}
                onClick={() => pick(sp.key)}
                style={{
                  position: "absolute",
                  left: sp.left,
                  top: sp.top,
                  width: sp.size,
                  height: sp.size,
                  borderRadius: "50%",
                  background: sp.bg,
                  filter: `brightness(${sp.lum})`,
                  zIndex: sp.z,
                  boxShadow: sp.glow,
                  cursor: "pointer",
                  transition: "box-shadow 0.4s ease",
                }}
              />
            ))}
          </div>
        </div>

        {/* contenu projet + visuel : empilés dans un même flex column pour que
            la fenêtre "visuel" soit toujours repoussée sous le texte, même
            quand un titre/description plus long dépasse les minHeight
            (positions absolues indépendantes = chevauchement possible). */}
        <div style={{ position: "absolute", left: 120, top: 170, display: "flex", flexDirection: "column", gap: 40, maxWidth: 560 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 15,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#FFB37A",
            }}
          >
            {`escale 0${idx + 1} / 0${N}`}
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontSize: 58,
              fontWeight: 720,
              lineHeight: 1.05,
              color: "#F6F1FF",
              minHeight: 128,
            }}
          >
            {proj.titre}
          </h2>
          <div style={{ fontSize: 20, lineHeight: 1.65, color: "#B9AEDC", minHeight: 100 }}>{proj.desc}</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {proj.tags.map((tag) => (
              <div
                key={tag}
                style={{
                  border: "1px solid rgba(201, 188, 242, 0.4)",
                  color: "#C9BCF2",
                  borderRadius: 999,
                  padding: "8px 18px",
                  fontSize: 14,
                  letterSpacing: "0.06em",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 4 }}>
            <div
              onClick={precedent}
              className="escale-arrow"
              style={{
                width: 54,
                height: 54,
                borderRadius: "50%",
                border: "1.5px solid rgba(255, 179, 122, 0.6)",
                color: "#FFB37A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                cursor: "pointer",
                background: "rgba(11, 8, 34, 0.4)",
                userSelect: "none",
                transition: "box-shadow 0.25s ease",
              }}
            >
              ←
            </div>
            <div
              onClick={suivant}
              className="escale-arrow"
              style={{
                width: 54,
                height: 54,
                borderRadius: "50%",
                border: "1.5px solid rgba(255, 179, 122, 0.6)",
                color: "#FFB37A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                cursor: "pointer",
                background: "rgba(11, 8, 34, 0.4)",
                userSelect: "none",
                transition: "box-shadow 0.25s ease",
              }}
            >
              →
            </div>
            <div style={{ display: "flex", gap: 8, marginLeft: 4 }}>
              {projets.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    background: i === idx ? "#FFB37A" : "rgba(201, 188, 242, 0.35)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* visuel du projet */}
        <div
          style={{
            width: 440,
            height: 220,
            flexShrink: 0,
            borderRadius: 20,
            border: "1.5px dashed rgba(183, 166, 240, 0.45)",
            background:
              "repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.045) 0px, rgba(255, 255, 255, 0.045) 12px, rgba(21, 16, 64, 0) 12px, rgba(21, 16, 64, 0) 24px), #141040",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "floaty 8s ease-in-out infinite",
          }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 15, color: "#8F84C4" }}>{proj.visuel}</div>
        </div>
        </div>
      </div>
    </section>
  );
}
