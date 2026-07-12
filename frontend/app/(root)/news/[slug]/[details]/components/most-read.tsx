"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./most-read.css";
import Link from "next/link";
import { useTranslations } from "@/hooks/use-translations";
import { CardItem, fetchNews, postToCard } from "@/lib/cms";
import { useLocale } from "@/hooks/use-locale";

const MostRead = ({ slug }: { slug: string }) => {
  const t = useTranslations();
  const { locale } = useLocale();
  const [items, setItems] = useState<CardItem[]>([]);

  useEffect(() => {
    fetchNews({ limit: 3, mostRead: true, sort: "views" }).then((posts) => {
      setItems(posts.map((post, index) => postToCard(post, locale, `/news/${slug}`, index)));
    });
  }, [locale, slug]);

  if (!items.length) return null;

  return (
    <section
      data-e2e="recommendations-heading"
      role="region"
      aria-labelledby="recommendations-heading"
      className="css-1o3v5ug"
    >
      <div className="css-79elbk e92pi9o0">
        <a href="#end-of-recommendations" className="css-12qz3pc e92pi9o1">
          Skip {t("news.mostRead")} and continue reading
        </a>
        <div className="css-110y4y1 e1jnsqox0">
          <strong className="css-a5e1ct e1jnsqox1">
            <span className="css-j7qwjs e1o9i7130">
              <span className="css-127x8fy e1o9i7132">
                <span dir="ltr" id="recommendations-heading" className="css-17vg121 e1o9i7133">
                  {t("news.mostRead")}
                </span>
              </span>
            </span>
          </strong>
        </div>
        <ul role="list" className="css-64y6r">
          {items.map((item, index) => (
            <li role="listitem" key={item.href}>
              <div data-e2e="recommendations-wrapper" className="css-qj66n0">
                <div className="css-i87o2a">
                  <div
                    className="css-1jir9cx most-read-img-wrapper"
                    style={{ paddingBottom: index === 0 ? "53.64%" : index === 1 ? "56.21%" : "66.7%" }}
                  >
                    <Image
                      alt={item.alt}
                      className="css-1seqhu9"
                      src={item.src}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
                <div className="css-6cb6xm">
                  <div className="css-pgata9">
                    <Link href={item.href} className="css-7tw9s9">
                      {item.title}
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p tabIndex={-1} id="end-of-recommendations" className="css-mcqrb5 e92pi9o2">
          End of {t("news.mostRead")}
        </p>
      </div>
    </section>
  );
};

export default MostRead;
