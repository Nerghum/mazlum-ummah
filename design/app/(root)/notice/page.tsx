"use client";

import React from "react";
import Hero from "@/components/hero";
import NoContent from "@/components/no-content";
import { useTranslations } from "@/hooks/use-translations";

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
      <NoContent title={t("notice.emptyTitle")} description={t("notice.emptyDescription")} />
    </>
  );
};

export default NoticePage;
