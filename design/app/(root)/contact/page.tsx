"use client";

import Hero from "@/components/hero";
import React from "react";
import ContactDetails from "./components/contact-details";
import { useTranslations } from "@/hooks/use-translations";
import SectionBoundary from "@/components/dev/section-boundary";
import ContactDetailsSkeleton from "./components/contact-details.skeleton";

const ContactUs = () => {
  const t = useTranslations();

  return (
    <>
      <Hero
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Contact Us"
        title={t("contact.heroTitle")}
        description={t("contact.heroDescription")}
        compact
      />
      <SectionBoundary id="contact-details" fallback={<ContactDetailsSkeleton />}>
        <ContactDetails />
      </SectionBoundary>
    </>
  );
};

export default ContactUs;
