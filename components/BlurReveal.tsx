"use client";

import { useEffect, useRef, useState } from "react";

type Tag = "h1" | "h2" | "h3" | "p" | "div" | "span";

// Scroll-linked text reveal: fade + rise in when scrolled into view, fade +
// sink back out when scrolled away — symmetric in both directions, not a
// one-shot entrance. Staggered per word. Plain CSS keyframes (wordRiseIn /
// wordSinkOut in globals.css), no animation library.
export default function BlurReveal({
  text,
  as = "div",
  delay = 70,
  duration = 1.1,
  className,
  style,
}: {
  text: string;
  as?: Tag;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const Tag = as;
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const everVisibleRef = useRef(false);
  const [playKey, setPlayKey] = useState(0);
  const prevText = useRef(text);

  useEffect(() => {
    if (visible) everVisibleRef.current = true;
  }, [visible]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (prevText.current !== text) {
      prevText.current = text;
      if (visible) setPlayKey((k) => k + 1);
    }
  }, [text, visible]);

  const words = text.split(" ");

  const wordStyle = (i: number): React.CSSProperties => {
    // white-space: pre is load-bearing — an inline-block establishes its own
    // line box for whitespace-collapsing purposes, so the trailing space
    // after each word gets silently trimmed at render time without this,
    // running every word together.
    if (!visible && !everVisibleRef.current) {
      // never entered view yet — sit statically hidden, no animation to play
      return { display: "inline-block", whiteSpace: "pre", opacity: 0, transform: "translateY(26px)" };
    }
    return {
      display: "inline-block",
      whiteSpace: "pre",
      animation: `${visible ? "wordRiseIn" : "wordSinkOut"} ${duration}s cubic-bezier(0.39, 0.575, 0.565, 1) ${i * delay}ms both`,
    };
  };

  return (
    <Tag ref={ref as React.RefObject<never>} className={className} style={{ display: "flex", flexWrap: "wrap", ...style }}>
      {words.map((word, i) => (
        <span key={`${playKey}-${i}`} style={wordStyle(i)}>
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
