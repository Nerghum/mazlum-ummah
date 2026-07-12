"use client";

import PageBanner from "@/components/page-banner";
import { useTranslations } from "@/hooks/use-translations";
import TodaysNewsList from "./todays-news-list";

const TodaysNewsPage = () => {
  const t = useTranslations();

  return (
    <>
      <PageBanner title={t("home.todayNews")} subtitle={t("news.todaySubtitle")} />
      <TodaysNewsList />
    </>
  );
};

export default TodaysNewsPage;
