/**
 * Shared motion constant.
 *
 * Section entrances are CSS-driven (`reveal-on-scroll` / `animate-reveal-up`
 * in globals.css), so Framer Motion is only used for the navbar's mobile
 * menu. This easing mirrors --ease-out-soft so the two stay in sync.
 */
export const MOTION_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
