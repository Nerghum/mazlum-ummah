"use client";

import { useState, useEffect } from "react";

export function useDelayedMount(delay = 150): boolean {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = setTimeout(() => setLoading(false), prefersReduced ? 0 : delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return loading;
}
