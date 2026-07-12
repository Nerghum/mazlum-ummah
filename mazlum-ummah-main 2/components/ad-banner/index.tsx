import React from "react";
import Image from "next/image";
import "./style.css";

const AdBanner = ({
  adImageUrl = "/banner.gif",
  adMobileImageUrl,
  adLinkUrl = "https://business.linkedin.com/advertise/ads/ads-guide",
}: {
  adImageUrl?: string;
  adMobileImageUrl?: string;
  adLinkUrl?: string;
}) => {
  return (
    <div className="home-ad-banner">
      <a href={adLinkUrl} target="_blank" rel="noopener noreferrer">
        {adMobileImageUrl && (
          <Image
            src={adMobileImageUrl}
            alt="Advertisement"
            width={728}
            height={90}
            className="sm:hidden"
            style={{ width: "100%", height: "100%" }}
            unoptimized
          />
        )}
        <Image
          src={adImageUrl}
          alt="Advertisement"
          width={728}
          height={90}
          className={adMobileImageUrl ? "hidden sm:block" : ""}
          style={{ width: "100%", height: "100%" }}
          unoptimized
        />
      </a>
    </div>
  );
};

export default AdBanner;
