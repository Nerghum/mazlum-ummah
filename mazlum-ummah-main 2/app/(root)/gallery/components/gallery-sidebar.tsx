"use client";

import React from "react";
import { useTranslations } from "@/hooks/use-translations";
import "./gallery-sidebar.css";

type GallerySidebarProps = {
  selectedType: "image" | "video";
  onTypeChange: (type: "image" | "video") => void;
  categories: { label: string; value: string }[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  years: number[];
  selectedYear: string | number;
  onYearChange: (year: string | number) => void;
  showYearTabs: boolean;
};

const GallerySidebar = ({
  selectedType,
  onTypeChange,
  categories,
  selectedCategory,
  onCategoryChange,
  years,
  selectedYear,
  onYearChange,
  showYearTabs,
}: GallerySidebarProps) => {
  const t = useTranslations();

  const yearLabels: Record<number, string> = {};
  const yearsArray = t("gallery.years");
  if (Array.isArray(yearsArray)) {
    yearsArray.forEach((label: string, index: number) => {
      const yearKeys = [2025, 2024, 2023, 2022, 2021, 2020, 2019];
      if (yearKeys[index]) {
        yearLabels[yearKeys[index]] = label;
      }
    });
  }

  return (
    <div className="gallery-sidebar">
      <div className="gallery-sidebar-toggle">
        <button
          className={`gallery-sidebar-toggle-btn gallery-sidebar-toggle-btn--image ${
            selectedType === "image"
              ? "gallery-sidebar-toggle-btn--active"
              : "gallery-sidebar-toggle-btn--inactive"
          }`}
          onClick={() => onTypeChange("image")}
        >
          {t("gallery.photos")}
        </button>
        <button
          className={`gallery-sidebar-toggle-btn ${
            selectedType === "video"
              ? "gallery-sidebar-toggle-btn--active"
              : "gallery-sidebar-toggle-btn--inactive"
          }`}
          onClick={() => onTypeChange("video")}
        >
          {t("gallery.videos")}
        </button>
      </div>

      <hr className="gallery-sidebar-hr gallery-sidebar-hr--after-toggle" />

      <div className="gallery-sidebar-categories">
        {categories.map((cat, idx) => (
          <React.Fragment key={cat.value}>
            {idx > 0 && <hr className="gallery-sidebar-hr" />}
            <button
              className={`gallery-sidebar-cat-btn ${
                selectedCategory === cat.value ? "gallery-sidebar-cat-btn--active" : ""
              }`}
              onClick={() => onCategoryChange(cat.value)}
            >
              {cat.label}
            </button>
          </React.Fragment>
        ))}
      </div>

      {showYearTabs && years.length > 0 && (
        <div className="gallery-sidebar-year-tabs">
          <button
            className={`gallery-sidebar-year-btn ${
              selectedYear === "all"
                ? "gallery-sidebar-year-btn--active"
                : "gallery-sidebar-year-btn--inactive"
            }`}
            onClick={() => onYearChange("all")}
          >
            {t("common.all")}
          </button>
          {years.map((year) => (
            <button
              key={year}
              className={`gallery-sidebar-year-btn ${
                selectedYear === year
                  ? "gallery-sidebar-year-btn--active"
                  : "gallery-sidebar-year-btn--inactive"
              }`}
              onClick={() => onYearChange(year)}
            >
              {yearLabels[year] || String(year)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GallerySidebar;
