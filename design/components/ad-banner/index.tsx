import React from "react";
import Image from "@/components/ui/blur-image";
import "./style.css";

const adLink = "https://business.linkedin.com/advertise/ads/ads-guide";

const AdBanner = () => {
  return (
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
};

export default AdBanner;
