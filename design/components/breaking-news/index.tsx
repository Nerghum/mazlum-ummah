"use client";

import React from "react";
import Image from "@/components/ui/blur-image";
import Link from "next/link";
import Wrapper from "@/components/wrapper";
import AdBanner from "@/components/ad-banner";
import { useTranslations } from "@/hooks/use-translations";
import "./style.css";

const BREAKING_NEWS_HREFS = [
  "/news/sudan/news-1",
  "/news/gaza/news-1",
  "/news/middle-east/news-1",
  "/news/sudan/news-2",
  "/news/gaza/news-2",
  "/news/middle-east/news-2",
];

const BREAKING_NEWS_IMGS = [
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1517697471339-4aa32003c11a?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=200&q=80",
];

const BreakingNews = () => {
  const t = useTranslations();
  const items = t("breakingNews.items") as unknown as Array<{ alt: string; title: string }>;

  const newsItems = items.map((item, i) => ({
    href: BREAKING_NEWS_HREFS[i],
    img: BREAKING_NEWS_IMGS[i],
    alt: item.alt,
    title: item.title,
  }));

  return (
    <section className="breaking-news-section">
      <Wrapper>
        <div className="breaking-news-header">
          <span className="breaking-news-label">{t("breakingNews.label")}</span>
        </div>
      </Wrapper>

      <div className="breaking-news-scroll">
        <div className="breaking-news-track">
          {[...newsItems, ...newsItems, ...newsItems].map((item, i) => (
            <Link href={item.href} key={i} className="breaking-news-card">
              <div className="breaking-news-card-img">
                <Image
                  src={item.img}
                  alt={item.alt}
                  fill
                  sizes="80px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="breaking-news-card-text">
                <span className="breaking-news-card-title">{item.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="breaking-news-ad">
        <AdBanner />
      </div>
    </section>
  );
};

export default BreakingNews;
