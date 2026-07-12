"use client";

import React, { useState } from "react";
import Image from "next/image";
import Hero from "@/components/hero";
import { ChevronRight } from "lucide-react";
import "./style.css";
import Link from "next/link";
import { useTranslations } from "@/hooks/use-translations";

const BLOG_LIST_IMG_1 =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80";
const BLOG_LIST_IMG_2 =
  "https://images.unsplash.com/photo-1517697471339-4aa32003c11a?auto=format&fit=crop&w=600&q=80";
const BLOG_LIST_IMG_3 =
  "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=600&q=80";
const BLOG_LIST_IMG_4 =
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=600&q=80";
const BLOG_LIST_IMG_5 =
  "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=600&q=80";
const BLOG_LIST_IMG_6 =
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80";
const BLOG_LIST_IMG_7 =
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80";
const BLOG_LIST_IMG_8 =
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80";
const BLOG_LIST_IMG_9 =
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80";
const BLOG_LIST_IMG_10 =
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=600&q=80";

const IMG_SOURCES = [
  BLOG_LIST_IMG_1,
  BLOG_LIST_IMG_2,
  BLOG_LIST_IMG_3,
  BLOG_LIST_IMG_4,
  BLOG_LIST_IMG_5,
  BLOG_LIST_IMG_6,
  BLOG_LIST_IMG_7,
  BLOG_LIST_IMG_8,
  BLOG_LIST_IMG_9,
  BLOG_LIST_IMG_10,
];

const BLOG_TITLES = [
  "ইসলামি জ্ঞান বিস্তারে বিশেষ সেমিনার অনুষ্ঠিত",
  "ইমাম প্রশিক্ষণ কর্মশালা সফলভাবে সম্পন্ন",
  "হজ প্রশিক্ষণ কর্মশালা সফলভাবে সম্পন্ন",
  "মেধাবী আলেমদের সংবর্ধনা ও পুরস্কার বিতরণ",
  "ঈদুল ফিতরের জামাত ও আনন্দঘন পরিবেশ",
  "দাওয়াহ প্রশিক্ষণ কর্মশালা সম্পন্ন",
  "মাওলানা আবদুল করিমের নতুন বই প্রকাশিত",
  "প্রোডাক্টিভ রমাদান সেমিনার অনুষ্ঠিত",
  "রেমিট্যান্স যোদ্ধাদের গাইডলাইন কর্মশালা",
  "রিকশাচালকদের জীবনমান উন্নয়ন কর্মশালা",
];

const BLOG_ALTS = [
  "ইসলামি জ্ঞান বিস্তারে বিশেষ সেমিনার",
  "ইমাম প্রশিক্ষণ কর্মশালা",
  "হজ প্রশিক্ষণ কর্মশালা",
  "আলেম সংবর্ধনা অনুষ্ঠান",
  "ঈদুল ফিতরের জামাত",
  "দাওয়াহ প্রশিক্ষণ কর্মশালা",
  "নতুন বই প্রকাশ",
  "রমাদান সেমিনার",
  "রেমিট্যান্স যোদ্ধা কর্মশালা",
  "রিকশাচালক কর্মশালা",
];

const BLOG_EXCERPTS = [
  "মযলুম উম্মাহ-এর আয়োজনে ইসলামি জ্ঞান ও শিক্ষা বিস্তারের লক্ষ্যে বিশেষ সেমিনার অনুষ্ঠিত হয়েছে যেখানে হাজারো মানুষ অংশগ্রহণ করেন।",
  "সারাদেশ থেকে নির্বাচিত ইমামদের নিয়ে বিশেষ প্রশিক্ষণের আয়োজন করা হয় যেখানে তারা লিডারশিপ, দাওয়াহ কৌশল ও আধুনিক প্রযুক্তি ব্যবহারের প্রশিক্ষণ গ্রহণ করেন।",
  "মযলুম উম্মাহ-এর উদ্যোগে হজযাত্রীদের জন্য বিশেষ প্রশিক্ষণের আয়োজন করা হয় যাতে তারা হজের সকল মনাসিক ও নিয়ম-কানুন সম্পর্কে জানতে পারেন।",
  "কওমী মাদরাসার শীর্ষ পরীক্ষায় উত্তীর্ণ মেধাবী আলেমদের সম্মাননা জানানো হয় এবং তাদের ভবিষ্যৎ উন্নয়নে বিশেষ পুরস্কার প্রদান করা হয়।",
  "রাজধানীর বাড্ডায় মযলুম উম্মাহ-এর উদ্যোগে ঈদুল ফিতরের জামাত অনুষ্ঠিত হয় এবং মুসল্লিরা একত্রিত হয়ে ঈদের খুশি উদযাপন করেন।",
  "মযলুম উম্মাহ দাওয়াহ অ্যান্ড রিসার্চ ইনস্টিটিউটের উদ্যোগে বিশ দিনব্যাপী দাওয়াহ প্রশিক্ষণ সফলভাবে সম্পন্ন হয়েছে যেখানে অংশগ্রহণকারীরা ইসলামি দাওয়াহের কৌশল শিখেছেন।",
  "ঈমানের অপরিহার্য পাঠ শীর্ষক নতুন বইটি প্রকাশিত হয়েছে যা মুসলমানদের ঈমানকে সুদৃঢ় করতে সহায়ক ভূমিকা পালন করবে বলে আশা করা হচ্ছে।",
  "পবিত্র রমাদান মাসকে সর্বোত্তমভাবে ব্যবহার করার লক্ষ্যে মযলুম উম্মাহ-এর উদ্যোগে বিশেষ সেমিনারের আয়োজন করা হয় যেখানে রমাদানের ফজিলত ও ইবাদতের বিষয়ে আলোচনা করা হয়।",
  "প্রবাসী বাংলাদেশিদের আইনি জটিলতা ও সংকট মোকাবিলায় দিকনির্দেশনা প্রদানের লক্ষ্যে বিশেষ কর্মশালার আয়োজন করা হয় যেখানে অভিজ্ঞরা তাদের পরামর্শ প্রদান করেন।",
  "রিকশাচালকদের সামাজিক ও অর্থনৈতিক অবস্থার উন্নয়নে মযলুম উম্মাহ-এর উদ্যোগে বিশেষ কর্মশালা অনুষ্ঠিত হয় যেখানে তাদের বিভিন্ন বিষয়ে সচেতন করা হয়।",
];

const BLOG_DATES = [
  "৯ মে, ২০২৬",
  "২ মে, ২০২৬",
  "১৯ এপ্রিল, ২০২৬",
  "১৮ এপ্রিল, ২০২৬",
  "২২ মার্চ, ২০২৬",
  "১০ মার্চ, ২০২৬",
  "২৩ ফেব্রুয়ারি, ২০২৬",
  "১৭ ফেব্রুয়ারি, ২০২৬",
  "১০ জানুয়ারি, ২০২৬",
  "৫ ডিসেম্বর, ২০২৫",
];

const ITEMS_PER_PAGE = 6;

const allCards = Array.from({ length: 30 }, (_, i) => ({
  type: (i % 2 === 0 ? "photo" : "accent") as "photo" | "accent",
  href: `/blogs/blog-${i + 1}`,
  src: IMG_SOURCES[i % IMG_SOURCES.length],
  alt: BLOG_ALTS[i % BLOG_ALTS.length],
  title: BLOG_TITLES[i % BLOG_TITLES.length],
  description: BLOG_EXCERPTS[i % BLOG_EXCERPTS.length],
  date: BLOG_DATES[i % BLOG_DATES.length],
}));

const BlogList = () => {
  const t = useTranslations();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allCards.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageCards = allCards.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

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
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
        imageAlt="ব্লগ ব্যাকগ্রাউন্ড"
        badge={t("blog.badge")}
        title={
          <>
            {t("blog.tagline1")}
            <br />
            {t("blog.tagline2")}
          </>
        }
        description={t("blog.description")}
        compact
      />

      <main className="container main-content">
        <Link href={pageCards[0]?.href} style={{ textDecoration: "none" }}>
          <section className="feature-card">
            <div className="feature-grid">
              <div className="feature-image-wrapper">
                <Image
                  src={pageCards[0]?.src}
                  alt={pageCards[0]?.alt}
                  className="feature-image"
                  fill
                  sizes="(max-width: 1023px) 100vw, 45vw"
                  style={{ objectFit: "cover" }}
                />
                <div className="feature-image-overlay"></div>
              </div>

              <div className="feature-text-wrapper">
                <div>
                  <h2 className="feature-headline">{pageCards[0]?.title}</h2>
                  <p className="feature-description">{pageCards[0]?.description}</p>
                </div>

                <div className="feature-footer">
                  <span className="feature-author">{pageCards[0]?.date}</span>
                  <span className="feature-link">
                    {t("common.read")}
                    <ChevronRight size={16} />
                  </span>
                </div>
              </div>
            </div>
          </section>
        </Link>

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
