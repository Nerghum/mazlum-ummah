"use client";

import Image from "@/components/ui/blur-image";
import "./not-found.css";
import Link from "next/link";
import { useTranslations } from "@/hooks/use-translations";
import Header from "@/components/header";
import Footer from "@/components/footer";

const NotFound = () => {
  const t = useTranslations();

  return (
    <>
      <Header />
      <section className="not-found-container">
        <div>
          <h3 className="not-found-title">{t("notFound.heading")}</h3>
          <p className="not-found-description">{t("notFound.description")}</p>
          <Image
            src="/not-found.svg"
            alt="404 background"
            width={500}
            height={300}
            className="not-found-image"
          />
        </div>
        <div className="not-found-button-wrapper">
          <Link href="/" className="not-found-button">
            {t("notFound.backToHome")}
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default NotFound;
