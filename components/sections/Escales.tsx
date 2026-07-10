"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import StarField from "@/components/StarField";
import EscaleGallery from "@/components/EscaleGallery";
import BlurReveal from "@/components/BlurReveal";
import BorderGlow from "@/components/BorderGlow";
import { projets } from "@/lib/data";

const N = projets.length;
// Fixed angular spacing between adjacent escales, independent of how many
// projects exist — this is what made the original 6-project orbit feel
// like planets swinging out from behind the big planet and off past the
// screen edge. Tying it to 360/N (as a "show them all" approach would)
// crams everything close together once N gets large.
const SLOT = 60;
const TARGET_DEG = 120;
const TILT = (-16 * Math.PI) / 180;
// How many neighbours (each way) get an actual DOM node. Opacity fades to 0
// by 2 slots away, so a radius well past that means spheres only ever
// mount/unmount while already fully transparent — no popping.
const CANDIDATE_RADIUS = Math.min(5, Math.floor((N - 1) / 2));

const mod = (n: number, m: number) => ((n % m) + m) % m;

// `step` is an unbounded integer (not wrapped) — it only ever changes by
// the exact delta the user navigates, so a project's position relative to
// it is stable for the whole transition. `rot` is the same quantity but
// animated smoothly toward `step` by rAF. Every visible sphere's angle is
// therefore a continuous function of (candidateStep - rot), so entering
// and exiting planets fade instead of jumping.
function makeSpheres(step: number, rot: number) {
  const c = Math.cos(TILT);
  const s = Math.sin(TILT);
  const spheres = [];
  for (let k = -CANDIDATE_RADIUS; k <= CANDIDATE_RADIUS; k++) {
    const candidateStep = step + k;
    const p = projets[mod(candidateStep, N)];
    const renderOffset = candidateStep - rot; // in slot units, continuous
    const slotsAway = Math.abs(renderOffset);
    const opacity = Math.max(0, Math.min(1, 2 - slotsAway));

    const rad = ((TARGET_DEG + renderOffset * SLOT) * Math.PI) / 180;
    const u = 480 * Math.cos(rad);
    const v = 115 * Math.sin(rad);
    const x = u * c - v * s;
    const y = u * s + v * c;
    const depth = (Math.sin(rad) + 1) / 2;
    const selected = candidateStep === step;
    const size = selected ? 58 : 26 + depth * 20;
    spheres.push({
      key: candidateStep,
      targetStep: candidateStep,
      left: Math.round(320 + x - size / 2),
      top: Math.round(320 + y - size / 2),
      size: Math.round(size),
      bg: p.bg,
      lum: selected ? 1 : Number((0.65 + depth * 0.35).toFixed(2)),
      z: v >= -size / 2 - 2 ? 4 : 1,
      opacity: Number(opacity.toFixed(3)),
      glow: selected
        ? "0 0 0 3px rgba(255, 217, 160, 0.7), 0 0 36px rgba(255, 217, 160, 0.55)"
        : "0 0 14px rgba(20, 14, 52, 0.5)",
    });
  }
  return spheres;
}

function easeInOutCubic(p: number) {
  return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
}

export default function Escales() {
  const [step, setStep] = useState(0);
  const [rot, setRot] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const rafRef = useRef<number | null>(null);
  const idx = mod(step, N);

  const animateTo = (target: number, from: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const start = from;
    const startTime = performance.now();
    const duration = 850;
    const anim = (t: number) => {
      const p = Math.min(1, (t - startTime) / duration);
      const e = easeInOutCubic(p);
      setRot(start + (target - start) * e);
      if (p < 1) rafRef.current = requestAnimationFrame(anim);
    };
    rafRef.current = requestAnimationFrame(anim);
  };

  const precedent = () => {
    const target = step - 1;
    setStep(target);
    animateTo(target, rot);
  };

  const suivant = () => {
    const target = step + 1;
    setStep(target);
    animateTo(target, rot);
  };

  const pick = (targetStep: number) => {
    if (targetStep === step) return;
    setStep(targetStep);
    animateTo(targetStep, rot);
  };

  const spheres = makeSpheres(step, rot);
  const proj = projets[idx];

  return (
    <section
      id="escales"
      data-scene="escales"
      className="scene-section"
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

      <div className="stage-desktop stage-scale-center" style={{ position: "absolute", left: "50%", top: "50%", width: 1440, height: 900 }}>
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
                onClick={() => pick(sp.targetStep)}
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
                  opacity: sp.opacity,
                  boxShadow: sp.glow,
                  cursor: "pointer",
                  pointerEvents: sp.opacity > 0.05 ? "auto" : "none",
                  transition: "box-shadow 0.4s ease, opacity 0.2s linear",
                }}
              />
            ))}
          </div>
        </div>

        {/* contenu projet + visuel : empilés dans un même flex column pour que
            la fenêtre "visuel" soit toujours repoussée sous le texte, même
            quand un titre/description plus long dépasse les minHeight
            (positions absolues indépendantes = chevauchement possible). */}
        <div style={{ position: "absolute", left: 120, top: 64, display: "flex", flexDirection: "column", gap: 28, maxWidth: 560 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <BlurReveal
            as="div"
            text={`escale ${String(idx + 1).padStart(2, "0")} / ${String(N).padStart(2, "0")}`}
            delay={45}
            duration={0.8}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 15,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#FFB37A",
            }}
          />
          <BlurReveal
            as="h2"
            text={proj.titre}
            delay={55}
            duration={0.95}
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontSize: 58,
              fontWeight: 720,
              lineHeight: 1.05,
              color: "#F6F1FF",
              height: 184,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          />
          <BlurReveal
            as="div"
            text={proj.desc}
            delay={22}
            duration={0.75}
            style={{
              fontSize: 20,
              lineHeight: 1.65,
              color: "#B9AEDC",
              height: 165,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 5,
              WebkitBoxOrient: "vertical",
            }}
          />
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", height: 37, overflow: "hidden" }}>
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
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    background: idx % 6 === i ? "#FFB37A" : "rgba(201, 188, 242, 0.35)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* visuel du projet — hublot cliquable vers la galerie */}
        <div
          style={{
            position: "relative",
            width: 440,
            height: 220,
            flexShrink: 0,
            animation: "floaty 8s ease-in-out infinite",
          }}
        >
          <BorderGlow
            className="escale-porthole"
            onClick={() => {
              setGalleryIndex(0);
              setGalleryOpen(true);
            }}
            style={{ width: "100%", height: "100%", cursor: "pointer" }}
            borderRadius={20}
          >
            {proj.cover.type === "image" ? (
              <Image src={proj.cover.src} alt={proj.cover.alt || proj.titre} fill sizes="440px" style={{ objectFit: "cover" }} />
            ) : (
              <Image src={proj.cover.poster} alt={proj.titre} fill sizes="440px" style={{ objectFit: "cover" }} />
            )}
            <div
              className="escale-porthole-overlay"
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: "rgba(11, 8, 34, 0.55)",
                color: "#F6F1FF",
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                opacity: 0,
                transition: "opacity 0.25s ease",
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FFB37A" }} />
              {proj.gallery.length > 1 ? `voir les ${proj.gallery.length} visuels` : "voir en grand"}
            </div>
            {[
              { left: 10, top: 10 },
              { right: 10, top: 10 },
              { left: 10, bottom: 10 },
              { right: 10, bottom: 10 },
            ].map((pos, i) => (
              <div key={i} style={{ position: "absolute", width: 6, height: 6, borderRadius: "50%", background: "rgba(255, 217, 160, 0.7)", ...pos }} />
            ))}
          </BorderGlow>
        </div>
        </div>
      </div>

      {/* mise en page mobile — l'orbite est abandonnée (calibrée pour un
          grand canevas), mais toute la navigation reste : compteur, titre,
          hublot cliquable, flèches, points. */}
      <div
        className="stage-mobile"
        style={{
          position: "relative",
          padding: "90px 24px 40px",
          flexDirection: "column",
          justifyContent: "center",
          gap: 24,
        }}
      >
        <BlurReveal
          as="div"
          text={`escale ${String(idx + 1).padStart(2, "0")} / ${String(N).padStart(2, "0")}`}
          delay={45}
          duration={0.8}
          style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "#FFB37A" }}
        />
        <BlurReveal
          as="h2"
          text={proj.titre}
          delay={55}
          duration={0.95}
          style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "clamp(28px, 7.5vw, 38px)", fontWeight: 720, lineHeight: 1.08, color: "#F6F1FF" }}
        />

        <div style={{ position: "relative", width: "100%", height: 200, animation: "floaty 8s ease-in-out infinite" }}>
          <BorderGlow
            onClick={() => {
              setGalleryIndex(0);
              setGalleryOpen(true);
            }}
            style={{ width: "100%", height: "100%", cursor: "pointer" }}
            borderRadius={18}
          >
            {proj.cover.type === "image" ? (
              <Image src={proj.cover.src} alt={proj.cover.alt || proj.titre} fill sizes="100vw" style={{ objectFit: "cover" }} />
            ) : (
              <Image src={proj.cover.poster} alt={proj.titre} fill sizes="100vw" style={{ objectFit: "cover" }} />
            )}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "flex-end",
                padding: 12,
                background: "linear-gradient(0deg, rgba(11, 8, 34, 0.75), transparent 55%)",
                color: "#F6F1FF",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                gap: 8,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFB37A", flexShrink: 0, alignSelf: "center" }} />
              {proj.gallery.length > 1 ? `voir les ${proj.gallery.length} visuels` : "voir en grand"}
            </div>
          </BorderGlow>
        </div>

        <BlurReveal as="div" text={proj.desc} delay={22} duration={0.75} style={{ fontSize: 15, lineHeight: 1.55, color: "#B9AEDC" }} />

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {proj.tags.map((tag) => (
            <div
              key={tag}
              style={{
                border: "1px solid rgba(201, 188, 242, 0.4)",
                color: "#C9BCF2",
                borderRadius: 999,
                padding: "6px 14px",
                fontSize: 12,
                letterSpacing: "0.05em",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            onClick={precedent}
            className="escale-arrow"
            style={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              border: "1.5px solid rgba(255, 179, 122, 0.6)",
              color: "#FFB37A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              cursor: "pointer",
              background: "rgba(11, 8, 34, 0.4)",
              userSelect: "none",
              flexShrink: 0,
            }}
          >
            ←
          </div>
          <div
            onClick={suivant}
            className="escale-arrow"
            style={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              border: "1.5px solid rgba(255, 179, 122, 0.6)",
              color: "#FFB37A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              cursor: "pointer",
              background: "rgba(11, 8, 34, 0.4)",
              userSelect: "none",
              flexShrink: 0,
            }}
          >
            →
          </div>
          <div style={{ display: "flex", gap: 7, marginLeft: 4 }}>
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: idx % 6 === i ? "#FFB37A" : "rgba(201, 188, 242, 0.35)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <EscaleGallery
        open={galleryOpen}
        titre={proj.titre}
        tags={proj.tags}
        items={proj.gallery}
        index={galleryIndex}
        onIndex={setGalleryIndex}
        onClose={() => setGalleryOpen(false)}
        onNextEscale={() => {
          suivant();
          setGalleryIndex(0);
        }}
        onPrevEscale={() => {
          const prevIdx = (idx - 1 + N) % N;
          precedent();
          setGalleryIndex(projets[prevIdx].gallery.length - 1);
        }}
      />
    </section>
  );
}
