"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import PageBanner from "@/components/page-banner";
import { ChevronRight } from "lucide-react";
import "./style.css";
import { useTranslations } from "@/hooks/use-translations";
import { fetchMediaAchievements, formatCmsDate, mediaUrl, text, type CmsMediaAchievement } from "@/lib/cms";
import { useLocale } from "@/hooks/use-locale";
import { youtubeThumbnailUrl } from "@/lib/video";
import { SkeletonFeatureListContent } from "@/components/skeleton-loader";

const ITEMS_PER_PAGE = 6;

type AchievementCard = {
  type: "photo" | "accent";
  src: string;
  alt: string;
  source: string;
  title: string;
  description: string;
  content: string;
  date: string;
  link: string;
  href: string;
  externalUrl?: string;
};

function achievementToCard(item: CmsMediaAchievement, locale: "en" | "bn", index: number): AchievementCard {
  const videoThumbnail = youtubeThumbnailUrl(item.videoUrl || "");
  return {
    type: item.cardType || "photo",
    src: videoThumbnail || mediaUrl(item.thumbnailImage, index),
    alt: text(item.title, locale),
    source: text(item.source, locale),
    title: text(item.title, locale),
    description: text(item.shortDescription, locale),
    content: text(item.content, locale),
    date: text(item.achievementDate, locale) || formatCmsDate(item.publishDate, locale),
    link: text(item.linkLabel, locale) || (locale === "bn" ? "আরও পড়ুন" : "Read more"),
    href: `/media-achievements/${item.slug}`,
    externalUrl: item.externalUrl,
  };
}

const Achievements = () => {
  const t = useTranslations();
  const { locale } = useLocale();
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<CmsMediaAchievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchMediaAchievements(60)
      .then((data) => {
        setItems(data);
        setCurrentPage(1);
      })
      .finally(() => setLoading(false));
  }, []);

  const allCards = useMemo(() => items.map((item, index) => achievementToCard(item, locale, index)), [items, locale]);
  const featuredCard = allCards.find((_, index) => items[index]?.isFeatured) || allCards[0];
  const totalPages = Math.max(1, Math.ceil(allCards.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageCards = allCards.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  const renderCard = (card: AchievementCard, idx: number) => {
    const CardLink = card.externalUrl || card.href;
    if (card.type === "photo") {
      return (
        <a key={`${card.href}-${idx}`} className="gallery-card gallery-card-photo" href={CardLink} target={card.externalUrl ? "_blank" : undefined} rel={card.externalUrl ? "noopener noreferrer" : undefined}>
          <div className="gallery-card-image-wrapper">
            <Image
              src={card.src}
              alt={card.alt}
              className="gallery-card-image"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="gallery-card-content">
            <h3 className="gallery-card-title">{card.title}</h3>
            <p className="gallery-card-description">{card.description}</p>
            <div className="gallery-card-footer">
              <span>{card.date}</span>
              <span className="gallery-card-link">{card.link}</span>
            </div>
          </div>
        </a>
      );
    }

    return (
      <a key={`${card.href}-${idx}`} className="gallery-card gallery-card-accent" href={CardLink} target={card.externalUrl ? "_blank" : undefined} rel={card.externalUrl ? "noopener noreferrer" : undefined}>
        <div className="accent-decoration"></div>
        <div>
          <h3 className="gallery-card-title title-accent">{card.title}</h3>
          <p className="gallery-card-description description-accent">{card.description}</p>
        </div>
        <div className="gallery-card-footer footer-accent">
          <span>{card.date}</span>
          <span className="gallery-card-link-wrapper">
            {card.link} <ChevronRight size={14} />
          </span>
        </div>
      </a>
    );
  };

  return (
    <>
      <PageBanner
        adPosition="media_achievements_page_banner"
        title={
          <>
            {t("media.creatingHeadlines")}
            <br />
            {t("media.buildingDigitalAge")}
          </>
        }
        subtitle={t("media.description")}
      />

      {loading ? (
        <SkeletonFeatureListContent />
      ) : (
      <main className="container main-content">
        {featuredCard && <section className="feature-card">
          <div className="feature-grid">
            <div className="feature-image-wrapper">
              <Image
                src={featuredCard.src}
                alt={featuredCard.alt || t("media.featureCoverage")}
                className="feature-image"
                fill
                sizes="(max-width: 1023px) 100vw, 45vw"
                style={{ objectFit: "cover" }}
              />
              <div className="feature-image-overlay"></div>
            </div>

            <div className="feature-text-wrapper">
              <div>
                <h2 className="feature-headline">
                  {featuredCard.title}
                </h2>
                <p className="feature-description">
                  {featuredCard.description || featuredCard.content.replace(/<[^>]+>/g, "").slice(0, 180)}
                </p>
              </div>

              <div className="feature-footer">
                <span className="feature-author">{featuredCard.source || t("media.featureCoverage")}</span>
                <a href={featuredCard.externalUrl || featuredCard.href} target={featuredCard.externalUrl ? "_blank" : undefined} rel={featuredCard.externalUrl ? "noopener noreferrer" : undefined} className="feature-link">
                  {t("common.read")}
                  <ChevronRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>}

        <section className="gallery-grid">
          {pageCards.length ? (() => {
            const photos = pageCards.filter((c) => c.type === "photo");
            const accents = pageCards.filter((c) => c.type === "accent");
            const rows: AchievementCard[][] = [];
            const maxLen = Math.max(photos.length, accents.length);
            for (let i = 0; i < maxLen; i += 3) {
              if (i < photos.length) rows.push(photos.slice(i, i + 3));
              if (i < accents.length) rows.push(accents.slice(i, i + 3));
            }
            return rows.flat().map((card, idx) => renderCard(card, idx));
          })() : <p className="py-10 text-center text-sm text-gray-500">No media achievements found.</p>}
        </section>

        <nav
          aria-label="pagination navigation"
          className="MuiPagination-root MuiPagination-text css-13jb70f"
        >
          <ul className="MuiPagination-ul css-51eq8m">
            <li>
              <button
                className={`MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-sizeMedium MuiPaginationItem-text MuiPaginationItem-circular MuiPaginationItem-colorPrimary MuiPaginationItem-textPrimary MuiPaginationItem-previousNext css-ekx01y ${currentPage === 1 ? "Mui-disabled" : ""}`}
                tabIndex={0}
                type="button"
                onClick={handlePrev}
                disabled={currentPage === 1}
                aria-label="Go to previous page"
              >
                <svg
                  className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiPaginationItem-icon css-1djyyjn"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="NavigateBeforeIcon"
                >
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
                </svg>
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li key={page}>
                <button
                  className={`MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-sizeMedium MuiPaginationItem-text MuiPaginationItem-circular MuiPaginationItem-colorPrimary MuiPaginationItem-textPrimary MuiPaginationItem-page css-ekx01y ${page === currentPage ? "Mui-selected" : ""}`}
                  tabIndex={0}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  aria-label={`page ${page}`}
                  aria-current={page === currentPage ? "page" : undefined}
                >
                  {page}
                </button>
              </li>
            ))}
            <li>
              <button
                className={`MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-sizeMedium MuiPaginationItem-text MuiPaginationItem-circular MuiPaginationItem-colorPrimary MuiPaginationItem-textPrimary MuiPaginationItem-previousNext css-ekx01y ${currentPage === totalPages ? "Mui-disabled" : ""}`}
                tabIndex={0}
                type="button"
                onClick={handleNext}
                disabled={currentPage === totalPages}
                aria-label="Go to next page"
              >
                <svg
                  className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiPaginationItem-icon css-1djyyjn"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="NavigateNextIcon"
                >
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </main>
      )}
    </>
  );
};

export default Achievements;
