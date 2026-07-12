"use client";

import PageBanner from "@/components/page-banner";
import React from "react";
import PrivacyContent from "./components/privacy-content";
import { useTranslations } from "@/hooks/use-translations";

const PrivacyPolicy = () => {
  const t = useTranslations();

  return (
    <>
      <PageBanner title={t("privacy.title")} />
      <PrivacyContent />
    </>
  );
};

export default PrivacyPolicy;
