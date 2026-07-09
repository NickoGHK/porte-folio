"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import StarField from "@/components/StarField";
import type { MediaItem } from "@/lib/data";
import { audioBus } from "@/lib/audioBus";

export default function EscaleGallery({
  titre,
  tags,
  items,
  index,
  onIndex,
  onClose,
  onNextEscale,
  onPrevEscale,
}: {
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

  const goNext = () => {
    if (isLast) onNextEscale();
    else onIndex(index + 1);
  };

  const goPrev = () => {
    if (isFirst) onPrevEscale();
    else onIndex(index - 1);
  };

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

  useEffect(() => {
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
  }, [index, n, onIndex, onClose, isFirst, isLast, onNextEscale, onPrevEscale]);

  // Restores the ambiance if the gallery closes, or a different item is
  // shown, while a video was still playing.
  useEffect(() => {
    return () => onVideoStop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

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
        backdropFilter: "blur(6px)",
        padding: "40px 24px",
      }}
    >
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <StarField seed={9182736} count={110} />
      </div>

      {/* en-tête */}
      <div style={{ position: "relative", width: "100%", maxWidth: 1000, display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", color: "#FFB37A" }}>
            {`archives de l'escale — ${String(index + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`}
          </div>
          <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 720, color: "#F6F1FF" }}>{titre}</h3>
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
      <div style={{ position: "relative", width: "100%", maxWidth: 1000, display: "flex", alignItems: "center", gap: 18 }}>
        <button
          onClick={goPrev}
          aria-label={isFirst ? "Escale précédente" : "Précédent"}
          className="escale-arrow"
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
          key={index}
          className="gallery-frame"
          style={{
            position: "relative",
            flex: 1,
            height: "min(60vh, 640px)",
            borderRadius: 20,
            border: "1.5px solid rgba(255, 217, 160, 0.35)",
            boxShadow: "0 0 60px rgba(168, 120, 255, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
            background: "#0E0926",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
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
        </div>

        <button
          onClick={goNext}
          aria-label={isLast ? "Escale suivante" : "Suivant"}
          className="escale-arrow"
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
        <div style={{ position: "relative", display: "flex", gap: 10, marginTop: 22, maxWidth: 1000, overflowX: "auto", padding: "4px 6px" }}>
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
