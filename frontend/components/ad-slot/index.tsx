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

  let href = ad.targetUrl || "";
  if (href) {
    if (ad.linkType === 'call') {
      href = href.startsWith('tel:') ? href : `tel:${href.replace(/\\s+/g, '')}`;
    } else if (ad.linkType === 'whatsapp') {
      href = href.startsWith('http') ? href : `https://wa.me/${href.replace(/[^0-9+]/g, '')}`;
    }
  }

  const target = ad.openInNewTab !== false ? "_blank" : undefined;
  const rel = target === "_blank" ? "noopener noreferrer" : undefined;

  return (
    <div className={className}>
      {href ? (
        <a href={href} target={target} rel={rel}>
          {image}
        </a>
      ) : image}
    </div>
  );
};

export default AdSlot;
