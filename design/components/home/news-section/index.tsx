"use client";

import React from "react";
import Image from "@/components/ui/blur-image";
import Link from "next/link";
import SectionHeader from "@/components/section-header";
import SectionFooter from "@/components/section-footer";
import Wrapper from "@/components/wrapper";
import { useTranslations } from "@/hooks/use-translations";
import "./style.css";

const IMG_SOURCES = [
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517697471339-4aa32003c11a?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=600&q=80",
];

const NewsSection = ({
  title,
  slug,
  seeMore = true,
}: {
  title: string;
  slug?: string;
  seeMore?: boolean;
}) => {
  const t = useTranslations();
  if (!slug) slug = "general";

  const NEWS_TITLES = t("newsSection.tags.full") as unknown as string[];
  const NEWS_EXCERPTS = t("newsSection.descriptions") as unknown as string[];
  const NEWS_DATES = t("newsSection.dates") as unknown as string[];

  const generateCards = (s: string) =>
    Array.from({ length: 5 }, (_, i) => ({
      href: `/news/${s}/news-${i + 1}`,
      src: IMG_SOURCES[i % IMG_SOURCES.length],
      alt: NEWS_TITLES[i % NEWS_TITLES.length],
      title: NEWS_TITLES[i % NEWS_TITLES.length],
      excerpt: NEWS_EXCERPTS[i % NEWS_EXCERPTS.length],
      date: NEWS_DATES[i % NEWS_DATES.length],
      loaded: true,
    }));

  const cards = generateCards(slug);

  return (
    <section className="home-news-section">
      <Wrapper>
        <SectionHeader title={title} />
        <div className="home-news-featured-row">
          <div className="home-news-featured-main">
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
          </div>
          <div className="home-news-featured-side">
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
          </div>
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
        {seeMore && (
          <div className="home-news-footer">
            <SectionFooter href={slug ? `/news/${slug}` : "/news"} label={t("common.seeMore")} />
          </div>
        )}
      </Wrapper>
    </section>
  );
};

export default NewsSection;
