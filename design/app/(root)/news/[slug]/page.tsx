"use client";

import React from "react";
import Hero from "@/components/hero";
import { useTranslations } from "@/hooks/use-translations";
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
  const { slug } = React.use(params);
  const titleKey = `news.${slug === "sudan" ? "sudanTitle" : slug === "gaza" ? "gazaTitle" : slug === "middle-east" ? "middleEastTitle" : slug === "africa" ? "africaTitle" : "defaultTitle"}`;
  const subtitleKey = `news.${slug === "sudan" ? "sudanSubtitle" : slug === "gaza" ? "gazaSubtitle" : slug === "middle-east" ? "middleEastSubtitle" : slug === "africa" ? "africaSubtitle" : "defaultSubtitle"}`;

  return (
    <>
      <Hero
        image={newsImages[slug] || newsImages.default}
        imageAlt={t(titleKey)}
        title={t(titleKey)}
        description={t(subtitleKey)}
        compact
      />
      <NewsList slug={slug} />
    </>
  );
};

export default NewsCategoryPage;
