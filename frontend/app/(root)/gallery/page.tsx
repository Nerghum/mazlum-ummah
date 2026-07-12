"use client";

import React, { useEffect, useMemo, useState } from "react";
import PageBanner from "@/components/page-banner";
import GallerySidebar from "./components/gallery-sidebar";
import GalleryGrid from "./components/gallery-grid";
import { GalleryItem } from "@/data/gallery-data";
import { CmsCategory, categoryName, fetchCategories, fetchNews, mediaUrl, text } from "@/lib/cms";
import { useLocale } from "@/hooks/use-locale";
import { youtubeIdFromUrl, youtubeThumbnailUrl } from "@/lib/video";

const GalleryPage = () => {
  const { locale } = useLocale();
  const [selectedType, setSelectedType] = useState<"image" | "video">("image");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedYear, setSelectedYear] = useState<string | number>("all");
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [newsCategories, setNewsCategories] = useState<CmsCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    Promise.all([fetchCategories("news"), fetchNews(100)]).then(([categoriesData, posts]) => {
      const items: GalleryItem[] = [];

      posts.forEach((post) => {
        const primaryCategory = post.mainCategory || post.categories?.[0];
        const categorySlug = primaryCategory?.slug || "uncategorized";
        const categoryLabel = categoryName(primaryCategory, locale) || (locale === "bn" ? "বিভাগহীন" : "Uncategorized");
        const year = post.publishDate ? new Date(post.publishDate).getFullYear() : new Date().getFullYear();
        const title = text(post.title, locale);
        const thumbnailImage = post.thumbnailImage ? [{
          id: `${post._id}-thumbnail`,
          type: "image" as const,
          category: categorySlug,
          categoryLabel,
          year,
          src: mediaUrl(post.thumbnailImage, 0),
          title,
        }] : [];
        const galleryImages = [
          ...thumbnailImage,
          ...(post.imageGallery || []).map((media, index) => ({
          id: `${post._id}-image-${index}`,
          type: "image" as const,
          category: categorySlug,
          categoryLabel,
          year,
          src: mediaUrl(media, index),
          title: `${title}${post.imageGallery && post.imageGallery.length > 1 ? ` ${index + 1}` : ""}`,
          })),
        ];

        if (galleryImages.length) {
          items.push({
            id: `${post._id}-gallery`,
            type: "image",
            category: categorySlug,
            categoryLabel,
            year,
            src: galleryImages[0].src,
            title,
            images: galleryImages,
          });
        }

        const youtubeId = youtubeIdFromUrl(post.videoUrl || "");
        if (youtubeId) {
          items.push({
            id: `${post._id}-video`,
            type: "video",
            category: categorySlug,
            categoryLabel,
            year,
            src: youtubeThumbnailUrl(post.videoUrl || ""),
            youtubeId,
            title,
          });
        }
      });

      if (!mounted) return;
      setNewsCategories(categoriesData);
      setGalleryItems(items);
      setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, [locale]);

  const categories = useMemo(() => {
    return [
      { value: "all", label: locale === "bn" ? "সবগুলো" : "All" },
      ...newsCategories.map((category) => ({ value: category.slug || "", label: categoryName(category, locale) || category.slug || "" })).filter((category) => category.value)
    ];
  }, [newsCategories, locale]);

  const availableYears = useMemo(() => {
    const yearsForCategory = galleryItems
      .filter((item) => {
        if (selectedCategory !== "all" && item.category !== selectedCategory) return false;
        return item.type === selectedType;
      })
      .map((item) => item.year);

    return [...new Set(yearsForCategory)].sort((a, b) => b - a);
  }, [galleryItems, selectedCategory, selectedType]);

  const showYearTabs = selectedCategory !== "all";

  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      if (item.type !== selectedType) return false;
      if (selectedCategory !== "all" && item.category !== selectedCategory) return false;
      if (selectedYear !== "all" && item.year !== selectedYear) return false;
      return true;
    });
  }, [galleryItems, selectedType, selectedCategory, selectedYear]);

  const handleTypeChange = (type: "image" | "video") => {
    setSelectedType(type);
    setSelectedCategory("all");
    setSelectedYear("all");
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setSelectedYear("all");
  };

  const handleYearChange = (year: string | number) => {
    setSelectedYear(year);
  };

  return (
    <>
      <PageBanner
        adImageUrl="/banner.gif"
        adLinkUrl="https://business.linkedin.com/advertise/ads/ads-guide"
        adPosition="gallery_page_banner"
      />
      <section className="MuiBox-root css-1evun54">
        <div className="gallery-layout-container">
          <div className="gallery-sidebar-wrapper">
            <GallerySidebar
              selectedType={selectedType}
              onTypeChange={handleTypeChange}
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              years={availableYears}
              selectedYear={selectedYear}
              onYearChange={handleYearChange}
              showYearTabs={showYearTabs}
            />
          </div>
          <div className="gallery-grid-wrapper">
            <GalleryGrid items={filteredItems} selectedType={selectedType} loading={loading} />
          </div>
        </div>
      </section>
    </>
  );
};

export default GalleryPage;
