"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Hero from "@/components/hero";
import AdBanner from "@/components/ad-banner";
import { ChevronRight } from "lucide-react";
import "./style.css";
import Link from "next/link";
import { SkeletonBlogListPage } from "@/components/skeleton-loader";
import { useTranslations } from "@/hooks/use-translations";
import { CardItem, fetchBlogs, fetchBlogsByCategory, postToCard } from "@/lib/cms";
import { useLocale } from "@/hooks/use-locale";

const ITEMS_PER_PAGE = 6;

const BlogList = ({ categorySlug }: { categorySlug?: string }) => {
  const t = useTranslations();
  const { locale } = useLocale();
  const [currentPage, setCurrentPage] = useState(1);
  const [dynamicCards, setDynamicCards] = useState<CardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    const loadingTimer = window.setTimeout(() => {
      if (isActive) {
        setIsLoading(true);
      }
    }, 0);
    const request = categorySlug ? fetchBlogsByCategory(categorySlug, 60) : fetchBlogs(60);
    request.then((posts) => {
      if (!isActive) return;
      setDynamicCards(posts.map((post, index) => postToCard(post, locale, "/blogs", index)));
      setCurrentPage(1);
    }).finally(() => {
      if (isActive) {
        setIsLoading(false);
      }
    });
    return () => {
      isActive = false;
      window.clearTimeout(loadingTimer);
    };
  }, [categorySlug, locale]);

  const allCards = useMemo(
    () => dynamicCards.map((card, index) => ({ ...card, type: (index % 2 === 0 ? "photo" : "accent") as "photo" | "accent", description: card.excerpt })),
    [dynamicCards]
  );

  const totalPages = Math.max(1, Math.ceil(allCards.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageCards = allCards.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const featuredBlog = allCards[0];

  if (isLoading) {
    return <SkeletonBlogListPage />;
  }

  const renderCard = (card: (typeof allCards)[number], idx: number) => {
    if (card.type === "photo") {
      return (
        <div key={idx} className="gallery-card gallery-card-photo">
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
              <Link href={card.href} className="gallery-card-link">
                {t("common.details")}
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div key={idx} className="gallery-card gallery-card-accent">
        <div className="accent-decoration"></div>
        <div>
          <h3 className="gallery-card-title title-accent">{card.title}</h3>
          <p className="gallery-card-description description-accent">{card.description}</p>
        </div>
        <div className="gallery-card-footer footer-accent">
          <span>{card.date}</span>
          <Link
            href={card.href}
            className="gallery-card-link-wrapper"
            style={{ textDecoration: "none" }}
          >
            {t("common.details")} <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <>
      <Hero
        image={featuredBlog?.src || "/logo.png"}
        imageAlt={featuredBlog?.alt || "Blog"}
        badge={t("blog.badge")}
        title={featuredBlog?.title || ""}
        description={featuredBlog?.excerpt || ""}
        compact
      />

      <main className="container main-content">
        {pageCards[0] && <Link href={pageCards[0].href} style={{ textDecoration: "none" }}>
          <section className="feature-card">
            <div className="feature-grid">
              <div className="feature-image-wrapper">
                <Image
                  src={pageCards[0].src}
                  alt={pageCards[0].alt}
                  className="feature-image"
                  fill
                  sizes="(max-width: 1023px) 100vw, 45vw"
                  style={{ objectFit: "cover" }}
                />
                <div className="feature-image-overlay"></div>
              </div>

              <div className="feature-text-wrapper">
                <div>
                  <h2 className="feature-headline">{pageCards[0].title}</h2>
                  <p className="feature-description">{pageCards[0].description}</p>
                </div>

                <div className="feature-footer">
                  <span className="feature-author">{pageCards[0].date}</span>
                  <span className="feature-link">
                    {t("common.read")}
                    <ChevronRight size={16} />
                  </span>
                </div>
              </div>
            </div>
          </section>
        </Link>}
        {!isLoading && !pageCards.length && (
          <p className="py-10 text-center text-sm text-gray-500">No blogs found.</p>
        )}

        {categorySlug && (
          <AdBanner position={`blog_category_${categorySlug}_inline`} showFallback={false} />
        )}

        <section className="gallery-grid">
          {(() => {
            const photos = pageCards.filter((c) => c.type === "photo");
            const accents = pageCards.filter((c) => c.type === "accent");
            const rows: (typeof pageCards)[] = [];
            const maxLen = Math.max(photos.length, accents.length);
            for (let i = 0; i < maxLen; i += 3) {
              if (i < photos.length) rows.push(photos.slice(i, i + 3));
              if (i < accents.length) rows.push(accents.slice(i, i + 3));
            }
            return rows.flat().map((card, idx) => renderCard(card, idx));
          })()}
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
    </>
  );
};

export default BlogList;
