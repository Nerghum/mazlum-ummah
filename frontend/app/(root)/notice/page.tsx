"use client";

import React, { useEffect, useState } from "react";
import PageBanner from "@/components/page-banner";
import NoContent from "@/components/no-content";
import { useTranslations } from "@/hooks/use-translations";
import { useLocale } from "@/hooks/use-locale";
import { CmsNotice, fetchNotices, formatCmsDate, text } from "@/lib/cms";
import { SkeletonNoticeList } from "@/components/skeleton-loader";
import "./style.css";

const NoticePage = () => {
  const t = useTranslations();
  const { locale } = useLocale();
  const [notices, setNotices] = useState<CmsNotice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchNotices(80).then(setNotices).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageBanner title={t("notice.title")} subtitle={t("notice.subtitle")} />
      <main className="notice-page">
        <div className="notice-page__header">
          <span className="notice-page__eyebrow">{t("notice.title")}</span>
          <h2 className="notice-page__heading">{t("notice.subtitle")}</h2>
        </div>
        {loading && <SkeletonNoticeList />}
        {!loading && !notices.length && <NoContent title={t("notice.emptyTitle")} description={t("notice.emptyDescription")} />}
        <div className="notice-list">
          {notices.map((notice) => (
            <article
              id={notice.slug}
              key={notice._id}
              className={`notice-card ${notice.isPinned ? "notice-card--pinned" : ""}`}
            >
              <div className="notice-card__rail" aria-hidden="true" />
              <div className="notice-card__body">
                <div className="notice-card__meta">
                  {notice.isPinned && <span className="notice-card__badge">Pinned</span>}
                  {notice.publishDate && <span className="notice-card__date">{formatCmsDate(notice.publishDate, locale)}</span>}
                </div>
                <h3 className="notice-card__title">{text(notice.title, locale)}</h3>
                {text(notice.summary, locale) && <p className="notice-card__summary">{text(notice.summary, locale)}</p>}
                <div className="notice-card__content">{text(notice.content, locale)}</div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
};

export default NoticePage;
