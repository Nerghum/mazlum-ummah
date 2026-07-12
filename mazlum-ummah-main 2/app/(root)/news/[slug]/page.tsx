"use client";

import React, { useState, useEffect } from "react";
import Hero from "@/components/hero";
import { useTranslations } from "@/hooks/use-translations";
import { useLocale } from "@/hooks/use-locale";
import NewsList from "./components/newslist";

const newsImages: Record<string, string> = {
  sudan: "/assets/hero/sudan.jpg",
  gaza: "/assets/hero/gaza.jpg",
  "middle-east": "/assets/hero/middle-east.jpg",
  africa: "/assets/hero/africa.jpg",
  default: "/assets/hero/hero-bg.jpg",
};

type NewsCategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const NewsCategoryPage = ({ params }: NewsCategoryPageProps) => {
  const t = useTranslations();
  const { locale } = useLocale();
  const { slug } = React.use(params);
  const [category, setCategory] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/public/categories/news/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setCategory(data.data);
        }
      })
      .catch(console.error);
  }, [slug]);

  // Fallback to translations if category is not yet loaded or doesn't have custom titles
  const defaultTitleKey = `news.${slug === "sudan" ? "sudanTitle" : slug === "gaza" ? "gazaTitle" : slug === "middle-east" ? "middleEastTitle" : slug === "africa" ? "africaTitle" : "defaultTitle"}`;
  const defaultSubtitleKey = `news.${slug === "sudan" ? "sudanSubtitle" : slug === "gaza" ? "gazaSubtitle" : slug === "middle-east" ? "middleEastSubtitle" : slug === "africa" ? "africaSubtitle" : "defaultSubtitle"}`;

  const displayTitle = category
    ? locale === "bn"
      ? category.pageTitleBn || category.nameBn || category.pageTitle || category.name
      : category.pageTitle || category.name || category.nameBn
    : t(defaultTitleKey);

  const displaySubtitle = category
    ? locale === "bn"
      ? category.pageSubtitleBn || category.pageSubtitle || ""
      : category.pageSubtitle || ""
    : t(defaultSubtitleKey);

  return (
    <>
      <Hero
        image={category?.bannerImage?.url || newsImages[slug] || newsImages.default}
        imageAlt={displayTitle}
        title={displayTitle}
        description={displaySubtitle}
        compact
      />
      <NewsList slug={slug} />
    </>
  );
};

export default NewsCategoryPage;
