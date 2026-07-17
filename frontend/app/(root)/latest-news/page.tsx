"use client";

import PageBanner from "@/components/page-banner";
import { useTranslations } from "@/hooks/use-translations";
import LatestNewsList from "./latest-news-list";

const LatestNewsPage = () => {
  const t = useTranslations();

  return (
    <>
      <PageBanner
        title={t("news.latestNews") || "Latest News"}
        subtitle={t("news.latestSubtitle") || "All the latest updates"}
        adPosition="latest_news_page_banner"
      />
      <LatestNewsList />
    </>
  );
};

export default LatestNewsPage;
