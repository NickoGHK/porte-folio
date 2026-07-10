"use client";

import { useState } from "react";
import { audioBus } from "@/lib/audioBus";

export default function AudioPlayer() {
  const [vol, setVol] = useState(0.6);
  const [muet, setMuet] = useState(true);

  const toggleSon = () => {
    const nextMuet = !muet;
    let v = vol;
    if (!nextMuet && v === 0) v = 0.6;
    setMuet(nextMuet);
    setVol(v);
    audioBus.setUserVolume(v);
    if (nextMuet) {
      audioBus.pause();
    } else {
      audioBus.play();
    }
  };

  const applique = (clientX: number, rect: DOMRect) => {
    const f = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setVol(f);
    setMuet(f === 0);
    audioBus.setUserVolume(f);
    if (f > 0 && !audioBus.isPlaying()) audioBus.play();
    if (f === 0) audioBus.pause();
  };

  const onVolDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    applique(e.clientX, rect);
    const move = (ev: MouseEvent) => applique(ev.clientX, rect);
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const ondes1 = muet ? 0 : 1;
  const ondes2 = muet ? 0 : 0.6;
  const barreMuet = muet ? 1 : 0;
  const volPct = Math.round(vol * 100) + "%";
  const knobLeft = `calc(${Math.round(vol * 100)}% - 9px)`;
  const sonLabel = muet ? "MUET" : "VOL " + Math.round(vol * 100) + "%";

  const icon = (
    <div onClick={toggleSon} className="audio-icon" style={{ cursor: "pointer", position: "relative", width: 30, height: 22, flexShrink: 0 }}>
      <div style={{ position: "absolute", left: 0, top: 6, width: 6, height: 10, borderRadius: 2, background: "#C9BCF2" }} />
      <div
        style={{
          position: "absolute",
          left: 3,
          top: 1,
          width: 11,
          height: 20,
          background: "#C9BCF2",
          clipPath: "polygon(100% 0%, 100% 100%, 0% 68%, 0% 32%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 17,
          top: 5,
          width: 6,
          height: 12,
          border: "2px solid #FFB37A",
          borderLeft: "none",
          borderRadius: "0px 10px 10px 0px",
          opacity: ondes1,
          transition: "opacity 0.3s",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 21,
          top: 2,
          width: 8,
          height: 18,
          border: "2px solid #FFB37A",
          borderLeft: "none",
          borderRadius: "0px 14px 14px 0px",
          opacity: ondes2,
          transition: "opacity 0.3s",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 13,
          top: 10,
          width: 17,
          height: 2.5,
          background: "#FF8E6E",
          borderRadius: 2,
          transform: "rotate(-38deg)",
          opacity: barreMuet,
          transition: "opacity 0.3s",
        }}
      />
    </div>
  );

  return (
    <>
      {/* desktop / tablette — pilule complète avec curseur de volume */}
      <div
        className="stage-desktop"
        style={{
          position: "fixed",
          right: 24,
          bottom: 24,
          zIndex: 95,
          display: "flex",
          alignItems: "center",
          gap: 14,
          background: "linear-gradient(180deg, #2A2260, #1A1240)",
          border: "2px solid #6D5FAE",
          borderRadius: 999,
          padding: "10px 20px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(201, 188, 242, 0.3)",
        }}
      >
        {icon}

        <div
          onMouseDown={onVolDown}
          style={{ position: "relative", width: 130, height: 24, display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <div
            style={{
              width: "100%",
              height: 2,
              borderRadius: 2,
              background:
                "repeating-linear-gradient(90deg, rgba(201, 188, 242, 0.5) 0px, rgba(201, 188, 242, 0.5) 5px, transparent 5px, transparent 11px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 11,
              width: volPct,
              height: 2,
              borderRadius: 2,
              background: "#FFB37A",
              boxShadow: "0 0 8px rgba(255, 179, 122, 0.8)",
            }}
          />
          <div
            className="audio-knob"
            style={{
              position: "absolute",
              left: knobLeft,
              top: 3,
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 30%, #FFC894, #C75E74 75%, #5C2A5E)",
              boxShadow: "inset -2px -2px 4px rgba(40, 10, 40, 0.5)",
            }}
          />
        </div>

        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            color: "#C9BCF2",
            minWidth: 62,
            textAlign: "right",
          }}
        >
          {sonLabel}
        </div>
      </div>

      {/* mobile — bouton compact en haut à droite, pour ne pas gêner les
          liens de bas de section (indication de scroll, etc.) */}
      <div
        className="stage-mobile"
        style={{
          position: "fixed",
          right: 16,
          top: 16,
          zIndex: 95,
          width: 44,
          height: 44,
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #2A2260, #1A1240)",
          border: "2px solid #6D5FAE",
          borderRadius: "50%",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.45)",
        }}
      >
        {icon}
      </div>
    </>
  );
}
