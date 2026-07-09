const GRAIN_SVG =
  "data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%27180%27%20height=%27180%27%3E%3Cfilter%20id=%27n%27%3E%3CfeTurbulence%20type=%27fractalNoise%27%20baseFrequency=%270.9%27%20numOctaves=%272%27%20stitchTiles=%27stitch%27/%3E%3CfeColorMatrix%20type=%27saturate%27%20values=%270%27/%3E%3C/filter%3E%3Crect%20width=%27180%27%20height=%27180%27%20filter=%27url%28%23n%29%27%20opacity=%270.55%27/%3E%3C/svg%3E";

export default function GrainOverlay() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${GRAIN_SVG})`,
        backgroundSize: "180px 180px",
        opacity: 0.07,
        pointerEvents: "none",
      }}
    />
  );
}
