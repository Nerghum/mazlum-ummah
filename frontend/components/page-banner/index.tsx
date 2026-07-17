"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "@/hooks/use-translations";
import { useLocale } from "@/hooks/use-locale";
import { CmsAd, adImageUrl, fetchAds, fetchCategory, mediaUrl, categoryName } from "@/lib/cms";
import Hero from "@/components/hero";
import "./style.css";

const PageBanner = ({
  title,
  subtitle,
  adPosition,
  bgImage = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
  showFallbackAd = false,
  categoryType,
  categorySlug,
}: {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  adPosition?: string;
  bgImage?: string;
  showFallbackAd?: boolean;
  categoryType?: "news" | "blog";
  categorySlug?: string;
}) => {
  const t = useTranslations();
  const { locale } = useLocale();
  const [ad, setAd] = useState<CmsAd | null | undefined>(undefined);
  const [categoryBannerUrl, setCategoryBannerUrl] = useState<string | null>(null);
  const [fetchedTitle, setFetchedTitle] = useState<string | null>(null);
  const [fetchedSubtitle, setFetchedSubtitle] = useState<string | null>(null);

  useEffect(() => {
    if (adPosition) {
      fetchAds(adPosition, 1).then((items) => setAd(items[0] || null));
    } else {
      setAd(null);
    }
  }, [adPosition]);

  useEffect(() => {
    if (!categoryType || !categorySlug) return;
    let mounted = true;
    fetchCategory(categoryType, categorySlug).then((category) => {
      if (!mounted) return;
      const url = mediaUrl(category?.bannerImage || category?.image, 0);
      if (url && url !== "/logo.png") {
        setCategoryBannerUrl(url);
      }
      if (category) {
        const pTitle = locale === "bn" ? (category.pageTitleBn || category.pageTitle) : (category.pageTitle || category.pageTitleBn);
        const pSubtitle = locale === "bn" ? (category.pageSubtitleBn || category.pageSubtitle) : (category.pageSubtitle || category.pageSubtitleBn);
        setFetchedTitle(pTitle || categoryName(category, locale));
        setFetchedSubtitle(pSubtitle || category.description || null);
      }
    });
    return () => {
      mounted = false;
    };
  }, [categorySlug, categoryType, locale]);

  if (ad === undefined) return null; // loading state

  const displayTitle = fetchedTitle || title;
  const displaySubtitle = fetchedSubtitle || subtitle;

  const hasAd = ad && ad.media?.url;

  if (hasAd || showFallbackAd) {
    const src = hasAd ? adImageUrl(ad) : "/banner.gif";
    const alt = hasAd ? (ad.altText || ad.title || t("common.advertisement")) : t("common.advertisement");
    const linkUrl = hasAd ? ad.targetUrl : "https://business.linkedin.com/advertise/ads/ads-guide";
    const className = "page-banner__ad-img page-banner__ad-img-desktop";
    const mobileClassName = "page-banner__ad-img page-banner__ad-img-mobile";
    const mobileSrc = (showFallbackAd && !hasAd) ? "/mobile-ad.jpeg" : src; // simple fallback logic

    const renderImg = (isDesktop: boolean) => (
      <Image
        src={isDesktop ? src : mobileSrc}
        alt={alt}
        className={isDesktop ? className : mobileClassName}
        width={1200}
        height={400}
        unoptimized
        style={{ width: "100%", height: "auto" }}
      />
    );

    const content = (
      <>
        {renderImg(true)}
        {renderImg(false)}
      </>
    );

    const customBg = categoryBannerUrl ? { backgroundImage: `linear-gradient(90deg, #000000, #0f172a00, #00000000), url("${categoryBannerUrl}")` } : {};

    return (
      <section className="page-banner page-banner--has-ad" style={customBg}>
        <div className="page-banner__ad-wrapper">
          <div className="page-banner__ad-container">
            {linkUrl ? (
              <a href={linkUrl} target="_blank" rel="noopener noreferrer">
                {content}
              </a>
            ) : (
              content
            )}
          </div>
        </div>
      </section>
    );
  }

  // Fallback: render the standard text banner (Hero style)
  return (
    <Hero
      image={categoryBannerUrl || bgImage}
      imageAlt={typeof displayTitle === "string" ? displayTitle : "Banner"}
      title={displayTitle}
      description={displaySubtitle}
      compact
    />
  );
};

export default PageBanner;
