"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./style.css";
import MostRead from "./most-read";
import AdSlot from "@/components/ad-slot";
import CopyShortlinkButton from "@/components/copy-shortlink-button";
import { SkeletonDetailPage } from "@/components/skeleton-loader";
import { useTranslations } from "@/hooks/use-translations";
import { CardItem, fetchNewsBySlug, postToCard } from "@/lib/cms";
import { useLocale } from "@/hooks/use-locale";

const NewsDetails = ({ slug, categorySlug }: { slug: string; categorySlug?: string }) => {
  const t = useTranslations();
  const { locale } = useLocale();
  const [card, setCard] = useState<CardItem | null | undefined>(undefined);
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const printPreviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchNewsBySlug(slug).then((post) => {
      setCard(post ? postToCard(post, locale, `/news/${categorySlug || "general"}`, 0) : null);
    });
  }, [categorySlug, locale, slug]);

  if (card === undefined) {
    return <SkeletonDetailPage />;
  }

  if (!card) {
    return (
      <section className="MuiBox-root css-1vhc6zl">
        <p className="py-10 text-center text-sm text-gray-500">News not found.</p>
      </section>
    );
  }

  const topAdFallback = (
    <div className="news-details-top-ad-banner">
      <a href="https://business.linkedin.com/advertise/ads/ads-guide" target="_blank" rel="noopener noreferrer">
        <Image src="/banner.gif" alt="Advertisement" width={728} height={90} style={{ width: "100%", height: "auto" }} />
      </a>
    </div>
  );
  const bottomAdFallback = (
    <div className="news-details-ad-banner">
      <a href="https://business.linkedin.com/advertise/ads/ads-guide" target="_blank" rel="noopener noreferrer">
        <Image src="/banner.gif" alt="Advertisement" width={728} height={90} style={{ width: "100%", height: "auto" }} />
      </a>
    </div>
  );
  const sidebarAdFallback = (
    <div className="news-vertical-ad-card">
      <a href="https://business.linkedin.com/advertise/ads/ads-guide" target="_blank" rel="noopener noreferrer">
        <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShaKi7B80ISUUx4uWgEbro_Ih_O37469RI-Q&s" alt="Advertisement" width={300} height={250} style={{ width: "100%", height: "auto" }} />
      </a>
    </div>
  );
  const sidebarAdPosition = card.categorySlug ? `news_category_${card.categorySlug}_detail_sidebar` : "news_detail_sidebar";
  const bottomAdPosition = card.categorySlug ? `news_category_${card.categorySlug}_detail_bottom` : "news_detail_bottom";
  const hasPrintableImage = Boolean(card.src && card.src !== "/logo.png");

  const handlePrint = () => {
    const printContent = printPreviewRef.current;
    if (!printContent) return;

    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) {
      window.print();
      return;
    }

    const escapedTitle = card.title
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <base href="${window.location.origin}" />
          <title>${escapedTitle}</title>
          <style>
            * { box-sizing: border-box; }
            body {
              margin: 0;
              background: #ffffff;
              color: #111111;
              font-family: UbuntuSans, Bornomala, Arial, sans-serif;
            }
            .print-news-document {
              width: min(760px, 100%);
              margin: 0 auto;
              padding: 32px;
            }
            .print-news-logo {
              display: block;
              width: 112px;
              height: auto;
              margin: 0 auto 24px;
            }
            .print-news-heading-row {
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              gap: 24px;
            }
            .print-news-title {
              margin: 0;
              font-size: 30px;
              line-height: 1.35;
            }
            .print-news-date {
              margin: 8px 0 0;
              min-width: 150px;
              text-align: right;
              color: #555555;
              font-size: 14px;
            }
            .print-news-divider {
              border: 0;
              border-top: 1px solid #d9d9d9;
              margin: 22px 0;
            }
            .print-news-thumbnail {
              width: 100%;
              height: auto;
              margin: 0 0 24px;
            }
            .print-news-content {
              font-size: 17px;
              line-height: 1.8;
              text-align: left;
            }
            .print-news-content img {
              max-width: 100%;
              height: auto;
            }
            @page { margin: 20mm 18mm; }
            @media print {
              body {
                padding: 0;
              }
              .print-news-document {
                width: 100%;
                padding: 0.25in;
              }
            }
          </style>
        </head>
        <body>${printContent.innerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    window.setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <>
      <section className="MuiBox-root css-1vhc6zl">
      <div className="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row css-1qkll0f">
        <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-lg-7.7 css-1ezbg89">
          <div className="MuiBox-root css-1fobf8d">
            <h1 className="news-details-title">{card.title}</h1>
            <div className="news-details-meta-row">
              <div className="news-details-meta">
                <span className="news-details-meta-text">{card.date}</span>
                {card.author && (
                  <span className="news-details-meta-text">
                    {t("media.writtenBy")}: {card.author}
                  </span>
                )}
              </div>
              <div className="news-details-print-action">
                <button className="news-print-open-btn" type="button" onClick={() => setIsPrintOpen(true)}>
                  Print News
                </button>
              </div>
            </div>
          </div>

          <div className="news-details-top-image">
            {card.videoEmbedUrl ? (
              <iframe
                src={card.videoEmbedUrl}
                title={card.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ width: "100%", aspectRatio: "16 / 9", border: 0 }}
              />
            ) : (
              <Image
                src={card.src}
                alt={card.alt}
                width={800}
                height={450}
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            )}
          </div>

          <div className="MuiBox-root css-1fobf8d">
            <div
              className="html_Container MuiBox-root css-13l4rt3"
              dangerouslySetInnerHTML={{ __html: card.content || "" }}
            />
          </div>

          {!!card.gallery?.length && (
            <div className="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row css-11d1lw4">
              {card.gallery.map((src, index) => (
                <div
                  key={`${src}-${index}`}
                  className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-sm-6 MuiGrid2-grid-lg-6 css-126rge6"
                >
                  <div className="MuiBox-root css-12gqiy5">
                    <span className="minimal__image__root --loaded css-1cf4ec9">
                      <Image
                        src={src}
                        alt={`${card.title} ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectFit: "cover" }}
                      />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <MostRead slug={categorySlug || "general"} />

          <AdSlot position={bottomAdPosition} className="news-details-ad-banner" width={728} height={90} fallback={bottomAdFallback} />
        </div>

        <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-lg-4.3 css-81xp92">
          <div className="MuiBox-root css-0">
            <div className="MuiBox-root css-zua1x5">
              <p className="MuiTypography-root MuiTypography-body2 css-1lxqr0u">{t("common.share")}</p>
              <div className="MuiStack-root css-1iil1mo">
                <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-3wu3m9" type="button" aria-label="Facebook">
                  <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-4lpd66" focusable="false" aria-hidden="true" viewBox="0 0 20 20" fill="none">
                    <path d="M8.08 11.04H6.1c-.32 0-.42-.12-.42-.42V8.2c0-.32.12-.42.42-.42h1.98V6.02c0-.8.14-1.56.54-2.26.42-.72 1.02-1.24 1.78-1.52.5-.18 1-.22 1.54-.22h1.96c.28 0 .4.12.4.4V4.7c0 .28-.12.4-.4.4-.54 0-1.08 0-1.62.02-.54 0-.82.26-.82.82-.02.6 0 1.18 0 1.8h2.32c.32 0 .44.12.44.44v2.42c0 .32-.1.42-.44.42h-2.32v6.52c0 .34-.1.46-.46.46H8.5c-.3 0-.42-.12-.42-.42v-6.54Z" fill="currentColor" />
                  </svg>
                </button>
                <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-3wu3m9" type="button" aria-label="LinkedIn">
                  <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-4lpd66" focusable="false" aria-hidden="true" viewBox="0 0 20 20" fill="none">
                    <path d="M4.17 7.5h-.42c-.79 0-1.18 0-1.42.25-.24.24-.24.63-.24 1.42v7.08c0 .79 0 1.18.24 1.43.24.24.63.24 1.42.24h.42c.78 0 1.17 0 1.42-.24.24-.25.24-.64.24-1.43V9.17c0-.79 0-1.18-.24-1.42-.25-.25-.64-.25-1.42-.25ZM5.84 3.96A1.88 1.88 0 1 1 2.09 3.96a1.88 1.88 0 0 1 3.75 0ZM9.86 7.5h-.69c-.79 0-1.18 0-1.42.25-.25.24-.25.63-.25 1.42v7.08c0 .79 0 1.18.25 1.43.24.24.63.24 1.42.24h.41c.79 0 1.18 0 1.43-.24.24-.25.24-.64.24-1.43v-2.92c0-1.38.44-2.5 1.74-2.5.65 0 1.18.56 1.18 1.25v3.75c0 .79 0 1.18.24 1.43.24.24.63.24 1.42.24h.42c.78 0 1.17 0 1.42-.24.24-.25.24-.64.24-1.43v-4.58c0-2.07-1.97-3.75-3.92-3.75-1.11 0-2.1.54-2.75 1.4 0-.53 0-.79-.11-.98a.83.83 0 0 0-.3-.3c-.2-.11-.46-.11-.98-.11Z" fill="currentColor" />
                  </svg>
                </button>
                <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-3wu3m9" type="button" aria-label="X">
                  <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-4lpd66" focusable="false" aria-hidden="true" viewBox="0 0 20 20" fill="none">
                    <path d="M1.96 2.32c.14-.27.42-.44.73-.44H6.75c.26 0 .5.13.66.34l10.56 14.62c.18.25.2.58.06.85-.14.27-.42.44-.73.44H13.25c-.26 0-.5-.13-.66-.34L2.03 3.17a.81.81 0 0 1-.07-.85ZM2.11 16.74 16.74 2.12a.81.81 0 1 1 1.15 1.15L3.26 17.89a.81.81 0 1 1-1.15-1.15Z" fill="currentColor" />
                  </svg>
                </button>
                <CopyShortlinkButton
                  shortUrl={card.shortUrl}
                  fallbackPath={card.href}
                  className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-3wu3m9"
                  iconClassName="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-4lpd66"
                />
              </div>
            </div>

            <AdSlot position={sidebarAdPosition} className="news-vertical-ad-card" width={300} height={250} fallback={sidebarAdFallback} />

            <div className="MuiBox-root css-zpnox9">
              <div className="MuiBox-root css-l3ps0i">
                <h3 className="MuiTypography-root MuiTypography-h3 css-s6uijm">{t("common.letsBringChange")}</h3>
                <a className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedWarning MuiButton-sizeLarge MuiButton-containedSizeLarge MuiButton-colorWarning MuiButton-disableElevation MuiButton-fullWidth css-1b9rh8u" href="https://hcsb.org.bd/donate" target="_blank" rel="noopener noreferrer">
                  {t("common.donate")}
                </a>
                <a className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedInherit MuiButton-sizeLarge MuiButton-containedSizeLarge MuiButton-colorInherit MuiButton-disableElevation MuiButton-fullWidth css-mo19c8" href="https://hcsb.org.bd/get-involved" target="_blank" rel="noopener noreferrer">
                  {t("common.volunteer")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
      {isPrintOpen && (
        <div className="news-print-modal" role="dialog" aria-modal="true" aria-label="Print news preview">
          <div className="news-print-modal__backdrop" onClick={() => setIsPrintOpen(false)} />
          <div className="news-print-modal__panel">
            <button className="news-print-modal__close" type="button" aria-label="Close print preview" onClick={() => setIsPrintOpen(false)}>
              x
            </button>
            <div ref={printPreviewRef} className="print-news-document">
              <img className="print-news-logo" src="/logo.png" alt="Mazlum Ummah" />
              <div className="print-news-heading-row">
                <h1 className="print-news-title">{card.title}</h1>
                <p className="print-news-date">{card.date}</p>
              </div>
              <hr className="print-news-divider" />
              {hasPrintableImage && <img className="print-news-thumbnail" src={card.src} alt={card.alt} />}
              <div className="print-news-content" dangerouslySetInnerHTML={{ __html: card.content || "" }} />
            </div>
            <div className="news-print-modal__footer">
              <button className="news-print-submit-btn" type="button" onClick={handlePrint}>
                Print
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsDetails;
