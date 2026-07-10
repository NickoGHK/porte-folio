"use client";

import { useRef } from "react";

type SwipeHandlers = {
  onLeft?: () => void;
  onRight?: () => void;
  onUp?: () => void;
  onDown?: () => void;
};

// Swipe detection for touch devices — a supplement to existing tap controls,
// not a replacement. Swiping left (finger moving toward the left edge)
// reveals the "next" item, matching the universal carousel/photo-viewer
// convention; swiping right reveals "previous". Swiping up is used for
// "close" where wired up (e.g. the gallery, where the close button can sit
// under Chrome's address bar on mobile).
//
// The gesture's axis (horizontal vs. vertical) is locked in on the first
// meaningful movement and held for the rest of the touch — a diagonal drag
// commits to whichever direction it first moved further in, rather than
// being free to fire both a left/right AND an up/down callback. That's the
// difference between "reads as intentional" and "people miss-swipe".
//
// consumeDrag() lets a caller that also has a tap action on the same
// element (e.g. "tap the cover to open the gallery") tell a genuine swipe
// apart from a tap: mobile browsers synthesize a click right after
// touchend on the same element, so checking (and clearing) the flag inside
// that click handler reliably swallows the click when the gesture just
// navigated instead.
export function useSwipe(handlers: SwipeHandlers, threshold = 48, verticalThreshold = 70) {
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const axis = useRef<"x" | "y" | null>(null);
  const dragged = useRef(false);

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
      axis.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }
    if (axis.current) dragged.current = true;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null || startY.current === null) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - startX.current;
    const dy = t.clientY - startY.current;
    const lockedAxis = axis.current;
    startX.current = null;
    startY.current = null;
    axis.current = null;
    if (lockedAxis === "x" && Math.abs(dx) >= threshold) {
      if (dx < 0) handlers.onLeft?.();
      else handlers.onRight?.();
    } else if (lockedAxis === "y" && Math.abs(dy) >= verticalThreshold) {
      if (dy < 0) handlers.onUp?.();
      else handlers.onDown?.();
    }
  };

  const consumeDrag = () => {
    const was = dragged.current;
    dragged.current = false;
    return was;
  };

  return { onTouchStart, onTouchMove, onTouchEnd, consumeDrag };
}
