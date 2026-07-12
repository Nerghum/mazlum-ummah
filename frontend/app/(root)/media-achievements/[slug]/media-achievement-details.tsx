"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocale } from "@/hooks/use-locale";
import { fetchMediaAchievementBySlug, fetchMediaAchievements, mediaUrl, text, type CmsMediaAchievement } from "@/lib/cms";
import { youtubeEmbedUrl, youtubeThumbnailUrl } from "@/lib/video";
import { SkeletonFeatureListContent } from "@/components/skeleton-loader";
import "../style.css";

type DetailsProps = {
  slug: string;
};

function imageFor(item: CmsMediaAchievement) {
  return youtubeThumbnailUrl(item.videoUrl || "") || mediaUrl(item.thumbnailImage);
}

const MediaAchievementDetails = ({ slug }: DetailsProps) => {
  const { locale } = useLocale();
  const [item, setItem] = useState<CmsMediaAchievement | null | undefined>(undefined);
  const [related, setRelated] = useState<CmsMediaAchievement[]>([]);

  useEffect(() => {
    fetchMediaAchievementBySlug(slug).then((data) => setItem(data || null));
    fetchMediaAchievements(4).then((items) => setRelated(items.filter((entry) => entry.slug !== slug).slice(0, 3)));
  }, [slug]);

  if (item === undefined) {
    return <SkeletonFeatureListContent />;
  }

  if (!item) {
    return <main className="container main-content"><p className="py-10 text-center text-sm text-gray-500">Media achievement not found.</p></main>;
  }

  const embedUrl = youtubeEmbedUrl(item.videoUrl || "");

  return (
    <main className="container main-content">
      <article className="feature-card">
        <div className="feature-grid">
          <div className="feature-image-wrapper">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={text(item.title, locale)}
                className="feature-image"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <Image
                src={imageFor(item)}
                alt={text(item.title, locale)}
                className="feature-image"
                fill
                sizes="(max-width: 1023px) 100vw, 45vw"
                style={{ objectFit: "cover" }}
              />
            )}
            <div className="feature-image-overlay"></div>
          </div>

          <div className="feature-text-wrapper">
            <div>
              <p className="gallery-card-description description-accent">{text(item.source, locale)}</p>
              <h1 className="feature-headline">{text(item.title, locale)}</h1>
              <p className="feature-description">{text(item.shortDescription, locale)}</p>
            </div>

            <div className="feature-footer">
              <span className="feature-author">{text(item.achievementDate, locale)}</span>
              {item.externalUrl && (
                <a href={item.externalUrl} target="_blank" rel="noopener noreferrer" className="feature-link">
                  {text(item.linkLabel, locale) || "Read"}
                  <ChevronRight size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </article>

      <article className="feature-card">
        <div className="feature-text-wrapper">
          <div className="html_Container" dangerouslySetInnerHTML={{ __html: text(item.content, locale) }} />
        </div>
      </article>

      {!!item.imageGallery?.length && (
        <section className="gallery-grid">
          {item.imageGallery.map((media, index) => (
            <div key={`${media.url}-${index}`} className="gallery-card gallery-card-photo">
              <div className="gallery-card-image-wrapper">
                <Image src={mediaUrl(media, index)} alt={`${text(item.title, locale)} ${index + 1}`} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
              </div>
            </div>
          ))}
        </section>
      )}

      {!!related.length && (
        <section className="gallery-grid">
          {related.map((entry) => (
            <Link key={entry._id} href={`/media-achievements/${entry.slug}`} className="gallery-card gallery-card-accent">
              <div className="accent-decoration"></div>
              <div>
                <h3 className="gallery-card-title title-accent">{text(entry.title, locale)}</h3>
                <p className="gallery-card-description description-accent">{text(entry.shortDescription, locale)}</p>
              </div>
              <div className="gallery-card-footer footer-accent">
                <span>{text(entry.achievementDate, locale)}</span>
                <span className="gallery-card-link-wrapper">
                  {text(entry.linkLabel, locale) || "Read"} <ChevronRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
};

export default MediaAchievementDetails;
