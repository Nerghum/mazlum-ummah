"use client";

import React from "react";
import Image from "@/components/ui/blur-image";
import Link from "next/link";
import SectionHeader from "@/components/section-header";
import SectionFooter from "@/components/section-footer";
import { useTranslations } from "@/hooks/use-translations";
import "./style.css";

const BlogSection = () => {
  const t = useTranslations();

  const cards = [
    {
      href: "/blogs/hajj-training",
      src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80",
      alt: t("blog.titles[0]"),
      title: t("blog.titles[0]"),
      excerpt: t("blog.descriptions[0]"),
      date: t("blog.dates[0]"),
    },
    {
      href: "/blogs/qawmi-scholars",
      src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80",
      alt: t("blog.titles[1]"),
      title: t("blog.titles[1]"),
      excerpt: t("blog.descriptions[1]"),
      date: t("blog.dates[1]"),
    },
    {
      href: "/blogs/mazlum-ummah-eid",
      src: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=600&q=80",
      alt: t("blog.titles[2]"),
      title: t("blog.titles[2]"),
      excerpt: t("blog.descriptions[2]"),
      date: t("blog.dates[2]"),
    },
  ];

  return (
    <section className="blog-section">
      <SectionHeader title={t("blog.heading")} />
      <div className="blog-section__grid">
        {cards.map((card) => (
          <div key={card.href} className="blog-section__grid-item">
            <Link href={card.href} className="blog-card-link">
              <div className="blog-card__inner">
                <span className="blog-card__image-wrap">
                  <Image
                    src={card.src}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="blog-card__date">{card.date}</span>
                </span>
                <div className="blog-card__content">
                  <div className="blog-card__body">
                    <div className="blog-card__text">
                      <h3 className="blog-card__title">{card.title}</h3>
                      <p className="blog-card__excerpt">{card.excerpt}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="blog-section__footer">
        <SectionFooter href="/blogs" label={t("blog.heading")} />
      </div>
    </section>
  );
};

export default BlogSection;
