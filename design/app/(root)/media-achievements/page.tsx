"use client";

import React, { useState, useEffect } from "react";
import Image from "@/components/ui/blur-image";
import Hero from "@/components/hero";
import { ChevronRight } from "lucide-react";
import "./style.css";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useTranslations } from "@/hooks/use-translations";
import SectionBoundary from "@/components/dev/section-boundary";
import MediaAchievementsSkeleton from "./page.skeleton";

const allCards = [
  {
    type: "photo" as const,
    src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80",
    alt: "প্রেস রিলিজ",
    source: "টেকক্রাঞ্চ",
    title: '"ফ্রেমওয়ার্ক ভেঙে ব্র্যান্ড আইডেন্টিটি গড়ে তোলা"',
    description:
      "কাস্টম ইউআই কীভাবে ব্যবহারকারী ধরে রাখার মেট্রিক্সকে প্রভাবিত করে তার একটি বিস্তৃত পর্যালোচনা।",
    date: "এপ্রিল ২০২৬",
    link: "আর্টিকেল দেখুন",
  },
  {
    type: "accent" as const,
    source: "বার্ষিক স্বীকৃতি",
    title: "শীর্ষ ৫ উদ্ভাবনী প্ল্যাটফর্ম নির্বাচিত",
    description:
      "স্ট্যান্ডার্ড আধুনিক ডিজাইনের সীমানা অতিক্রম করে কাঠামোগত লেআউট তৈরির জন্য আন্তর্জাতিক ইউআই গিল্ড কর্তৃক সম্মানিত।",
    date: "২০২৬ সালের বিজয়ী",
    link: "আইইউআইজি স্টুডিও",
  },
  {
    type: "photo" as const,
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
    alt: "প্রেস রিলিজ",
    source: "ফোর্বস",
    title: '"ডিজিটাল বিপ্লবে নতুন দিগন্ত"',
    description: "প্রযুক্তি খাতে বাংলাদেশের উদীয়মান স্টার্টআপগুলোর সাফল্যের গল্প।",
    date: "মে ২০২৬",
    link: "আর্টিকেল দেখুন",
  },
  {
    type: "accent" as const,
    source: "সেরা উদ্ভাবন",
    title: "বছরের সেরা সোশ্যাল ইমপ্যাক্ট প্রজেক্ট",
    description: "সমাজ পরিবর্তনে প্রযুক্তির ভূমিকা স্বীকৃতি পেয়েছে আন্তর্জাতিক মহলে।",
    date: "২০২৬ সালের বিজয়ী",
    link: "আইডিয়া ল্যাব",
  },
  {
    type: "photo" as const,
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    alt: "প্রযুক্তি কভারেজ",
    source: "দ্য গার্ডিয়ান",
    title: '"এআই যুগে মানবিকতার অবস্থান"',
    description: "কৃত্রিম বুদ্ধিমত্তার উন্নয়নে নৈতিকতা ও মানবিক মূল্যবোধ নিয়ে আলোচনা।",
    date: "মার্চ ২০২৬",
    link: "আর্টিকেল দেখুন",
  },
  {
    type: "accent" as const,
    source: "টেক অ্যাওয়ার্ড",
    title: "শ্রেষ্ঠ ডিজিটাল প্ল্যাটফর্ম পুরস্কার",
    description: "ব্যবহারকারী বান্ধব ডিজাইন এবং উদ্ভাবনী ফিচারের জন্য স্বীকৃতি অর্জন।",
    date: "২০২৬ সালের বিজয়ী",
    link: "ডিজিটাল অ্যাওয়ার্ডস",
  },
];

const ITEMS_PER_PAGE = 6;

const Achievements = () => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const pageParam = searchParams.get("page");
  const initialPage = pageParam && !isNaN(parseInt(pageParam, 10)) ? parseInt(pageParam, 10) : 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

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
              <span className="gallery-card-link">{card.link}</span>
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
          <span className="gallery-card-link-wrapper">
            {card.link} <ChevronRight size={14} />
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      <Hero
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
        imageAlt="অফিস স্পেসের হেডার ব্যাকগ্রাউন্ড"
        badge={t("media.pressHighlights")}
        title={
          <>
            {t("media.creatingHeadlines")} {t("media.buildingDigitalAge")}
          </>
        }
        description={t("media.description")}
        compact
      />

      <SectionBoundary id="media-content" fallback={<MediaAchievementsSkeleton />}>
        <main className="container main-content">
          <section className="feature-card">
            <div className="feature-grid">
              <div className="feature-image-wrapper">
                <Image
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80"
                  alt={t("media.featureCoverage")}
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
                    "ভবিষ্যতের জন্য উচ্চ-কার্যক্ষম ইন্টারফেস ডিজাইন করছে যে স্টুডিও"
                  </h2>
                  <p className="feature-description">
                    মাইক্রো-ইন্টারঅ্যাকশন, পরিষ্কার মিনিমালিস্ট নান্দনিকতা এবং নিরবিচ্ছিন্ন
                    স্কেলযোগ্য কাস্টম টেইলউইন্ড আর্কিটেকচারের বিস্তারিত বিশ্লেষণ।
                  </p>
                </div>

                <div className="feature-footer">
                  <span className="feature-author">{t("media.writtenBy")} মার্কাস থর্ন</span>
                  <a href="#" className="feature-link">
                    {t("common.read")}
                    <ChevronRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </section>

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
        </main>
      </SectionBoundary>
    </>
  );
};

export default Achievements;
