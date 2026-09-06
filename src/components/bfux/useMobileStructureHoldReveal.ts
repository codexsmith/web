"use client";

import { useEffect } from "react";

const mobileHoldQuery = "(max-width: 768px) and (pointer: coarse)";
const explicitControlSelector = 'a, button, input, select, textarea, summary, [contenteditable="true"]';
const holdDelayMs = 260;
const movementResetThreshold = 10;
const clickSuppressionWindowMs = 700;

type Options = {
  targetSelector: string;
  enabled?: boolean;
  onTransientChange: (active: boolean) => void;
};

function findTouch(touches: TouchList, identifier: number) {
  for (let index = 0; index < touches.length; index += 1) {
    const touch = touches.item(index);
    if (touch?.identifier === identifier) return touch;
  }
  return null;
}

/**
 * Mobile apparatus gesture:
 *
 * - A stationary press reveals structure after a short hold.
 * - Movement before reveal restarts the timer, so a user can scroll first and
 *   reveal by pausing without lifting their finger.
 * - Once revealed, native vertical scrolling remains untouched until release.
 * - The click synthesized after a successful hold is suppressed so holding a
 *   tappable apparatus card does not accidentally navigate into it.
 *
 * The visible Reveal control remains the canonical, accessibility-safe way to
 * latch the same structural state open.
 */
export function useMobileStructureHoldReveal({
  targetSelector,
  enabled = true,
  onTransientChange,
}: Options) {
  useEffect(() => {
    if (!enabled) {
      onTransientChange(false);
      return;
    }

    const target = document.querySelector<HTMLElement>(targetSelector);
    if (!target) return;

    let holdTimer: number | null = null;
    let suppressionTimer: number | null = null;
    let activeTouchId: number | null = null;
    let lastX = 0;
    let lastY = 0;
    let activated = false;
    let suppressNextClick = false;

    const clearHoldTimer = () => {
      if (holdTimer === null) return;
      window.clearTimeout(holdTimer);
      holdTimer = null;
    };

    const clearSuppressionTimer = () => {
      if (suppressionTimer === null) return;
      window.clearTimeout(suppressionTimer);
      suppressionTimer = null;
    };

    const scheduleReveal = () => {
      clearHoldTimer();
      holdTimer = window.setTimeout(() => {
        holdTimer = null;
        if (activeTouchId === null) return;
        activated = true;
        onTransientChange(true);
      }, holdDelayMs);
    };

    const armClickSuppression = () => {
      suppressNextClick = true;
      clearSuppressionTimer();
      suppressionTimer = window.setTimeout(() => {
        suppressNextClick = false;
        suppressionTimer = null;
      }, clickSuppressionWindowMs);
    };

    const endGesture = (suppressClick: boolean) => {
      clearHoldTimer();
      if (activated) onTransientChange(false);
      activated = false;
      activeTouchId = null;
      if (suppressClick) armClickSuppression();
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (!window.matchMedia(mobileHoldQuery).matches || event.touches.length !== 1) return;
      const origin = event.target;
      if (origin instanceof Element && origin.closest(explicitControlSelector)) return;

      const touch = event.touches.item(0);
      if (!touch) return;

      clearSuppressionTimer();
      suppressNextClick = false;
      activeTouchId = touch.identifier;
      lastX = touch.clientX;
      lastY = touch.clientY;
      activated = false;
      scheduleReveal();
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (activeTouchId === null || activated) return;
      const touch = findTouch(event.touches, activeTouchId);
      if (!touch) return;

      const distance = Math.hypot(touch.clientX - lastX, touch.clientY - lastY);
      if (distance < movementResetThreshold) return;

      lastX = touch.clientX;
      lastY = touch.clientY;
      scheduleReveal();
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (activeTouchId === null || findTouch(event.touches, activeTouchId)) return;
      endGesture(activated);
    };

    const handleTouchCancel = () => {
      if (activeTouchId === null) return;
      endGesture(false);
    };

    const handleClickCapture = (event: MouseEvent) => {
      if (!suppressNextClick) return;
      suppressNextClick = false;
      clearSuppressionTimer();
      event.preventDefault();
      event.stopPropagation();
    };

    const handleContextMenu = (event: MouseEvent) => {
      if (activated) event.preventDefault();
    };

    target.addEventListener("touchstart", handleTouchStart, { passive: true });
    target.addEventListener("touchmove", handleTouchMove, { passive: true });
    target.addEventListener("touchend", handleTouchEnd, { passive: true });
    target.addEventListener("touchcancel", handleTouchCancel, { passive: true });
    target.addEventListener("click", handleClickCapture, true);
    target.addEventListener("contextmenu", handleContextMenu, true);

    return () => {
      clearHoldTimer();
      clearSuppressionTimer();
      if (activated) onTransientChange(false);
      target.removeEventListener("touchstart", handleTouchStart);
      target.removeEventListener("touchmove", handleTouchMove);
      target.removeEventListener("touchend", handleTouchEnd);
      target.removeEventListener("touchcancel", handleTouchCancel);
      target.removeEventListener("click", handleClickCapture, true);
      target.removeEventListener("contextmenu", handleContextMenu, true);
    };
  }, [enabled, onTransientChange, targetSelector]);
}
