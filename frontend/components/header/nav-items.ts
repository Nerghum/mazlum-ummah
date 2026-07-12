import type { CmsMenuItem, LocaleCode } from "@/lib/cms";
import { text } from "@/lib/cms";

export type SubmenuItem = {
  href?: string;
  label: string;
  target?: "self" | "blank";
};

export type HeaderNavItem = {
  href?: string;
  label: string;
  target?: "self" | "blank";
  submenu?: SubmenuItem[];
};

type TranslationFn = (key: string) => string;

export function getHeaderNavItems(t: TranslationFn): HeaderNavItem[] {
  return [
    { href: "/", label: t("nav.home") },
    {
      label: t("nav.news"),
      href: "/news/sudan",
      submenu: [
        { href: "/news/sudan", label: t("nav.sudan") },
        { href: "/news/gaza", label: t("nav.gaza") },
        { href: "/news/middle-east", label: t("nav.middleEast") },
        { href: "/news/africa", label: t("nav.africa") },
      ],
    },
    { href: "/media-achievements", label: t("nav.mediaAchievements") },
    { href: "/social-posts", label: t("nav.socialPosts") },
    { href: "/gallery", label: t("nav.gallery") },
    { href: "/blogs", label: t("nav.blog") },
    { href: "/notice", label: t("nav.notice") },
    { href: "/contact", label: t("nav.contact") },
  ];
}

export function menuToHeaderNavItems(items: CmsMenuItem[], locale: LocaleCode): HeaderNavItem[] {
  return items
    .map((item) => {
      const label = text(item.label, locale);
      const submenu = (item.children || [])
        .map((child) => {
          const childLabel = text(child.label, locale);
          if (!childLabel) return null;

          return {
            href: cleanMenuUrl(child.url),
            label: childLabel,
            target: child.target,
          };
        })
        .filter(Boolean) as SubmenuItem[];

      if (!label || (!cleanMenuUrl(item.url) && !submenu.length)) return null;

      return {
        href: cleanMenuUrl(item.url),
        label,
        target: item.target,
        ...(submenu.length ? { submenu } : {}),
      };
    })
    .filter(Boolean) as HeaderNavItem[];
}

export function ensureSocialPostsNavItem(items: HeaderNavItem[], t: TranslationFn): HeaderNavItem[] {
  if (items.some((item) => item.href === "/social-posts" || item.submenu?.some((child) => child.href === "/social-posts"))) {
    return items;
  }

  const socialItem = { href: "/social-posts", label: t("nav.socialPosts") };
  const mediaIndex = items.findIndex((item) => item.href === "/media-achievements");
  if (mediaIndex === -1) return [...items, socialItem];

  return [
    ...items.slice(0, mediaIndex + 1),
    socialItem,
    ...items.slice(mediaIndex + 1),
  ];
}

export function cleanMenuUrl(href?: string) {
  const value = href?.trim();
  if (!value || value === "#" || value.toLowerCase().startsWith("javascript:")) return undefined;
  return value;
}

export function hasNavHref(href?: string) {
  return Boolean(cleanMenuUrl(href));
}

export const isNavItemActive = (pathname: string, href?: string): boolean => {
  const cleanHref = cleanMenuUrl(href);
  if (!cleanHref) return false;
  if (cleanHref === "/") {
    return pathname === "/";
  }

  return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`);
};
