"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { fetchShortlinkTarget } from "@/lib/cms";

type ShortlinkRedirectProps = {
  shortCode: string;
};

async function fetchSameOriginTarget(shortCode: string) {
  try {
    const response = await fetch(`/api/v1/public/shortlinks/${encodeURIComponent(shortCode)}`, {
      cache: "no-store",
    });
    if (!response.ok) return null;
    const json = await response.json();
    return json.data?.url ? json.data : null;
  } catch {
    return null;
  }
}

const ShortlinkRedirect = ({ shortCode }: ShortlinkRedirectProps) => {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function resolve() {
      const target = await fetchShortlinkTarget(shortCode) || await fetchSameOriginTarget(shortCode);

      if (target?.url) {
        window.location.replace(target.url);
        return;
      }

      if (isMounted) setFailed(true);
    }

    resolve();

    return () => {
      isMounted = false;
    };
  }, [shortCode]);

  if (failed) {
    notFound();
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 text-center">
      <p className="text-sm text-slate-500">Opening link...</p>
    </main>
  );
};

export default ShortlinkRedirect;

