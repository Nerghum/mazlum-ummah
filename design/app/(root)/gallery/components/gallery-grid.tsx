"use client";

import React, { useState, useEffect } from "react";
import Image from "@/components/ui/blur-image";
import { Maximize2 } from "lucide-react";
import { GalleryItem } from "@/data/gallery-data";
import Lightbox from "@/components/lightbox";
import VideoCard from "./video-card";
import VideoModal from "@/components/video-modal";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useTranslations } from "@/hooks/use-translations";
import "@/components/gallery-modal.css";
import "./gallery-grid.css";

type GalleryGridProps = {
  items: GalleryItem[];
  selectedType: "image" | "video";
};

const ITEMS_PER_PAGE = 6;

const GalleryGrid = ({ items, selectedType }: GalleryGridProps) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [videoModalId, setVideoModalId] = useState<string | null>(null);

  const pageParam = searchParams.get("page");
  const initialPage = pageParam && !isNaN(parseInt(pageParam, 10)) ? parseInt(pageParam, 10) : 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.max(Math.ceil(items.length / ITEMS_PER_PAGE), 1);
  const validCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    const p = searchParams.get("page");
    const parsedPage = p && !isNaN(parseInt(p, 10)) ? parseInt(p, 10) : 1;
    setCurrentPage(parsedPage);
  }, [searchParams]);

  const updatePage = (newPage: number) => {
    setCurrentPage(newPage);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrev = () => updatePage(Math.max(validCurrentPage - 1, 1));
  const handleNext = () => updatePage(Math.min(validCurrentPage + 1, totalPages));

  useEffect(() => {
    if (currentPage !== validCurrentPage && items.length > 0) {
      setCurrentPage(validCurrentPage);
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", validCurrentPage.toString());
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [currentPage, validCurrentPage, items.length, pathname, router, searchParams]);

  // Reset to page 1 when items change (e.g. type filter)
  useEffect(() => {
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [items.length]);

  const handleLightboxOpen = (pageItemIndex: number) => {
    const realIndex = items.findIndex((item) => item.id === pageItems[pageItemIndex].id);
    setLightboxIndex(realIndex);
  };

  return (
    <>
      {pageItems.length > 0 ? (
        <div className="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row css-17vctqv">
          {pageItems.map((item, index) => (
            <div
              key={item.id}
              className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-sm-6 MuiGrid2-grid-lg-6 css-126rge6"
            >
              {item.type === "image" ? (
                <div
                  className="gallery-grid-card video-card"
                  onClick={() => handleLightboxOpen(index)}
                >
                  <div className="MuiBox-root css-2rgoel">
                    <div className="gallery-image-hover-wrapper">
                      <span className="minimal__image__root --loaded css-1whffbs">
                        <Image
                          src={item.src}
                          alt={item.title || "Gallery Image"}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          style={{ objectFit: "cover" }}
                        />
                      </span>
                      <div className="gallery-hover-overlay">
                        <Maximize2 size={28} color="white" />
                      </div>
                    </div>
                  </div>
                  <div className="gallery-card-title-wrapper">
                    <h3 className="gallery-card-title">{item.title}</h3>
                  </div>
                </div>
              ) : (
                <VideoCard item={item} onClick={() => setVideoModalId(item.youtubeId || null)} />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="gallery-grid-empty">
          {selectedType === "video" ? t("gallery.noVideos") : t("gallery.noPhotos")}
        </div>
      )}
      {totalPages > 1 && (
        <nav
          aria-label="pagination navigation"
          className="MuiPagination-root MuiPagination-text css-13jb70f"
        >
          <ul className="MuiPagination-ul css-51eq8m">
            <li>
              <button
                className={`MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-sizeMedium MuiPaginationItem-text MuiPaginationItem-circular MuiPaginationItem-colorPrimary MuiPaginationItem-textPrimary MuiPaginationItem-previousNext css-ekx01y ${validCurrentPage === 1 ? "Mui-disabled" : ""}`}
                tabIndex={0}
                type="button"
                onClick={handlePrev}
                disabled={validCurrentPage === 1}
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
                  className={`MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-sizeMedium MuiPaginationItem-text MuiPaginationItem-circular MuiPaginationItem-colorPrimary MuiPaginationItem-textPrimary MuiPaginationItem-page css-ekx01y ${page === validCurrentPage ? "Mui-selected" : ""}`}
                  tabIndex={0}
                  type="button"
                  onClick={() => updatePage(page)}
                  aria-label={`page ${page}`}
                  aria-current={page === validCurrentPage ? "page" : undefined}
                >
                  {page}
                </button>
              </li>
            ))}
            <li>
              <button
                className={`MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-sizeMedium MuiPaginationItem-text MuiPaginationItem-circular MuiPaginationItem-colorPrimary MuiPaginationItem-textPrimary MuiPaginationItem-previousNext css-ekx01y ${validCurrentPage === totalPages ? "Mui-disabled" : ""}`}
                tabIndex={0}
                type="button"
                onClick={handleNext}
                disabled={validCurrentPage === totalPages}
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
      )}
      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
      {videoModalId !== null && (
        <VideoModal youtubeId={videoModalId} onClose={() => setVideoModalId(null)} />
      )}
    </>
  );
};

export default GalleryGrid;
