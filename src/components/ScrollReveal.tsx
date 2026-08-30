"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Renders nothing. It exists so the reveal observer — which touches the DOM —
 * can run inside a client boundary while the pages themselves stay server
 * components. It remounts on every route change, which re-queries `.reveal`
 * for the page that just arrived.
 */
const ScrollReveal = () => {
  useScrollReveal();
  return null;
};

export default ScrollReveal;
