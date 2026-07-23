"use client";

import React from "react";
import PageBanner from "@/components/page-banner";
import { useTranslations } from "@/hooks/use-translations";
import SectionBoundary from "@/components/dev/section-boundary";
import PageBannerSkeleton from "@/components/page-banner/page-banner.skeleton";

const GetInvolvedPage = () => {
  const t = useTranslations();

  return (
    <>
      <SectionBoundary id="get-involved-banner" fallback={<PageBannerSkeleton hasAd={false} />}>
        <PageBanner title={t("getInvolved.title")} />
      </SectionBoundary>
    </>
  );
};

export default GetInvolvedPage;
