"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MoreHorizontal, Globe, Play } from "lucide-react";
import Lightbox from "@/components/lightbox";
import VideoModal from "@/components/video-modal";
import { GalleryItem } from "@/data/gallery-data";

export interface SocialPost {
  id: string;
  type: "image" | "video";
  author: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  content?: string;
  hashtags: string[];
  images?: string[];
  youtubeId?: string;
  videoThumbnail?: string;
}

const SocialCard = ({ post }: { post: SocialPost }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Safety check for images
  const images = post.images || [];

  const galleryItems: GalleryItem[] = images.map((src, index) => ({
    id: `${post.id}-img-${index}`,
    src,
    type: "image",
    category: "all" as any,
    year: 2025 as any,
    title: post.content || "Social Post Image",
  }));

  const renderContent = () => {
    if (post.type === "video" && post.youtubeId) {
      return (
        <div className="social-card__video-container" onClick={() => setIsVideoModalOpen(true)}>
          <Image
            src={post.videoThumbnail || "/assets/posts/image.png"}
            alt="Video Thumbnail"
            width={800}
            height={450}
            className="social-card__video-thumb"
          />
          <div className="social-card__play-overlay">
            <div className="social-card__play-btn">
              <Play fill="white" size={32} />
            </div>
          </div>
          <div className="social-card__video-footer-overlay">
            <span className="social-card__video-hint">Like দিয়ে পাশে থাকবেন</span>
          </div>
        </div>
      );
    }

    const count = images.length;
    if (count === 0) return null;

    if (count === 1) {
      return (
        <div className="social-card__image-container" onClick={() => setLightboxIndex(0)}>
          <Image
            src={images[0]}
            alt="Social Post Content"
            width={800}
            height={800}
            className="social-card__image"
          />
        </div>
      );
    }

    return (
      <div className={`social-card__grid social-card__grid--${Math.min(count, 4)}`}>
        {images.slice(0, 4).map((src, index) => (
          <div
            key={index}
            className="social-card__grid-item"
            onClick={() => setLightboxIndex(index)}
          >
            <Image
              src={src}
              alt={`Post image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
            />
            {index === 3 && count > 4 && (
              <div className="social-card__grid-overlay">
                <span>+{count - 4}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="social-card">
      <div className="social-card__header">
        <div className="social-card__author-info">
          <div className="social-card__avatar-wrapper">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={40}
              height={40}
              className="social-card__avatar"
            />
          </div>
          <div className="social-card__author-details">
            <div className="social-card__author-name-row">
              <h4 className="social-card__author-name">{post.author.name}</h4>
              <span className="social-card__verified-icon">
                <svg viewBox="0 0 24 24" fill="#1877F2" width="16" height="16">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.2l-3.5-3.5 1.4-1.4 2.1 2.1 6-6 1.4 1.4-7.4 7.4z" />
                </svg>
              </span>
            </div>
            <div className="social-card__meta">
              <span className="social-card__timestamp">{post.timestamp}</span>
              <span className="social-card__separator">·</span>
              <Globe size={12} className="social-card__globe" />
            </div>
          </div>
        </div>
        <button className="social-card__more-btn">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="social-card__text-content">
        {post.content && <p className="social-card__description">{post.content}</p>}
        <div className="social-card__hashtags">
          {post.hashtags.map((tag, index) => (
            <span key={index} className="social-card__hashtag">
              {tag}{" "}
            </span>
          ))}
        </div>
      </div>

      <div className="social-card__content">{renderContent()}</div>

      {lightboxIndex !== null && (
        <Lightbox
          items={galleryItems}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      {isVideoModalOpen && post.youtubeId && (
        <VideoModal youtubeId={post.youtubeId} onClose={() => setIsVideoModalOpen(false)} />
      )}
    </div>
  );
};

export default SocialCard;
