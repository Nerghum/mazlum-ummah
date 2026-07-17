"use client";

import PageBanner from "@/components/page-banner";
import React from "react";
import ContactDetails from "./components/contact-details";
import { useTranslations } from "@/hooks/use-translations";

const ContactUs = () => {
  const t = useTranslations();

  return (
    <>
      <PageBanner
        title={t("contact.heroTitle")}
        subtitle={t("contact.heroDescription")}
      />
      <ContactDetails />
    </>
  );
};

export default ContactUs;
