import { generateStars, type Star } from "@/lib/stars";

// Split by size into three depth planes — small/dim stars read as distant
// background, large/glow stars as close foreground. Each plane gets its own
// mouse-parallax velocity, so cursor movement reveals genuine depth instead
// of the whole field drifting as one flat sheet.
const DEPTH_LAYERS = [
  { maxSize: 2.0, strength: 0.006 },
  { maxSize: 3.0, strength: 0.016 },
  { maxSize: Infinity, strength: 0.03 },
];

export default function StarField({
  seed,
  count = 150,
  twinkle = true,
}: {
  seed: number;
  count?: number;
  twinkle?: boolean;
}) {
  const stars = generateStars(seed, count, twinkle);
  const layers: Star[][] = DEPTH_LAYERS.map(() => []);
  for (const star of stars) {
    const layerIndex = DEPTH_LAYERS.findIndex((l) => star.size <= l.maxSize);
    layers[layerIndex === -1 ? DEPTH_LAYERS.length - 1 : layerIndex].push(star);
  }

  return (
    <>
      {DEPTH_LAYERS.map((layer, i) => (
        <div key={i} data-mouse-parallax={layer.strength} style={{ position: "absolute", inset: 0 }}>
          {layers[i].map((star) => (
            <div
              key={star.key}
              style={{
                position: "absolute",
                left: star.left,
                top: star.top,
                width: `${star.size.toFixed(1)}px`,
                height: `${star.size.toFixed(1)}px`,
                borderRadius: "50%",
                background: star.background,
                opacity: star.opacity,
                boxShadow: star.glow ? "0 0 8px 2px rgba(255, 240, 214, 0.7)" : undefined,
                animation: star.animationDuration ? `twinkle ${star.animationDuration} ease-in-out ${star.animationDelay} infinite` : undefined,
              }}
            />
          ))}
        </div>
      ))}
    </>
  );
}
