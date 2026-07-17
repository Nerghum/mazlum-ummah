"use client";

import PageBanner from "@/components/page-banner";
import { useTranslations } from "@/hooks/use-translations";
import TodaysNewsList from "./todays-news-list";

const TodaysNewsPage = () => {
  const t = useTranslations();

  return (
    <>
      <PageBanner
        title={t("news.todaysNews")}
        subtitle={t("news.todaySubtitle")}
        adPosition="todays_news_page_banner"
      />
      <TodaysNewsList />
    </>
  );
};

export default TodaysNewsPage;
