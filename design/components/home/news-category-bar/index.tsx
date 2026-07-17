"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "@/hooks/use-translations";
import { getHeaderNavItems, isNavItemActive } from "@/components/header/nav-items";
import "./style.css";

const NewsCategoryBar = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const navItems = getHeaderNavItems((key: string) => t(key));
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trackRef.current) {
      const activeItem = trackRef.current.querySelector(".news-category-bar__item--active") as HTMLElement;
      if (activeItem) {
        const trackWidth = trackRef.current.offsetWidth;
        const itemCenter = activeItem.offsetLeft + activeItem.offsetWidth / 2;
        trackRef.current.scrollTo({
          left: itemCenter - trackWidth / 2,
          behavior: "smooth",
        });
      }
    }
  }, [pathname]);

  return (
    <div className="news-category-bar">
      <div className="news-category-bar__track" ref={trackRef}>
        {navItems.map((item) => {
          const isActive = isNavItemActive(pathname, item.href);
          return (
            <Link
              key={item.label}
              href={item.href || "/"}
              className={`news-category-bar__item ${isActive ? "news-category-bar__item--active" : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NewsCategoryBar;
