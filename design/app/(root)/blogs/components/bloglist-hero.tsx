"use client";

import Hero from "@/components/hero";
import { useTranslations } from "@/hooks/use-translations";

/**
 * The blogs listing hero. Kept out of BlogList so the page can render it
 * outside the Suspense boundary — the hero never shows a skeleton.
 */
const BlogListHero = () => {
  const t = useTranslations();

  return (
    <Hero
      image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
      imageAlt="ব্লগ ব্যাকগ্রাউন্ড"
      badge={t("blog.badge")}
      title={
        <>
          {t("blog.tagline1")} {t("blog.tagline2")}
        </>
      }
      description={t("blog.description")}
      compact
    />
  );
};

export default BlogListHero;
