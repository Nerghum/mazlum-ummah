"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/components/wrapper";
import AdBanner from "@/components/ad-banner";
import { useTranslations } from "@/hooks/use-translations";
import { CardItem, fetchNews, postToCard } from "@/lib/cms";
import { useLocale } from "@/hooks/use-locale";
import "./style.css";

const BreakingNews = ({ items }: { items?: CardItem[] }) => {
  const t = useTranslations();
  const { locale } = useLocale();
  const [dynamicItems, setDynamicItems] = useState<CardItem[]>([]);
  const [isLoading, setIsLoading] = useState(!items);

  useEffect(() => {
    if (items) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    fetchNews({ limit: 8, breakingNews: true })
      .then((posts) => {
        setDynamicItems(posts.map((post, index) => postToCard(post, locale, "/news/general", index)));
      })
      .finally(() => setIsLoading(false));
  }, [items, locale]);

  const newsItems = (items || dynamicItems).map((item) => ({ href: item.href, img: item.src, alt: item.alt, title: item.title }));

  if (isLoading) {
    return null;
  }

  return (
    <section className="breaking-news-section">
      <Wrapper>
        <div className="breaking-news-header">
          <span className="breaking-news-label">{t("breakingNews.label")}</span>
        </div>
      </Wrapper>

      {!!newsItems.length && <div className="breaking-news-scroll">
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
      </div>}

      <div className="breaking-news-ad">
        <AdBanner position="breaking_news_banner" />
      </div>
    </section>
  );
};

export default BreakingNews;
