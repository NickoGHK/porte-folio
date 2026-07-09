import { generateStars } from "@/lib/stars";

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

  return (
    <>
      {stars.map((star) => (
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
            animation: star.animationDuration
              ? `twinkle ${star.animationDuration} ease-in-out ${star.animationDelay} infinite`
              : undefined,
          }}
        />
      ))}
    </>
  );
}
