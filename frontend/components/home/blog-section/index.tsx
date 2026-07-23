"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/section-header";
import SectionFooter from "@/components/section-footer";
import { useTranslations } from "@/hooks/use-translations";
import { CardItem, fetchBlogs, fetchBlogsByCategory, postToCard } from "@/lib/cms";
import { useLocale } from "@/hooks/use-locale";
import "./style.css";

const BlogSection = ({
  title,
  slug,
  items,
}: {
  title?: string;
  slug?: string;
  items?: CardItem[];
}) => {
  const t = useTranslations();
  const { locale } = useLocale();
  const [dynamicCards, setDynamicCards] = useState<CardItem[]>([]);
  const [isLoading, setIsLoading] = useState(!items);

  useEffect(() => {
    if (items) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const request = slug ? fetchBlogsByCategory(slug, 6) : fetchBlogs(6);
    request
      .then((posts) => {
        setDynamicCards(posts.map((post, index) => postToCard(post, locale, "/blogs", index)));
      })
      .finally(() => setIsLoading(false));
  }, [items, locale, slug]);

  const cards = (items || dynamicCards).slice(0, 3);

  if (isLoading) {
    return null;
  }

  return (
    <section className="blog-section">
      <SectionHeader title={title || t("blog.heading")} />
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
      {!cards.length && (
        <p className="py-6 text-center text-sm text-gray-500">No blogs found.</p>
      )}
      <div className="blog-section__footer">
        <SectionFooter href={slug ? `/blogs/category/${slug}` : "/blogs"} label={t("blog.heading")} />
      </div>
    </section>
  );
};

export default BlogSection;
