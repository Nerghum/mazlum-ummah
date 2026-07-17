"use client";

import React from "react";
import PageBanner from "@/components/page-banner";
import { useTranslations } from "@/hooks/use-translations";

const GetInvolvedPage = () => {
  const t = useTranslations();

  return (
    <>
      <PageBanner title={t("getInvolved.title")} />
    </>
  );
};

export default GetInvolvedPage;
