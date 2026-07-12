"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "@/hooks/use-translations";
import AdSlot from "@/components/ad-slot";
import { fetchCategory, mediaUrl } from "@/lib/cms";
import "./style.css";

const PageBanner = ({
  title,
  subtitle,
  adImageUrl,
  adLinkUrl,
  adPosition,
  categoryType,
  categorySlug,
}: {
  title?: string;
  subtitle?: string;
  adImageUrl?: string;
  adLinkUrl?: string;
  adPosition?: string;
  categoryType?: "news" | "blog";
  categorySlug?: string;
}) => {
  const t = useTranslations();
  const [categoryBannerUrl, setCategoryBannerUrl] = React.useState("");

  React.useEffect(() => {
    if (!categoryType || !categorySlug) return;

    let mounted = true;
    fetchCategory(categoryType, categorySlug).then((category) => {
      if (!mounted) return;
      setCategoryBannerUrl(mediaUrl(category?.bannerImage || category?.image, 0));
    });

    return () => {
      mounted = false;
    };
  }, [categorySlug, categoryType]);

  const bannerStyle = categoryBannerUrl && categoryBannerUrl !== "/logo.png"
    ? {
        backgroundImage: `linear-gradient(0deg, rgba(37, 52, 45, 0.85) 0%, rgba(37, 52, 45, 0.85) 100%), url("${categoryBannerUrl}")`,
      }
    : undefined;

  const fallbackAdContent = adImageUrl ? (
    adLinkUrl ? (
      <a href={adLinkUrl} target="_blank" rel="noopener noreferrer">
        <Image
          src={adImageUrl}
          alt={t("common.advertisement")}
          className="page-banner__ad-img"
          width={1200}
          height={400}
          style={{ width: "100%", height: "auto" }}
        />
      </a>
    ) : (
      <Image
        src={adImageUrl}
        alt={t("common.advertisement")}
        className="page-banner__ad-img"
        width={1200}
        height={400}
        style={{ width: "100%", height: "auto" }}
      />
    )
  ) : null;
  const fallbackAd = fallbackAdContent ? (
    <div className="page-banner__ad-wrapper">
      <div className="page-banner__ad-container">{fallbackAdContent}</div>
    </div>
  ) : null;

  return (
    <section className="page-banner" style={bannerStyle}>
      <div className="page-banner__container">
        {(title || subtitle) && (
          <div className="page-banner__text">
            {title && <h1 className="page-banner__title">{title}</h1>}

            {subtitle && (
              <div className="page-banner__subtitle-container">
                <p className="page-banner__subtitle">{subtitle}</p>
              </div>
            )}
          </div>
        )}

        {adPosition ? (
          <div className="page-banner__ad-wrapper">
            <div className="page-banner__ad-container">
              <AdSlot position={adPosition} imageClassName="page-banner__ad-img" width={1200} height={400} fallback={fallbackAdContent} />
            </div>
          </div>
        ) : fallbackAd}
      </div>
    </section>
  );
};

export default PageBanner;
