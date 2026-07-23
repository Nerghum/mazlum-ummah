"use client";

import React, { useState, useMemo } from "react";
import PageBanner from "@/components/page-banner";
import GallerySidebar from "./components/gallery-sidebar";
import GalleryGrid from "./components/gallery-grid";
import { galleryItems, categories } from "@/data/gallery-data";
import SectionBoundary from "@/components/dev/section-boundary";
import PageBannerSkeleton from "@/components/page-banner/page-banner.skeleton";
import GallerySidebarSkeleton from "./components/gallery-sidebar.skeleton";
import GalleryGridSkeleton from "./components/gallery-grid.skeleton";

const GalleryPage = () => {
  const [selectedType, setSelectedType] = useState<"image" | "video">("image");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedYear, setSelectedYear] = useState<string | number>("all");

  const availableYears = useMemo(() => {
    const yearsForCategory = galleryItems
      .filter((item) => {
        if (selectedCategory !== "all" && item.category !== selectedCategory) return false;
        return item.type === selectedType;
      })
      .map((item) => item.year);

    return [...new Set(yearsForCategory)].sort((a, b) => b - a);
  }, [selectedCategory, selectedType]);

  const showYearTabs = selectedCategory !== "all";

  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      if (item.type !== selectedType) return false;
      if (selectedCategory !== "all" && item.category !== selectedCategory) return false;
      if (selectedYear !== "all" && item.year !== selectedYear) return false;
      return true;
    });
  }, [selectedType, selectedCategory, selectedYear]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setSelectedYear("all");
  };

  const handleYearChange = (year: string | number) => {
    setSelectedYear(year);
  };

  return (
    <>
      <SectionBoundary
        id="gallery-banner"
        fallback={<PageBannerSkeleton hasTitle={false} />}
        factor={0.5}
      >
        <PageBanner
          adImageUrl="/banner.gif"
          adLinkUrl="https://business.linkedin.com/advertise/ads/ads-guide"
        />
      </SectionBoundary>
      <section className="MuiBox-root css-1evun54">
        <div className="gallery-layout-container">
          <div className="gallery-sidebar-wrapper">
            <SectionBoundary id="gallery-sidebar" fallback={<GallerySidebarSkeleton />}>
              <GallerySidebar
                selectedType={selectedType}
                onTypeChange={setSelectedType}
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                years={availableYears}
                selectedYear={selectedYear}
                onYearChange={handleYearChange}
                showYearTabs={showYearTabs}
              />
            </SectionBoundary>
          </div>
          <div className="gallery-grid-wrapper">
            <SectionBoundary id="gallery-grid" fallback={<GalleryGridSkeleton />} factor={1.5}>
              <GalleryGrid items={filteredItems} selectedType={selectedType} />
            </SectionBoundary>
          </div>
        </div>
      </section>
    </>
  );
};

export default GalleryPage;
