"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import StarField from "@/components/StarField";
import BlurReveal from "@/components/BlurReveal";
import BorderGlow from "@/components/BorderGlow";
import type { MediaItem } from "@/lib/data";
import { audioBus } from "@/lib/audioBus";
import { useSwipe } from "@/lib/useSwipe";

const CLOSE_MS = 260;

export default function EscaleGallery({
  open,
  titre,
  tags,
  items,
  index,
  onIndex,
  onClose,
  onNextEscale,
  onPrevEscale,
}: {
  open: boolean;
  titre: string;
  tags: string[];
  items: MediaItem[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
  onNextEscale: () => void;
  onPrevEscale: () => void;
}) {
  const n = items.length;
  const current = items[index];
  const isFirst = index === 0;
  const isLast = index === n - 1;
  const duckedRef = useRef(false);
  const viewerRowRef = useRef<HTMLDivElement>(null);

  // Kept mounted through the "closing" phase so the exit transition can
  // play — the parent just toggles `open`, this component decides when it
  // actually leaves the DOM.
  const [phase, setPhase] = useState<"closed" | "open" | "closing">(open ? "open" : "closed");
  const mountedBefore = useRef(open);

  useEffect(() => {
    if (!mountedBefore.current) {
      mountedBefore.current = true;
      return;
    }
    if (open) {
      setPhase("open");
    } else {
      setPhase((p) => (p === "closed" ? "closed" : "closing"));
    }
  }, [open]);

  useEffect(() => {
    if (phase !== "closing") return;
    const t = setTimeout(() => setPhase("closed"), CLOSE_MS);
    return () => clearTimeout(t);
  }, [phase]);

  const goNext = () => {
    if (isLast) onNextEscale();
    else onIndex(index + 1);
  };

  const goPrev = () => {
    if (isFirst) onPrevEscale();
    else onIndex(index - 1);
  };

  // Mobile-only: swipe the main image left/right, alongside the arrow
  // buttons — disabled on video items so it doesn't fight the native
  // scrub controls.
  const imageSwipe = useSwipe(goNext, goPrev);

  const onVideoPlay = () => {
    if (!duckedRef.current) {
      duckedRef.current = true;
      audioBus.duck();
    }
  };

  const onVideoStop = () => {
    if (duckedRef.current) {
      duckedRef.current = false;
      audioBus.unduck();
    }
  };

  // Lets the frame's border glow react even when the cursor is over the
  // prev/next arrows (outside the card itself) — same math BorderGlow uses
  // internally, computed relative to the frame's own bounds, plus a
  // .force-glow class since the arrows hovering doesn't trigger the card's
  // native :hover.
  const handleViewerPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = viewerRowRef.current?.querySelector<HTMLDivElement>(".border-glow-card");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dx = x - cx;
    const dy = y - cy;
    let kx = Infinity;
    let ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    const radians = Math.atan2(dy, dx);
    let degrees = radians * (180 / Math.PI) + 90;
    if (degrees < 0) degrees += 360;
    card.style.setProperty("--edge-proximity", `${(edge * 100).toFixed(3)}`);
    card.style.setProperty("--cursor-angle", `${degrees.toFixed(3)}deg`);
    card.classList.add("force-glow");
  };

  const handleViewerPointerLeave = () => {
    viewerRowRef.current?.querySelector<HTMLDivElement>(".border-glow-card")?.classList.remove("force-glow");
  };

  useEffect(() => {
    if (phase === "closed") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, index, n, onIndex, onClose, isFirst, isLast, onNextEscale, onPrevEscale]);

  // Restores the ambiance if the gallery closes, or a different item is
  // shown, while a video was still playing.
  useEffect(() => {
    return () => onVideoStop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  if (phase === "closed") return null;
  const closing = phase === "closing";

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse at 50% 30%, rgba(42, 22, 80, 0.97), rgba(10, 6, 32, 0.99))",
        padding: "40px 24px",
        animation: `${closing ? "galleryBackdropOut" : "galleryBackdropIn"} ${closing ? CLOSE_MS : 300}ms ease forwards`,
      }}
    >
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <StarField seed={9182736} count={110} />
      </div>

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          animation: `${closing ? "galleryPanelOut" : "galleryPanelIn"} ${closing ? CLOSE_MS : 650}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
        }}
      >
        {/* en-tête */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 1000,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 20,
            animation: closing ? undefined : "galleryContentIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) 220ms both",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", color: "#FFB37A" }}>
              {`archives de l'escale — ${String(index + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`}
            </div>
            <BlurReveal
              as="h3"
              text={titre}
              delay={40}
              duration={0.85}
              style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 720, color: "#F6F1FF" }}
            />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {tags.map((tag) => (
                <div key={tag} style={{ border: "1px solid rgba(201, 188, 242, 0.4)", color: "#C9BCF2", borderRadius: 999, padding: "4px 12px", fontSize: 12, letterSpacing: "0.06em" }}>
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer"
            style={{
              width: 44,
              height: 44,
              flexShrink: 0,
              borderRadius: "50%",
              border: "1.5px solid rgba(255, 179, 122, 0.6)",
              color: "#FFB37A",
              background: "rgba(11, 8, 34, 0.5)",
              fontSize: 20,
              cursor: "pointer",
            }}
            className="escale-arrow"
          >
            ×
          </button>
        </div>

        {/* visionneuse principale */}
        <div
          ref={viewerRowRef}
          onPointerMove={handleViewerPointerMove}
          onPointerLeave={handleViewerPointerLeave}
          style={{ position: "relative", width: "100%", maxWidth: 1000, display: "flex", alignItems: "center", gap: 18 }}
        >
          <button
            onClick={goPrev}
            aria-label={isFirst ? "Escale précédente" : "Précédent"}
            className="escale-arrow gallery-nav-arrow"
            style={{
              width: 54,
              height: 54,
              flexShrink: 0,
              borderRadius: "50%",
              border: "1.5px solid rgba(255, 179, 122, 0.6)",
              color: "#FFB37A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              cursor: "pointer",
              background: "rgba(11, 8, 34, 0.5)",
            }}
          >
            ←
          </button>

          <div
            style={{ flex: 1, height: "min(60vh, 640px)" }}
            onTouchStart={current.type === "image" ? imageSwipe.onTouchStart : undefined}
            onTouchMove={current.type === "image" ? imageSwipe.onTouchMove : undefined}
            onTouchEnd={current.type === "image" ? imageSwipe.onTouchEnd : undefined}
          >
          <BorderGlow
            key={index}
            className="gallery-frame"
            backgroundColor="#0E0926"
            borderRadius={20}
            glowRadius={44}
            style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <GalleryCorner style={{ left: 10, top: 10 }} />
            <GalleryCorner style={{ right: 10, top: 10 }} />
            <GalleryCorner style={{ left: 10, bottom: 10 }} />
            <GalleryCorner style={{ right: 10, bottom: 10 }} />

            {current.type === "image" ? (
              <Image src={current.src} alt={current.alt || titre} fill sizes="1000px" style={{ objectFit: "contain" }} />
            ) : (
              <video
                key={current.src}
                src={current.src}
                poster={current.poster}
                controls
                preload="metadata"
                onPlay={onVideoPlay}
                onPause={onVideoStop}
                onEnded={onVideoStop}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            )}
          </BorderGlow>
          </div>

          <button
            onClick={goNext}
            aria-label={isLast ? "Escale suivante" : "Suivant"}
            className="escale-arrow gallery-nav-arrow"
            style={{
              width: 54,
              height: 54,
              flexShrink: 0,
              borderRadius: "50%",
              border: "1.5px solid rgba(255, 179, 122, 0.6)",
              color: "#FFB37A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              cursor: "pointer",
              background: "rgba(11, 8, 34, 0.5)",
            }}
          >
            →
          </button>
        </div>

        {/* bande de vignettes */}
        {n > 1 && (
          <div
            style={{
              position: "relative",
              display: "flex",
              gap: 10,
              marginTop: 22,
              maxWidth: 1000,
              overflowX: "auto",
              padding: "4px 6px",
              animation: closing ? undefined : "galleryContentIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) 320ms both",
            }}
          >
            {items.map((item, i) => (
              <button
                key={i}
                onClick={() => onIndex(i)}
                style={{
                  position: "relative",
                  width: 64,
                  height: 64,
                  flexShrink: 0,
                  borderRadius: 12,
                  overflow: "hidden",
                  cursor: "pointer",
                  border: i === index ? "2px solid #FFB37A" : "2px solid rgba(201, 188, 242, 0.25)",
                  boxShadow: i === index ? "0 0 16px rgba(255, 179, 122, 0.5)" : "none",
                  transition: "border 0.25s ease, box-shadow 0.25s ease",
                  opacity: i === index ? 1 : 0.6,
                }}
              >
                <Image
                  src={item.type === "image" ? item.src : item.poster}
                  alt=""
                  fill
                  sizes="64px"
                  style={{ objectFit: "cover" }}
                />
                {item.type === "video" && (
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(8, 5, 24, 0.35)", fontSize: 16, color: "#F6F1FF" }}>
                    ▶
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* navigation d'escale — délibérément discrète et séparée des flèches
            image (qui parcourent CE projet) : un aller simple explicite vers
            un autre projet, pour qui le cherche, sans risquer de clics
            accidentels sur le contrôle principal. */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: 1000,
            marginTop: n > 1 ? 18 : 28,
            animation: closing ? undefined : "galleryContentIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) 380ms both",
          }}
        >
          <button
            onClick={onPrevEscale}
            className="gallery-escale-nav"
            style={{
              cursor: "pointer",
              color: "rgba(201, 188, 242, 0.55)",
              fontSize: 13,
              letterSpacing: "0.04em",
              transition: "color 0.2s ease",
              // padding grows the hit area well past the visible text (so an
              // imprecise click still registers as "on the button" instead
              // of leaking through to the backdrop and closing the gallery)
              // while the matching negative margin keeps it visually in place.
              padding: "16px 20px",
              margin: "-16px -20px",
            }}
          >
            ← Escale précédente
          </button>
          <button
            onClick={onNextEscale}
            className="gallery-escale-nav"
            style={{
              cursor: "pointer",
              color: "rgba(201, 188, 242, 0.55)",
              fontSize: 13,
              letterSpacing: "0.04em",
              transition: "color 0.2s ease",
              padding: "16px 20px",
              margin: "-16px -20px",
            }}
          >
            Escale suivante →
          </button>
        </div>
      </div>
    </div>
  );
}

function GalleryCorner({ style }: { style: React.CSSProperties }) {
  return (
    <div
      style={{
        position: "absolute",
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: "rgba(255, 217, 160, 0.6)",
        zIndex: 2,
        ...style,
      }}
    />
  );
}
