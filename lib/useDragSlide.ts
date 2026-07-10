"use client";

import { useRef } from "react";

interface DragSlideOptions {
  onCommitLeft?: () => void;
  onCommitRight?: () => void;
  /** Optional: recognizes a downward drag as a distinct gesture (e.g. "close"). */
  onCommitDown?: () => void;
  /** px of horizontal movement to commit a left/right swap instead of springing back. */
  threshold?: number;
  /** Fraction (0–1) of viewport height to drag down before onCommitDown fires instead of springing back. */
  verticalThresholdRatio?: number;
}

const SPRING = "transform 0.32s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.32s ease";
const FLING = "transform 0.2s ease, opacity 0.2s ease";

// Live drag-follow for a swipeable element, imperative (writes straight to
// the DOM via refs, like useScrollFX) so a 60fps finger-drag never round-
// trips through React state. Content tracks the touch 1:1 as it moves;
// releasing past the threshold flings it the rest of the way off and fires
// the commit callback, releasing short of it springs back to rest — the
// same "does this feel grabbable" language as a native carousel or a
// dismissible modal, rather than the swipe being invisible until it's over.
//
// The gesture's axis is locked on its first meaningful movement and held
// for the whole touch: a diagonal drag commits to whichever direction it
// first moved further in, so it can only ever drive ONE of (left/right) or
// (down) — never both, and never the wrong one from a diagonal finger.
//
// `verticalRef` lets the vertical gesture drive a different element than
// the horizontal one (e.g. the whole gallery panel dismisses on swipe-down,
// while only the image card itself pans on swipe left/right) — defaults to
// the same ref when omitted.
export function useDragSlide(
  primaryRef: React.RefObject<HTMLElement | null>,
  options: DragSlideOptions,
  verticalRef?: React.RefObject<HTMLElement | null>
) {
  const { onCommitLeft, onCommitRight, onCommitDown, threshold = 60, verticalThresholdRatio = 0.5 } = options;
  const vRef = verticalRef ?? primaryRef;

  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const axis = useRef<"x" | "y" | null>(null);
  const dragged = useRef(false);

  const resetX = (animate: boolean) => {
    const el = primaryRef.current;
    if (!el) return;
    el.style.transition = animate ? SPRING : "none";
    el.style.transform = "translateX(0)";
    el.style.opacity = "1";
  };

  const resetY = (animate: boolean) => {
    const el = vRef.current;
    if (!el) return;
    el.style.transition = animate ? SPRING : "none";
    el.style.transform = "translateY(0)";
    el.style.opacity = "1";
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    startX.current = t.clientX;
    startY.current = t.clientY;
    axis.current = null;
    // Reset here, not just in consumeDrag(): a swipe with no tap afterward
    // (the common case) would otherwise leave this true forever, and the
    // next unrelated tap's click handler would wrongly read it as a drag.
    dragged.current = false;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (startX.current === null || startY.current === null) return;
    const t = e.touches[0];
    const dx = t.clientX - startX.current;
    const dy = t.clientY - startY.current;
    if (axis.current === null && (Math.abs(dx) > 10 || Math.abs(dy) > 10)) {
      if (Math.abs(dx) > Math.abs(dy)) axis.current = "x";
      else if (onCommitDown && dy > 0) axis.current = "y";
      // An upward-dominant drag, or a downward one with no onCommitDown
      // handler, stays unlocked — not a gesture we handle, so we leave it
      // alone rather than eat the touch.
    }
    if (axis.current === "x") {
      dragged.current = true;
      e.preventDefault();
      const el = primaryRef.current;
      if (el) {
        el.style.transition = "none";
        el.style.transform = `translateX(${dx}px)`;
        el.style.opacity = String(1 - Math.min(0.4, Math.abs(dx) / 500));
      }
    } else if (axis.current === "y") {
      dragged.current = true;
      e.preventDefault();
      const el = vRef.current;
      if (el) {
        // Fades toward ~0.15 opacity as the drag approaches the close
        // threshold, so the window visibly "runs out" — a clearer signal
        // of where the release point is than a flat, capped fade would be.
        const vh = window.innerHeight;
        const progress = Math.min(1, dy / (vh * verticalThresholdRatio));
        el.style.transition = "none";
        el.style.transform = `translateY(${dy}px)`;
        el.style.opacity = String(1 - progress * 0.85);
      }
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null || startY.current === null) {
      axis.current = null;
      return;
    }
    const t = e.changedTouches[0];
    const dx = t.clientX - startX.current;
    const dy = t.clientY - startY.current;
    const lockedAxis = axis.current;
    startX.current = null;
    startY.current = null;
    axis.current = null;

    if (lockedAxis === "x") {
      const commitLeft = dx < 0 && onCommitLeft;
      const commitRight = dx > 0 && onCommitRight;
      if (Math.abs(dx) >= threshold && (commitLeft || commitRight)) {
        const el = primaryRef.current;
        if (el) {
          el.style.transition = FLING;
          el.style.transform = `translateX(${dx < 0 ? -90 : 90}px)`;
          el.style.opacity = "0";
        }
        window.setTimeout(() => {
          if (commitLeft) onCommitLeft?.();
          else onCommitRight?.();
        }, 180);
      } else {
        resetX(true);
      }
    } else if (lockedAxis === "y") {
      const vh = window.innerHeight;
      if (dy >= vh * verticalThresholdRatio && onCommitDown) {
        const el = vRef.current;
        if (el) {
          el.style.transition = FLING;
          el.style.transform = "translateY(100vh)";
          el.style.opacity = "0";
        }
        window.setTimeout(onCommitDown, 190);
      } else {
        resetY(true);
      }
    }
  };

  const consumeDrag = () => {
    const was = dragged.current;
    dragged.current = false;
    return was;
  };

  // Call once the underlying content has actually changed (e.g. after
  // onCommitLeft/Right updates an index) so the freshly-swapped-in content
  // starts from a clean slate — relevant whenever the same DOM node is
  // reused across the change (a swapped `src`) rather than remounted, since
  // it would otherwise still carry the outgoing element's fling-out
  // transform. Fades the new content in rather than just snapping it back.
  const resetAfterCommit = () => {
    const el = primaryRef.current;
    if (!el) return;
    el.style.transition = "none";
    el.style.transform = "translateX(0)";
    el.style.opacity = "0";
    void el.offsetHeight; // force a reflow so the opacity:0 actually applies before we transition off it
    el.style.transition = "opacity 0.25s ease";
    el.style.opacity = "1";
  };

  return { onTouchStart, onTouchMove, onTouchEnd, consumeDrag, resetAfterCommit };
}
