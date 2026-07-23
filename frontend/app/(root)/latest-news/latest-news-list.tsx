"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { useTranslations } from "@/hooks/use-translations";
import { CardItem, CmsCategory, categoryName, fetchCategories, fetchNews, postToCard } from "@/lib/cms";
import "../news/[slug]/components/style.css";
import "../todays-news/style.css";

type CategorySection = {
  category: CmsCategory;
  cards: CardItem[];
};

const NewsCard = ({ card }: { card: CardItem }) => (
  <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-sm-6 MuiGrid2-grid-lg-4 css-s2cpvg">
    <Link href={card.href} data-discover="true" className="news-card-link">
      <div className="MuiBox-root css-7ww5cw">
        <span className={`minimal__image__root ${card.loaded ? "--loaded" : ""} css-wz86un`}>
          <Image
            src={card.src}
            alt={card.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
          <span className="card-date-overlay">{card.date}</span>
        </span>
        <div className="MuiBox-root css-11ot730">
          <div className="MuiBox-root css-losree">
            <div className="MuiBox-root css-vufmu2">
              <h2 className="MuiTypography-root MuiTypography-h4 css-12lpekd">{card.title}</h2>
              <p className="MuiTypography-root MuiTypography-body2 css-jq5ltg">{card.excerpt}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </div>
);

const LatestNewsSection = ({ section }: { section: CategorySection }) => {
  const t = useTranslations();
  const { locale } = useLocale();
  const title = categoryName(section.category, locale) || t("news.defaultTitle");

  return (
    <section className="todays-news-section">
      <div className="todays-news-section__header">
        <h2 className="news-section-title">{title}</h2>
        {section.category.slug && (
          <Link className="todays-news-section__link" href={`/news/${section.category.slug}`}>
            {t("common.seeMore") || "See More"}
            <ArrowRight size={16} strokeWidth={1.75} />
          </Link>
        )}
      </div>

      {section.cards.length ? (
        <div className="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row css-iz5kae">
          {section.cards.map((card) => (
            <NewsCard key={card.href} card={card} />
          ))}
        </div>
      ) : (
        <p className="todays-news-empty">
          {t("common.noData") || "No news found."}
        </p>
      )}
    </section>
  );
};

import PageBanner from "@/components/page-banner";
import PageBannerSkeleton from "@/components/page-banner/page-banner.skeleton";
import NewsListSkeleton from "../news/[slug]/components/newslist.skeleton";

const LatestNewsList = () => {
  const { locale } = useLocale();
  const t = useTranslations();
  const [sections, setSections] = useState<CategorySection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadSections() {
      setLoading(true);
      const categories = await fetchCategories("news");
      const nextSections = await Promise.all(
        categories.map(async (category) => {
          const posts = category.slug
            ? await fetchNews({ limit: 5, categorySlug: category.slug })
            : [];
          return {
            category,
            cards: posts.map((post, index) => postToCard(post, locale, `/news/${category.slug || "general"}`, index)),
          };
        })
      );

      if (!mounted) return;
      setSections(nextSections.filter((section) => section.cards.length > 0));
      setLoading(false);
    }

    loadSections();

    return () => {
      mounted = false;
    };
  }, [locale]);

  if (loading) {
    return (
      <>
        <PageBannerSkeleton hasTitle={true} />
        <section className="MuiBox-root css-1vhc6zl todays-news-page">
          <NewsListSkeleton />
        </section>
      </>
    );
  }

  return (
    <>
      <PageBanner
        title={t("news.latestNews") || "Latest News"}
        subtitle={t("news.latestSubtitle") || "All the latest updates"}
        adPosition="latest_news_page_banner"
      />
      <section className="MuiBox-root css-1vhc6zl todays-news-page">
        {sections.length ? (
          sections.map((section) => (
            <LatestNewsSection key={section.category._id || section.category.slug} section={section} />
          ))
        ) : (
          <p className="todays-news-empty">{t("common.noData") || "No news found."}</p>
        )}
      </section>
    </>
  );
};

export default LatestNewsList;
