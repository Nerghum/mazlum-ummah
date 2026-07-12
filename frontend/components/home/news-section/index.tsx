"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/section-header";
import SectionFooter from "@/components/section-footer";
import Wrapper from "@/components/wrapper";
import { SkeletonHomeNewsSection } from "@/components/skeleton-loader";
import { useTranslations } from "@/hooks/use-translations";
import { CardItem, fetchNews, postToCard } from "@/lib/cms";
import { useLocale } from "@/hooks/use-locale";
import "./style.css";

const NewsSection = ({
  title,
  slug,
  seeMore = true,
  items,
}: {
  title: string;
  slug?: string;
  seeMore?: boolean;
  items?: CardItem[];
}) => {
  const t = useTranslations();
  const { locale } = useLocale();
  const [dynamicCards, setDynamicCards] = useState<CardItem[]>([]);
  const [isLoading, setIsLoading] = useState(!items);
  if (!slug) slug = "general";

  useEffect(() => {
    if (items) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    fetchNews({ limit: 12, categorySlug: slug === "general" ? undefined : slug })
      .then((posts) => {
        setDynamicCards(posts.map((post, index) => postToCard(post, locale, `/news/${slug}`, index)));
      })
      .finally(() => setIsLoading(false));
  }, [items, locale, slug]);

  const cards = (items || dynamicCards).slice(0, 5);

  if (isLoading) {
    return <SkeletonHomeNewsSection />;
  }

  return (
    <section className="home-news-section">
      <Wrapper>
        <SectionHeader title={title} />
        <div className="home-news-featured-row">
          {cards[0] && <div className="home-news-featured-main">
            <Link href={cards[0].href} className="home-news-card-link">
              <div className="home-news-featured-horizontal">
                <span className="home-news-img home-news-img-wide">
                  <Image
                    src={cards[0].src}
                    alt={cards[0].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="home-news-date">{cards[0].date}</span>
                </span>
                <div className="home-news-featured-text">
                  <div className="home-news-featured-text-inner">
                    <div className="home-news-text-wrap">
                      <h2 className="home-news-title">{cards[0].title}</h2>
                      <p className="home-news-excerpt">{cards[0].excerpt}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>}
          {cards[1] && <div className="home-news-featured-side">
            <Link href={cards[1].href} className="home-news-card-link">
              <div className="home-news-card home-news-card-second">
                <span className="home-news-img home-news-img-square">
                  <Image
                    src={cards[1].src}
                    alt={cards[1].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="home-news-date">{cards[1].date}</span>
                </span>
                <div className="home-news-card-text">
                  <div className="home-news-card-text-inner">
                    <div className="home-news-text-wrap">
                      <h2 className="home-news-title">{cards[1].title}</h2>
                      <p className="home-news-excerpt">{cards[1].excerpt}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>}
        </div>
        <div className="home-news-grid">
          {cards.slice(2).map((card) => (
            <div key={card.href} className="home-news-grid-item">
              <Link href={card.href} className="home-news-card-link">
                <div className="home-news-card">
                  <span className="home-news-img home-news-img-square">
                    <Image
                      src={card.src}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                    <span className="home-news-date">{card.date}</span>
                  </span>
                  <div className="home-news-card-text">
                    <div className="home-news-card-text-inner">
                      <div className="home-news-text-wrap">
                        <h2 className="home-news-title">{card.title}</h2>
                        <p className="home-news-excerpt">{card.excerpt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {!cards.length && (
          <p className="py-6 text-center text-sm text-gray-500">{t("common.noData") || "No news found."}</p>
        )}
        {seeMore && (
          <div className="home-news-footer">
            <SectionFooter href={`/news/${slug}`} label={t("common.seeMore")} />
          </div>
        )}
      </Wrapper>
    </section>
  );
};

export default NewsSection;
