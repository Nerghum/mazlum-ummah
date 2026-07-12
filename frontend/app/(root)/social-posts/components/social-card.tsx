"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Globe, MoreHorizontal, Play } from "lucide-react";
import Lightbox from "@/components/lightbox";
import VideoModal from "@/components/video-modal";
import type { GalleryItem } from "@/data/gallery-data";
import { formatCmsDate, mediaUrl, type CmsSocialPost } from "@/lib/cms";
import { youtubeIdFromUrl, youtubeThumbnailUrl } from "@/lib/video";
import { useLocale } from "@/hooks/use-locale";

function relativeTime(value: string | undefined, locale: "en" | "bn") {
  if (!value) return "";
  const diff = Date.now() - new Date(value).getTime();
  if (Number.isNaN(diff)) return formatCmsDate(value, locale);
  const minutes = Math.max(1, Math.round(diff / 60000));
  if (minutes < 60) return locale === "bn" ? `${minutes} মিনিট` : `${minutes}m`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return locale === "bn" ? `${hours} ঘণ্টা` : `${hours}h`;
  const days = Math.round(hours / 24);
  if (days < 7) return locale === "bn" ? `${days} দিন` : `${days}d`;
  return formatCmsDate(value, locale);
}

const SocialCard = ({ post }: { post: CmsSocialPost }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const { locale } = useLocale();
  const images = useMemo(() => (post.images || []).map((image, index) => mediaUrl(image, index)), [post.images]);
  const youtubeId = youtubeIdFromUrl(post.videoUrl || "");
  const videoThumb = post.videoThumbnail?.url ? mediaUrl(post.videoThumbnail) : youtubeThumbnailUrl(post.videoUrl || "");
  const timestamp = relativeTime(post.publishDate || post.createdAt, locale);

  const galleryItems: GalleryItem[] = images.map((src, index) => ({
    id: `${post._id}-img-${index}`,
    src,
    type: "image",
    category: "social",
    year: new Date(post.publishDate || post.createdAt || Date.now()).getFullYear(),
    title: post.content || "Social Post Image",
  }));

  const renderContent = () => {
    if (post.postType === "video" && youtubeId) {
      return (
        <button className="social-card__video-container" type="button" onClick={() => setIsVideoModalOpen(true)}>
          <Image
            src={videoThumb || youtubeThumbnailUrl(post.videoUrl || "") || "/logo.png"}
            alt="Video Thumbnail"
            width={800}
            height={450}
            className="social-card__video-thumb"
          />
          <span className="social-card__play-overlay">
            <span className="social-card__play-btn">
              <Play fill="white" size={32} />
            </span>
          </span>
        </button>
      );
    }

    if (images.length === 0) return null;

    if (images.length === 1) {
      return (
        <button className="social-card__image-container" type="button" onClick={() => setLightboxIndex(0)}>
          <Image
            src={images[0]}
            alt="Social Post Content"
            width={800}
            height={800}
            className="social-card__image"
          />
        </button>
      );
    }

    return (
      <div className={`social-card__grid social-card__grid--${Math.min(images.length, 4)}`}>
        {images.slice(0, 4).map((src, index) => (
          <button
            key={src}
            className="social-card__grid-item"
            type="button"
            onClick={() => setLightboxIndex(index)}
          >
            <Image
              src={src}
              alt={`Post image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
            />
            {index === 3 && images.length > 4 && (
              <span className="social-card__grid-overlay">
                <span>+{images.length - 4}</span>
              </span>
            )}
          </button>
        ))}
      </div>
    );
  };

  return (
    <article className="social-card">
      <div className="social-card__header">
        <div className="social-card__author-info">
          <div className="social-card__avatar-wrapper">
            <Image
              src={mediaUrl(post.authorAvatar) || "/logo.png"}
              alt={post.authorName || "Mazlum Ummah"}
              width={40}
              height={40}
              className="social-card__avatar"
            />
          </div>
          <div className="social-card__author-details">
            <div className="social-card__author-name-row">
              <h4 className="social-card__author-name">{post.authorName || "Mazlum Ummah-মজলুম উম্মাহ"}</h4>
              <span className="social-card__verified-icon">
                <svg viewBox="0 0 24 24" fill="#1877F2" width="16" height="16">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.2l-3.5-3.5 1.4-1.4 2.1 2.1 6-6 1.4 1.4-7.4 7.4z" />
                </svg>
              </span>
            </div>
            <div className="social-card__meta">
              <span className="social-card__timestamp">{timestamp}</span>
              <span className="social-card__separator">·</span>
              <Globe size={12} className="social-card__globe" />
            </div>
          </div>
        </div>
        <button className="social-card__more-btn" type="button" aria-label="More options">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="social-card__text-content">
        {post.content && <p className="social-card__description">{post.content}</p>}
        {!!post.hashtags?.length && (
          <div className="social-card__hashtags">
            {post.hashtags.map((tag) => (
              <span key={tag} className="social-card__hashtag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="social-card__content">{renderContent()}</div>

      {lightboxIndex !== null && (
        <Lightbox
          items={galleryItems}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      {isVideoModalOpen && youtubeId && (
        <VideoModal youtubeId={youtubeId} onClose={() => setIsVideoModalOpen(false)} />
      )}
    </article>
  );
};

export default SocialCard;
