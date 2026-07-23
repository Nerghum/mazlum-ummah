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
import SectionBoundary from "@/components/dev/section-boundary";
import BreakingNewsSkeleton from "@/components/breaking-news/breaking-news.skeleton";
import NewsSectionSkeleton from "@/components/home/news-section/news-section.skeleton";
import CrisisStatsSkeleton from "@/components/home/crisis-stats/crisis-stats.skeleton";
import AdBannerSkeleton from "@/components/ad-banner/ad-banner.skeleton";
import BlogSectionSkeleton from "@/components/home/blog-section/blog-section.skeleton";
import GallerySectionSkeleton from "@/components/home/gallery-section/gallery-section.skeleton";

const videoItems = galleryItems.filter((i) => i.type === "video").slice(0, 6);

const HomePage = () => {
  const t = useTranslations();

  return (
    <>
      {/* Hero renders immediately — no skeleton by design. */}
      <HomeHero title={t("hero.title")} />

      <SectionBoundary id="home-breaking" fallback={<BreakingNewsSkeleton />} factor={0.75}>
        <BreakingNews />
      </SectionBoundary>

      <SectionBoundary id="home-news-today" fallback={<NewsSectionSkeleton />}>
        <NewsSection title={t("home.todayNews")} />
      </SectionBoundary>

      <SectionBoundary id="home-crisis-stats" fallback={<CrisisStatsSkeleton />} factor={1.25}>
        <CrisisStats />
      </SectionBoundary>

      <SectionBoundary id="home-news-sudan" fallback={<NewsSectionSkeleton />} factor={1.5}>
        <NewsSection title={t("home.sudan")} slug="sudan" />
      </SectionBoundary>

      <SectionBoundary id="home-ad-1" fallback={<AdBannerSkeleton />} factor={1.5}>
        <AdBanner />
      </SectionBoundary>

      <SectionBoundary id="home-news-gaza" fallback={<NewsSectionSkeleton />} factor={1.75}>
        <NewsSection title={t("home.gaza")} slug="gaza" />
      </SectionBoundary>

      <SectionBoundary id="home-ad-2" fallback={<AdBannerSkeleton />} factor={1.75}>
        <AdBanner />
      </SectionBoundary>

      <SectionBoundary id="home-news-middle-east" fallback={<NewsSectionSkeleton />} factor={2}>
        <NewsSection title={t("home.middleEast")} slug="middle-east" />
      </SectionBoundary>

      <SectionBoundary id="home-blogs" fallback={<BlogSectionSkeleton />} factor={2.25}>
        <BlogSection />
      </SectionBoundary>

      <SectionBoundary
        id="home-gallery"
        fallback={<GallerySectionSkeleton type="video" count={videoItems.length} />}
        factor={2.5}
      >
        <GallerySection
          type="video"
          title={t("home.videos")}
          items={videoItems}
          footerHref="/gallery"
          footerLabel={t("common.seeMore")}
        />
      </SectionBoundary>
    </>
  );
};

export default HomePage;
