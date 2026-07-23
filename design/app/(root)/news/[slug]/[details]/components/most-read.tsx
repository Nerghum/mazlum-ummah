"use client";

import React from "react";
import Image from "@/components/ui/blur-image";
import "./most-read.css";
import Link from "next/link";
import { useTranslations } from "@/hooks/use-translations";

const MostRead = ({ slug }: { slug: string }) => {
  const t = useTranslations();
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
          <li role="listitem">
            <div data-e2e="recommendations-wrapper" className="css-qj66n0">
              <div className="css-i87o2a">
                <div
                  className="css-1jir9cx most-read-img-wrapper"
                  style={{ paddingBottom: "53.64%" }}
                >
                  <Image
                    alt={t("news.articles.0.alt")}
                    className="css-1seqhu9"
                    src="https://ichef.bbci.co.uk/ace/ws/660/cpsprodpb/b13c/live/ce5fff10-4fa2-11f1-b682-cf91850925ea.jpg.webp"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
              <div className="css-6cb6xm">
                <div className="css-pgata9">
                  <Link href={`/news/${slug}/business-64444189`} className="css-7tw9s9">
                    {t("news.articles.0.title")}{" "}
                  </Link>
                </div>
              </div>
            </div>
          </li>
          <li role="listitem">
            <div data-e2e="recommendations-wrapper" className="css-qj66n0">
              <div className="css-i87o2a">
                <div
                  className="css-1jir9cx most-read-img-wrapper"
                  style={{ paddingBottom: "56.21%" }}
                >
                  <Image
                    alt={t("news.articles.1.alt")}
                    className="css-1seqhu9"
                    src="https://ichef.bbci.co.uk/ace/ws/660/cpsprodpb/9157/live/5a490ce0-5126-11f1-a5d4-1388da3b9f7b.jpg.webp"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
              <div className="css-6cb6xm">
                <div className="css-pgata9">
                  <Link href="{`/news/${slug}/bengali-64444189`}" className="css-7tw9s9">
                    {t("news.articles.1.title")}
                  </Link>
                </div>
              </div>
            </div>
          </li>
          <li role="listitem">
            <div data-e2e="recommendations-wrapper" className="css-qj66n0">
              <div className="css-i87o2a">
                <div
                  className="css-1jir9cx most-read-img-wrapper"
                  style={{ paddingBottom: "66.7%" }}
                >
                  <Image
                    alt={t("news.articles.2.alt")}
                    className="css-1seqhu9"
                    src="https://ichef.bbci.co.uk/ace/ws/660/cpsprodpb/1b87/live/5122ec60-519b-11f1-8b8c-6d33e1d5abb6.jpg.webp"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
              <div className="css-6cb6xm">
                <div className="css-pgata9">
                  <Link href="{`/news/${slug}/bengali-64444189`}" className="css-7tw9s9">
                    {t("news.articles.2.title")}
                  </Link>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <p tabIndex={-1} id="end-of-recommendations" className="css-mcqrb5 e92pi9o2">
          End of {t("news.mostRead")}
        </p>
      </div>
    </section>
  );
};

export default MostRead;
