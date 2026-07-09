// Position/rotation/opacity are written directly to this element's style by
// useScrollFX's rAF loop (imperative DOM writes, not React state) — this
// keeps a 60fps animation off React's render cycle, matching the reference.
export default function TravelRocket() {
  return (
    <div
      id="travel-rocket"
      style={{
        position: "fixed",
        top: "78vh",
        left: "18vw",
        width: 46,
        height: 110,
        transform: "translate(-50%, -50%) rotate(-18deg)",
        opacity: 0,
        pointerEvents: "none",
        zIndex: 42,
        transition: "opacity 0.5s ease",
      }}
    >
      <div style={{ position: "relative", width: 46, height: 110 }}>
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: -44,
            transform: "translateX(-50%)",
            width: 58,
            height: 58,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(255, 179, 122, 0.42), transparent 70%)",
            animation: "glowpulse 1.1s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: -26,
            transform: "translateX(-50%)",
            width: 22,
            height: 30,
            background: "linear-gradient(180deg, #FFD9A0 0%, #FF8E6E 60%, rgba(255, 142, 110, 0))",
            clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
            transformOrigin: "top center",
            animation: "flame 0.9s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "23px 23px 12px 12px",
            background: "linear-gradient(160deg, #F8F2FF 0%, #D9CCF6 55%, #A995E4 100%)",
            boxShadow: "inset -5px -3px 10px -3px rgba(58, 42, 110, 0.45), inset 4px 3px 7px -3px rgba(255, 255, 255, 0.7)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 6,
            top: 10,
            width: 4,
            height: 74,
            borderRadius: 3,
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.04))",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 22,
            transform: "translateX(-50%)",
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#241A52",
            border: "3px solid #FFD9A0",
          }}
        />
        <div style={{ position: "absolute", left: -13, bottom: 3, width: 17, height: 32, background: "#FF8E6E", clipPath: "polygon(100% 0%, 100% 100%, 0% 100%)", borderRadius: 4 }} />
        <div style={{ position: "absolute", right: -13, bottom: 3, width: 17, height: 32, background: "#FF8E6E", clipPath: "polygon(0% 0%, 0% 100%, 100% 100%)", borderRadius: 4 }} />
      </div>
    </div>
  );
}
