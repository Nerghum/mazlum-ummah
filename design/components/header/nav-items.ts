export type SubmenuItem = {
  href: string;
  label: string;
};

export type HeaderNavItem = {
  href?: string;
  label: string;
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

export const isNavItemActive = (pathname: string, href?: string): boolean => {
  if (!href) return false;
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
};
