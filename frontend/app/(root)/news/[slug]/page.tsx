"use client";

import React from "react";
import PageBanner from "@/components/page-banner";
import AdBanner from "@/components/ad-banner";
import { useTranslations } from "@/hooks/use-translations";
import NewsList from "./components/newslist";

type NewsCategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const NewsCategoryPage = ({ params }: NewsCategoryPageProps) => {
  const t = useTranslations();
  const { slug } = React.use(params);
  const titleKey = `news.${slug === "sudan" ? "sudanTitle" : slug === "gaza" ? "gazaTitle" : slug === "middle-east" ? "middleEastTitle" : slug === "africa" ? "africaTitle" : "defaultTitle"}`;
  const subtitleKey = `news.${slug === "sudan" ? "sudanSubtitle" : slug === "gaza" ? "gazaSubtitle" : slug === "middle-east" ? "middleEastSubtitle" : slug === "africa" ? "africaSubtitle" : "defaultSubtitle"}`;

  return (
    <>
      <PageBanner 
        title={t(titleKey)} 
        subtitle={t(subtitleKey)} 
        categoryType="news" 
        categorySlug={slug} 
        adPosition={`news_category_${slug}_banner`}
      />
      <NewsList slug={slug} />
    </>
  );
};

export default NewsCategoryPage;
