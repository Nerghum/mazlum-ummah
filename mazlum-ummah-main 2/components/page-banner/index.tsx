"use client";

import React from "react";
import Image from "next/image";
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
  adMobileImageUrl?: string;
  adLinkUrl?: string;
}) => {
  const t = useTranslations();

  return (
    <section className="page-banner">
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
                {adMobileImageUrl && (
                  <Image
                    src={adMobileImageUrl}
                    alt={t("common.advertisement") as string}
                    className="page-banner__ad-img sm:hidden"
                    width={1200}
                    height={400}
                    unoptimized
                    style={{ width: "100%", height: "auto" }}
                  />
                )}
                <Image
                  src={adImageUrl}
                  alt={t("common.advertisement") as string}
                  className={`page-banner__ad-img ${adMobileImageUrl ? 'hidden sm:block' : ''}`}
                  width={1200}
                  height={400}
                  unoptimized
                  style={{ width: "100%", height: "auto" }}
                />
              </a>
            ) : (
              <>
                {adMobileImageUrl && (
                  <Image
                    src={adMobileImageUrl}
                    alt={t("common.advertisement") as string}
                    className="page-banner__ad-img sm:hidden"
                    width={1200}
                    height={400}
                    style={{ width: "100%", height: "auto" }}
                  />
                )}
                <Image
                  src={adImageUrl}
                  alt={t("common.advertisement") as string}
                  className={`page-banner__ad-img ${adMobileImageUrl ? 'hidden sm:block' : ''}`}
                  width={1200}
                  height={400}
                  style={{ width: "100%", height: "auto" }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default PageBanner;
