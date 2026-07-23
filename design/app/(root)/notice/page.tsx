"use client";

import React from "react";
import Hero from "@/components/hero";
import NoContent from "@/components/no-content";
import { useTranslations } from "@/hooks/use-translations";
import SectionBoundary from "@/components/dev/section-boundary";
import NoContentSkeleton from "@/components/no-content/no-content.skeleton";

const NoticePage = () => {
  const t = useTranslations();

  return (
    <>
      <Hero
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Notice"
        title={t("notice.heroTitle")}
        description={t("notice.heroDescription")}
        compact
      />
      <SectionBoundary id="notice-content" fallback={<NoContentSkeleton />}>
        <NoContent title={t("notice.emptyTitle")} description={t("notice.emptyDescription")} />
      </SectionBoundary>
    </>
  );
};

export default NoticePage;
