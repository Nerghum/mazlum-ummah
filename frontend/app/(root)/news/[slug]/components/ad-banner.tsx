import React from "react";
import Image from "next/image";
import AdSlot from "@/components/ad-slot";

const testAdImage = "https://ps.w.org/adrotate/assets/banner-1544x500.jpg?rev=3117289";
const testAdLink = "https://business.linkedin.com/advertise/ads/ads-guide";

const AdBanner = () => {
  const fallback = (
    <div className="news-list-ad-banner">
      <a href={testAdLink} target="_blank" rel="noopener noreferrer">
        <Image
          src={testAdImage}
          alt="Advertisement"
          width={1544}
          height={500}
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        />
      </a>
    </div>
  );
  return <AdSlot position="news_list_inline" className="news-list-ad-banner" width={1544} height={500} fallback={fallback} />;
};

export default AdBanner;
