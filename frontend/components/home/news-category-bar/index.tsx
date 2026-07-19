"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "@/hooks/use-translations";
import { useLocale } from "@/hooks/use-locale";
import { fetchMenuItems } from "@/lib/cms";
import {
  ensureSocialPostsNavItem,
  getHeaderNavItems,
  isNavItemActive,
  menuToHeaderNavItems,
} from "@/components/header/nav-items";
import type { HeaderNavItem } from "@/components/header/nav-items";
import "./style.css";

const NewsCategoryBar = () => {
  const t = useTranslations();
  const { locale } = useLocale();
  const pathname = usePathname();
  const [cmsNavItems, setCmsNavItems] = useState<HeaderNavItem[]>([]);

  useEffect(() => {
    let mounted = true;

    fetchMenuItems().then((items) => {
      if (mounted) {
        setCmsNavItems(menuToHeaderNavItems(items, locale));
      }
    });

    return () => {
      mounted = false;
    };
  }, [locale]);

  const navItems = ensureSocialPostsNavItem(
    cmsNavItems.length ? cmsNavItems : getHeaderNavItems((key: string) => t(key)),
    (key: string) => t(key)
  );

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
          const isActive =
            isNavItemActive(pathname, item.href) ||
            Boolean(item.submenu?.some((submenuItem) => isNavItemActive(pathname, submenuItem.href)));
          const linkTarget = item.target === "blank" ? "_blank" : undefined;
          const linkRel = item.target === "blank" ? "noopener noreferrer" : undefined;

          return (
            <Link
              key={`${item.label}-${item.href || "nav"}`}
              href={item.href || "/"}
              className={`news-category-bar__item ${isActive ? "news-category-bar__item--active" : ""}`}
              target={linkTarget}
              rel={linkRel}
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
