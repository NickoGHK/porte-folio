// Deterministic star-field generator — same Lehmer/Park-Miller PRNG as the
// design reference's makeStars(), so output is stable between server and
// client renders (no hydration mismatch) while still looking "random".

export type Star = {
  key: number;
  left: string;
  top: string;
  size: number;
  background: string;
  opacity: number;
  glow: boolean;
  animationDelay?: string;
  animationDuration?: string;
};

export function generateStars(seed: number, count: number, twinkle: boolean): Star[] {
  let s = seed;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };

  const out: Star[] = [];
  for (let i = 0; i < count; i++) {
    let size = 1 + rand() * 2.4;
    const left = (rand() * 100).toFixed(2) + "%";
    const top = (rand() * 100).toFixed(2) + "%";
    const background = rand() > 0.85 ? "#FFD9A0" : "#EFE9FF";
    const opacity = 0.25 + rand() * 0.6;
    let glow = false;
    if (rand() > 0.92) {
      glow = true;
      size = 2.6 + rand() * 1.6;
    }
    const star: Star = { key: i, left, top, size, background, opacity, glow };
    if (twinkle) {
      star.animationDuration = (2 + rand() * 4).toFixed(1) + "s";
      star.animationDelay = (rand() * 4).toFixed(1) + "s";
    }
    out.push(star);
  }
  return out;
}
