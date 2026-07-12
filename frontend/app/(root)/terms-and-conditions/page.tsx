"use client";

import PageBanner from "@/components/page-banner";
import TermsContent from "./components/terms-content";
import { useTranslations } from "@/hooks/use-translations";

const TermsAndConditions = () => {
  const t = useTranslations();

  return (
    <>
      <PageBanner title={t("terms.title")} />
      <TermsContent />
    </>
  );
};

export default TermsAndConditions;
