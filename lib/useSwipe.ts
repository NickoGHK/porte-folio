"use client";

import { useRef } from "react";

// Horizontal swipe detection for touch devices — a supplement to existing
// tap controls, not a replacement. Swiping left (finger moving toward the
// left edge) reveals the "next" item, matching the universal carousel/photo
// -viewer convention; swiping right reveals "previous".
//
// consumeDrag() lets a caller that also has a tap action on the same
// element (e.g. "tap the cover to open the gallery") tell a genuine swipe
// apart from a tap: mobile browsers synthesize a click right after
// touchend on the same element, so checking (and clearing) the flag inside
// that click handler reliably swallows the click when the gesture just
// navigated instead.
export function useSwipe(onSwipeLeft: () => void, onSwipeRight: () => void, threshold = 48) {
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const dragged = useRef(false);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    startX.current = t.clientX;
    startY.current = t.clientY;
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
    if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) dragged.current = true;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    startX.current = null;
    startY.current = null;
    if (Math.abs(dx) >= threshold) {
      if (dx < 0) onSwipeLeft();
      else onSwipeRight();
    }
  };

  const consumeDrag = () => {
    const was = dragged.current;
    dragged.current = false;
    return was;
  };

  return { onTouchStart, onTouchMove, onTouchEnd, consumeDrag };
}
