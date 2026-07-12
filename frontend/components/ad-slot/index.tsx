"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { CmsAd, adImageUrl, fetchAds } from "@/lib/cms";

type AdSlotProps = {
  position: string;
  className?: string;
  imageClassName?: string;
  width?: number;
  height?: number;
  fallback?: ReactNode;
};

const AdSlot = ({ position, className, imageClassName, width = 728, height = 90, fallback }: AdSlotProps) => {
  const [ad, setAd] = useState<CmsAd | null | undefined>(undefined);

  useEffect(() => {
    fetchAds(position, 1).then((items) => setAd(items[0] || null));
  }, [position]);

  if (ad === undefined) return fallback ? <>{fallback}</> : null;
  if (!ad?.media?.url) return fallback ? <>{fallback}</> : null;

  const image = (
    <img
      src={adImageUrl(ad)}
      alt={ad.altText || ad.title || "Advertisement"}
      className={imageClassName}
      width={width}
      height={height}
    />
  );

  return (
    <div className={className}>
      {ad.targetUrl ? (
        <a href={ad.targetUrl} target="_blank" rel="noopener noreferrer">
          {image}
        </a>
      ) : image}
    </div>
  );
};

export default AdSlot;
