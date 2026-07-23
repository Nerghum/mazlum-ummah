"use client";

import React, { useState, useEffect } from "react";
import Image from "@/components/ui/blur-image";
import { Search, Calendar, X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useTranslations } from "@/hooks/use-translations";

const NEWS_LIST_IMG_1 =
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80";
const NEWS_LIST_IMG_2 =
  "https://images.unsplash.com/photo-1517697471339-4aa32003c11a?auto=format&fit=crop&w=600&q=80";
const NEWS_LIST_IMG_3 =
  "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=600&q=80";
const NEWS_LIST_IMG_4 =
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=600&q=80";
const NEWS_LIST_IMG_5 =
  "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=600&q=80";
const NEWS_LIST_IMG_6 =
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80";
const NEWS_LIST_IMG_7 =
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80";
const NEWS_LIST_IMG_8 =
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80";
const NEWS_LIST_IMG_9 =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80";
const NEWS_LIST_IMG_10 =
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=600&q=80";

const IMG_SOURCES = [
  NEWS_LIST_IMG_1,
  NEWS_LIST_IMG_2,
  NEWS_LIST_IMG_3,
  NEWS_LIST_IMG_4,
  NEWS_LIST_IMG_5,
  NEWS_LIST_IMG_6,
  NEWS_LIST_IMG_7,
  NEWS_LIST_IMG_8,
  NEWS_LIST_IMG_9,
  NEWS_LIST_IMG_10,
];

const FEATURED_COUNT = 2;
const ITEMS_PER_PAGE = 12;

const CustomDateInput = React.forwardRef<
  HTMLButtonElement,
  { value?: string; onClick?: () => void; onChange?: (value: null) => void; dateLabel: string }
>(({ value, onClick, onChange, dateLabel }, ref) => (
  <button type="button" className="date-picker-trigger" onClick={onClick} ref={ref}>
    <Calendar size={18} strokeWidth={1.75} />
    <span className="date-trigger-text">{value || dateLabel}</span>
    {value && (
      <X
        size={14}
        strokeWidth={2}
        className="date-clear-icon"
        onClick={(e) => {
          e.stopPropagation();
          if (onChange) onChange(null);
        }}
      />
    )}
  </button>
));

CustomDateInput.displayName = "CustomDateInput";

const AdCard = ({ t }: { t: ReturnType<typeof useTranslations> }) => (
  <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-sm-6 MuiGrid2-grid-lg-4 css-s2cpvg">
    <div className="news-ad-card">
      <div className="news-ad-placeholder">
        <span className="news-ad-label">{t("common.advertisement")}</span>
      </div>
    </div>
  </div>
);

const NewsList = ({ slug }: { slug: string }) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  const pageParam = searchParams.get("page");
  const initialPage = pageParam && !isNaN(parseInt(pageParam, 10)) ? parseInt(pageParam, 10) : 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const allCards = React.useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => ({
        href: `/news/${slug}/news-${i + 1}`,
        src: IMG_SOURCES[i % IMG_SOURCES.length],
        alt: t(`newsSection.tags.full.${i % 12}`),
        title: t(`newsSection.tags.full.${i % 12}`),
        excerpt: t(`newsSection.descriptions.${i % 12}`),
        date: t(`newsSection.dates.${i % 12}`),
        loaded: true,
      })),
    [slug, t]
  );

  const totalPages = Math.ceil(allCards.length / ITEMS_PER_PAGE);
  const validCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
  const pageCards = allCards.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
    if (currentPage !== validCurrentPage && allCards.length > 0) {
      setCurrentPage(validCurrentPage);
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", validCurrentPage.toString());
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [currentPage, validCurrentPage, allCards.length, pathname, router, searchParams]);

  return (
    <section className="MuiBox-root css-1vhc6zl">
      <div className="MuiBox-root css-fm5laq">
        <h1 className="news-section-title">
          {t(
            `news.categories.${slug === "sudan" ? "sudan" : slug === "gaza" ? "gaza" : slug === "middle-east" ? "middleEast" : slug === "africa" ? "africa" : "sudan"}`
          )}{" "}
          {t("news.defaultTitle")}
        </h1>
        <div className="news-toolbar-right">
          <div className="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-6bd2iw">
            <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-adornedStart css-fyblhf news-search-field">
              <Search
                aria-hidden="true"
                className="news-search-icon"
                size={18}
                strokeWidth={1.75}
              />
              <input
                aria-invalid="false"
                id=":ra:"
                placeholder={t("news.searchPlaceholder")}
                type="text"
                className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputAdornedStart css-1geo4iu news-search-input"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <fieldset
                aria-hidden="true"
                className="MuiOutlinedInput-notchedOutline css-13uci02 news-search-outline"
              >
                <legend className="css-w4cd9x">
                  <span className="notranslate" aria-hidden="true"></span>
                </legend>
              </fieldset>
            </div>
          </div>
          <div className="news-date-picker-wrapper">
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              isClearable
              className="news-date-input"
              popperPlacement="bottom-end"
              popperModifiers={
                [
                  {
                    name: "computeStyles",
                    options: {
                      gpuAcceleration: false,
                      adaptive: false,
                    },
                  },
                  {
                    name: "preventOverflow",
                    options: {
                      boundary: "viewport",
                      padding: 12,
                      altAxis: true,
                      altBoundary: false,
                    },
                  },
                  {
                    name: "flip",
                    options: {
                      fallbackPlacements: ["top-end"],
                      boundary: "viewport",
                    },
                  },
                  {
                    name: "offset",
                    options: {
                      offset: [0, 8],
                    },
                  },
                ] as any
              }
              renderCustomHeader={({
                monthDate,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div className="date-picker-header">
                  <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} type="button">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <span>
                    {monthDate.toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} type="button">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              )}
              customInput={<CustomDateInput dateLabel={t("common.date")} />}
            />
          </div>
        </div>
      </div>
      <div className="news-featured-row">
        <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 css-j5005a">
          <Link href={pageCards[0]?.href} data-discover="true" className="news-card-link">
            <div className="MuiBox-root css-19dhy7x">
              <span className="minimal__image__root --loaded css-1o4wzs9">
                <Image
                  src={pageCards[0]?.src}
                  alt={pageCards[0]?.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
                <span className="card-date-overlay">{pageCards[0]?.date}</span>
              </span>
              <div className="MuiBox-root css-1myhsfg">
                <div className="MuiBox-root css-518gou">
                  <div className="MuiBox-root css-vufmu2">
                    <h2 className="MuiTypography-root MuiTypography-h4 css-12lpekd">
                      {pageCards[0]?.title}
                    </h2>
                    <p className="MuiTypography-root MuiTypography-body2 css-jq5ltg">
                      {pageCards[0]?.excerpt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-sm-6 MuiGrid2-grid-lg-4 css-s2cpvg">
          <Link href={pageCards[1]?.href} data-discover="true" className="news-card-link">
            <div className="MuiBox-root css-7ww5cw news-featured-row-second">
              <span className="minimal__image__root --loaded css-wz86un">
                <Image
                  src={pageCards[1]?.src}
                  alt={pageCards[1]?.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
                <span className="card-date-overlay">{pageCards[1]?.date}</span>
              </span>
              <div className="MuiBox-root css-11ot730">
                <div className="MuiBox-root css-losree">
                  <div className="MuiBox-root css-vufmu2">
                    <h2 className="MuiTypography-root MuiTypography-h4 css-12lpekd">
                      {pageCards[1]?.title}
                    </h2>
                    <p className="MuiTypography-root MuiTypography-body2 css-jq5ltg">
                      {pageCards[1]?.excerpt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      {(() => {
        const cards = pageCards.slice(FEATURED_COUNT);

        const rendered = [];
        let cardIndex = 0;
        let rowIndex = 0;

        while (cardIndex < cards.length) {
          if (rowIndex % 2 === 0) {
            rendered.push({ type: "card", data: cards[cardIndex++] });
            if (cardIndex < cards.length) {
              rendered.push({ type: "card", data: cards[cardIndex++] });
            }
            rendered.push({ type: "ad" });
          } else {
            for (let i = 0; i < 3 && cardIndex < cards.length; i++) {
              rendered.push({ type: "card", data: cards[cardIndex++] });
            }
          }
          rowIndex++;
        }

        return (
          <div className="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row css-iz5kae">
            {rendered.map((item, idx) =>
              item.type === "ad" ? (
                <AdCard key={`ad-${idx}`} t={t} />
              ) : item.data ? (
                <div
                  key={item.data.href}
                  className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-sm-6 MuiGrid2-grid-lg-4 css-s2cpvg"
                >
                  <Link href={item.data.href} data-discover="true" className="news-card-link">
                    <div className="MuiBox-root css-7ww5cw">
                      <span
                        className={`minimal__image__root ${item.data.loaded ? "--loaded" : ""} css-wz86un`}
                      >
                        {item.data.src ? (
                          <Image
                            src={item.data.src}
                            alt={item.data.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <span className="minimal__image__placeholder css-1kw1ku8"></span>
                        )}
                        <span className="card-date-overlay">{item.data.date}</span>
                      </span>
                      <div className="MuiBox-root css-11ot730">
                        <div className="MuiBox-root css-losree">
                          <div className="MuiBox-root css-vufmu2">
                            <h2 className="MuiTypography-root MuiTypography-h4 css-12lpekd">
                              {item.data.title}
                            </h2>
                            <p className="MuiTypography-root MuiTypography-body2 css-jq5ltg">
                              {item.data.excerpt}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ) : null
            )}
          </div>
        );
      })()}
      <nav
        aria-label="pagination navigation"
        className="MuiPagination-root MuiPagination-text css-oggzwd"
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
    </section>
  );
};

export default NewsList;
