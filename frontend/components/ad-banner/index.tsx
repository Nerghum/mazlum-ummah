import React from "react";
import Image from "next/image";
import AdSlot from "@/components/ad-slot";
import "./style.css";

const adLink = "https://business.linkedin.com/advertise/ads/ads-guide";

const fallback = (
    <div className="home-ad-banner">
      <a href={adLink} target="_blank" rel="noopener noreferrer">
        <Image
          src="/banner.gif"
          alt="Advertisement"
          width={728}
          height={90}
          className="ad-banner-desktop"
          unoptimized
        />
        <Image
          src="/mobile-ad.jpeg"
          alt="Advertisement mobile"
          width={320}
          height={100}
          className="ad-banner-mobile"
          unoptimized
        />
      </a>
    </div>
);

const AdBanner = ({ position = "home_banner", showFallback = true }: { position?: string; showFallback?: boolean }) => {
  return (
    <AdSlot
      position={position}
      className="home-ad-banner"
      width={728}
      height={90}
      fallback={showFallback ? fallback : null}
    />
  );
};

export default AdBanner;
