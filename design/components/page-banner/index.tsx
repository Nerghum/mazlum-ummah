"use client";

import React from "react";
import Image from "@/components/ui/blur-image";
import { useTranslations } from "@/hooks/use-translations";
import "./style.css";

const PageBanner = ({
  title,
  subtitle,
  adImageUrl,
  adLinkUrl,
}: {
  title?: string;
  subtitle?: string;
  adImageUrl?: string;
  adLinkUrl?: string;
}) => {
  const t = useTranslations();

  const mobileAdUrl = adImageUrl === "/banner.gif" ? "/mobile-ad.jpeg" : adImageUrl;

  const renderAd = (isDesktop: boolean) => {
    const src = isDesktop ? adImageUrl! : mobileAdUrl!;
    const className = isDesktop ? "page-banner__ad-img page-banner__ad-img-desktop" : "page-banner__ad-img page-banner__ad-img-mobile";
    return (
      <Image
        src={src}
        alt={t("common.advertisement")}
        className={className}
        width={1200}
        height={400}
        unoptimized
        style={{ width: "100%", height: "auto" }}
      />
    );
  };

  return (
    <section className={`page-banner ${title ? "page-banner--has-title" : ""} ${adImageUrl ? "page-banner--has-ad" : ""}`.trim()}>
      {title && <h1 className="page-banner__title">{title}</h1>}

      {subtitle && (
        <div className="page-banner__subtitle-container">
          <p className="page-banner__subtitle">{subtitle}</p>
        </div>
      )}

      {adImageUrl && (
        <div className="page-banner__ad-wrapper">
          <div className="page-banner__ad-container">
            {adLinkUrl ? (
              <a href={adLinkUrl} target="_blank" rel="noopener noreferrer">
                {renderAd(true)}
                {renderAd(false)}
              </a>
            ) : (
              <>
                {renderAd(true)}
                {renderAd(false)}
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default PageBanner;
