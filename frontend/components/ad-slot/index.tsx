"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { CmsAd, adImageUrl, fetchAds, mediaUrl } from "@/lib/cms";

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

  const desktopSrc = adImageUrl(ad);
  const mobileSrc = ad.mobileMedia?.url ? mediaUrl(ad.mobileMedia) : desktopSrc;

  const image = (
    <>
      <img
        src={desktopSrc}
        alt={ad.altText || ad.title || "Advertisement"}
        className={`${imageClassName || ""} ad-banner-desktop`.trim()}
        width={width}
        height={height}
      />
      <img
        src={mobileSrc}
        alt={ad.altText || ad.title || "Advertisement mobile"}
        className={`${imageClassName || ""} ad-banner-mobile`.trim()}
        width={width}
        height={height}
      />
    </>
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
