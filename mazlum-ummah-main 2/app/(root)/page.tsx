"use client";

import GallerySection from "@/components/home/gallery-section";
import BlogSection from "@/components/home/blog-section";
import { galleryItems } from "@/data/gallery-data";
import HomeHero from "@/components/home-hero";
import BreakingNews from "@/components/breaking-news";
import NewsSection from "@/components/home/news-section";
import AdBanner from "@/components/ad-banner";
import CrisisStats from "@/components/home/crisis-stats";
import { useTranslations } from "@/hooks/use-translations";

const videoItems = galleryItems.filter((i) => i.type === "video").slice(0, 6);

const HomePage = () => {
  const t = useTranslations();

  return (
    <>
      <HomeHero title={t("hero.title")} />
      <BreakingNews />
      <NewsSection title={t("home.todayNews")} seeMore={false} />
      <CrisisStats />
      <NewsSection title={t("home.sudan")} slug="sudan" />
      <AdBanner />
      <NewsSection title={t("home.gaza")} slug="gaza" />
      <AdBanner />
      <NewsSection title={t("home.middleEast")} slug="middle-east" />
      <BlogSection />
      <GallerySection
        type="video"
        title={t("home.videos")}
        items={videoItems}
        footerHref="/gallery"
        footerLabel={t("common.seeMore")}
      />
    </>
  );
};

export default HomePage;
