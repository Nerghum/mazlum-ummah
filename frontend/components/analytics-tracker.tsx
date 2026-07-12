"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";
const VISITOR_KEY = "mazlum_ummah_visitor_id";

function visitorId() {
  const existing = localStorage.getItem(VISITOR_KEY);
  if (existing) return existing;

  const value = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  localStorage.setItem(VISITOR_KEY, value);
  return value;
}

const AnalyticsTracker = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;

    const search = searchParams.toString();
    const path = search ? `${pathname}?${search}` : pathname;
    const payload = {
      path,
      title: document.title,
      referrer: document.referrer,
      visitorId: visitorId(),
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screen: {
        width: window.screen.width,
        height: window.screen.height,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
      },
    };

    const body = JSON.stringify(payload);
    const url = `${API_URL}/analytics/track`;

    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
      return;
    }

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  }, [pathname, searchParams]);

  return null;
};

export default AnalyticsTracker;

