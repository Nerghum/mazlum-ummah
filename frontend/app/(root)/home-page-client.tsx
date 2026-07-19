"use client";

import { useMemo } from "react";
import GallerySection from "@/components/home/gallery-section";
import BlogSection from "@/components/home/blog-section";
import HomeHero from "@/components/home-hero";
import BreakingNews from "@/components/breaking-news";
import NewsSection from "@/components/home/news-section";
import AdBanner from "@/components/ad-banner";
import CrisisStats from "@/components/home/crisis-stats";
import { useTranslations } from "@/hooks/use-translations";
import { useLocale } from "@/hooks/use-locale";
import {
  CmsHomepageSection,
  CmsPost,
  categoryName,
  mediaUrl,
  postToCard,
  text,
} from "@/lib/cms";
import { GalleryItem } from "@/data/gallery-data";
import { youtubeIdFromUrl, youtubeThumbnailUrl } from "@/lib/video";

function cardList(posts: CmsPost[] | undefined, locale: "en" | "bn", prefix: string, limit = 6) {
  return (posts || []).slice(0, limit).map((post, index) => postToCard(post, locale, prefix, index));
}

function categorySlug(post: CmsPost) {
  return post.mainCategory?.slug || post.categories?.[0]?.slug || "general";
}

function isInCategory(post: CmsPost, category: { _id?: string; slug?: string }) {
  return (
    post.mainCategory?._id === category._id
    || post.mainCategory?.slug === category.slug
    || (post.categories || []).some((item) => item._id === category._id || item.slug === category.slug)
  );
}

function categoryTitle(sectionTitle: string, category: CmsPost["mainCategory"], locale: "en" | "bn") {
  return categoryName(category, locale) || sectionTitle;
}

const HomePageClient = ({ 
  sections, 
  autoVideos, 
  autoHeroPosts 
}: { 
  sections: CmsHomepageSection[]; 
  autoVideos: GalleryItem[]; 
  autoHeroPosts: CmsPost[]; 
}) => {
  const t = useTranslations();
  const { locale } = useLocale();

  const orderedSections = useMemo(() => sections.filter((section) => section.isActive !== false).sort((a, b) => (a.order || 0) - (b.order || 0)), [sections]);

  const { todayStart, todayEnd } = useMemo(() => {
    const now = new Date();
    return {
      todayStart: new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString(),
      todayEnd: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).toISOString()
    };
  }, []);

  if (orderedSections.length) {
    return (
      <>
        {orderedSections.map((section) => {
          const mode = section.settings?.mode || "auto";
          const limit = section.settings?.limit || 6;
          const sectionTitle = text(section.title, locale);

          if (section.type === "Hero Slider") {
            const posts = mode === "manual" && section.news?.length ? section.news : autoHeroPosts;
            const manualSlides = (section.cards || []).filter((card) => card.imageUrl || text(card.title, locale) || card.link);
            if (mode === "manual" && !manualSlides.length && !section.news?.length) return null;
            return (
              <HomeHero
                key={section._id}
                title={t("hero.title")}
                slides={manualSlides.length
                  ? manualSlides.map((card) => ({
                    bgImage: card.imageUrl || "/hero-bg.png",
                    title: text(card.title, locale),
                    buttonText: text(card.buttonText, locale),
                    href: card.link || "/about",
                  }))
                  : posts.map((post, index) => ({
                    bgImage: mediaUrl(post.thumbnailImage, index),
                    title: text(post.title, locale),
                    href: `/news/${categorySlug(post)}/${post.slug}`,
                  }))}
              />
            );
          }

          if (section.type === "Breaking News") {
            const items = mode === "manual" && section.news?.length ? cardList(section.news, locale, "/news/general", limit) : undefined;
            return <BreakingNews key={section._id} items={items} />;
          }

          if (section.type === "Today's News") {
            if (mode === "manual" && section.news?.length) {
              const todaysPosts = section.news.filter(post => {
                if (!post.publishDate) return false;
                const d = new Date(post.publishDate);
                const now = new Date();
                return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
              });
              if (todaysPosts.length === 0) return null;
              return <NewsSection key={section._id} title={sectionTitle || t("home.todayNews")} seeMore={false} items={cardList(todaysPosts, locale, "/news/general", limit)} />;
            }
            return <NewsSection key={section._id} title={sectionTitle || t("home.todayNews")} seeMore={false} fetchOptions={{ dateFrom: todayStart, dateTo: todayEnd }} />;
          }

          if (section.type === "Latest News") {
            const items = mode === "manual" && section.news?.length ? cardList(section.news, locale, "/news/general", limit) : undefined;
            return <NewsSection key={section._id} title={sectionTitle || t("home.latestNews")} seeMore={true} items={items} fetchOptions={{ sort: "-updatedAt" }} />;
          }

          if (["Featured News", "Most Read", "Editor Picks", "Trending News", "Country-wise News"].includes(section.type)) {
            const items = section.news?.length ? cardList(section.news, locale, "/news/general", limit) : undefined;
            return <NewsSection key={section._id} title={sectionTitle} items={items} />;
          }

          if (section.type === "Manual Cards") {
            return <CrisisStats key={section._id} numberOverrides={section.settings?.crisisNumbers} />;
          }

          if (section.type === "News Categories") {
            return (
              <div key={section._id}>
                {(section.categories || []).map((category) => {
                  const manual = (section.news || []).filter((post) => isInCategory(post, category));
                  const items = mode === "manual" ? cardList(manual, locale, `/news/${category.slug}`, limit) : undefined;
                  return <NewsSection key={category._id || category.slug} title={categoryTitle(sectionTitle, category, locale)} slug={category.slug} items={items} />;
                })}
              </div>
            );
          }

          if (section.type === "Blog Categories") {
            return (
              <div key={section._id}>
                {(section.categories || []).map((category) => {
                  const manual = (section.blogs || []).filter((post) => isInCategory(post, category));
                  const items = mode === "manual" ? cardList(manual, locale, "/blogs", limit) : undefined;
                  return <BlogSection key={category._id || category.slug} title={categoryTitle(sectionTitle, category, locale)} slug={category.slug} items={items} />;
                })}
              </div>
            );
          }

          if (section.type === "Video News") {
            const sourcePosts = mode === "manual" && section.news?.length ? section.news : [];
            const items = sourcePosts.length ? sourcePosts.filter((post) => youtubeIdFromUrl(post.videoUrl || "")).map((post, index) => ({
              id: post._id,
              type: "video" as const,
              category: categorySlug(post),
              year: new Date(post.publishDate || Date.now()).getFullYear(),
              src: youtubeThumbnailUrl(post.videoUrl || "") || mediaUrl(post.thumbnailImage, index),
              youtubeId: youtubeIdFromUrl(post.videoUrl || ""),
              title: text(post.title, locale),
              href: `/news/${categorySlug(post)}/${post.slug}`,
            })) : autoVideos;
            return <GallerySection key={section._id} type="video" title={sectionTitle || t("home.videos")} items={items} footerHref="/gallery" footerLabel={t("common.seeMore")} />;
          }

          if (section.type === "Ad Slot") {
            return <AdBanner key={section._id} position={section.adPosition || section.key} />;
          }

          return null;
        })}
      </>
    );
  }

  return (
    <>
      <HomeHero title={t("hero.title")} />
      <BreakingNews />
      <NewsSection title={t("home.todayNews")} seeMore={false} fetchOptions={{ dateFrom: todayStart, dateTo: todayEnd }} />
      <NewsSection title={t("home.latestNews")} seeMore={true} fetchOptions={{ sort: "-updatedAt" }} />
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
        items={autoVideos}
        footerHref="/gallery"
        footerLabel={t("common.seeMore")}
      />
    </>
  );
};

export default HomePageClient;
