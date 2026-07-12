"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { GalleryItem } from "@/data/gallery-data";
import SectionHeader from "@/components/section-header";
import SectionFooter from "@/components/section-footer";
import Lightbox from "@/components/lightbox";
import VideoModal from "@/components/video-modal";
import { useTranslations } from "@/hooks/use-translations";
import "@/components/gallery-modal.css";
import "./style.css";

type GallerySectionProps = {
  type: "image" | "video";
  title: string;
  items: GalleryItem[];
  footerHref?: string;
  footerLabel?: string;
};

const GallerySection = ({
  type,
  title,
  items,
  footerHref = "/gallery",
  footerLabel,
}: GallerySectionProps) => {
  const t = useTranslations();
  const defaultFooterLabel = footerLabel || t("common.seeMore");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [videoModalId, setVideoModalId] = useState<string | null>(null);

  return (
    <section className="gallery-section">
      <SectionHeader title={title} />
      {items.length > 0 ? (
        <div className="gallery-section__grid">
          {items.map((item, index) => (
            <div key={item.id} className="gallery-section__grid-item">
              {type === "image" ? (
                <div className="gallery-card" onClick={() => setLightboxIndex(index)}>
                  <div className="gallery-card__image-wrap">
                    <Image
                      src={item.src}
                      alt={item.title || "Gallery Image"}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                      className="gallery-card__img"
                    />
                    <div className="gallery-card__hover-overlay">
                      <Maximize2 size={28} color="white" />
                    </div>
                  </div>
                  <div className="gallery-card__title-wrapper">
                    <h3 className="gallery-card__title">{item.title}</h3>
                  </div>
                </div>
              ) : (
                <div className="video-card" onClick={() => setVideoModalId(item.youtubeId || null)}>
                  <div className="video-card__thumbnail-wrap">
                    <Image
                      src={`https://img.youtube.com/vi/${item.youtubeId}/mqdefault.jpg`}
                      alt={item.title || "Gallery Video"}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                      className="video-card__thumbnail-img"
                    />
                    <div className="video-card__overlay">
                      <div className="video-card__pulse-container">
                        <div className="video-card__pulse-ring" />
                        <div className="video-card__pulse-ring video-card__pulse-ring--delayed" />
                        <div className="video-card__play-btn">
                          <svg
                            width="0.896875rem"
                            height="0.896875rem"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M6.3125 7.04256C6.3125 5.32704 8.15064 4.24146 9.65337 5.06737L23.5266 12.6976C25.0834 13.5536 25.0834 15.7909 23.5266 16.648L9.65458 24.2783C8.15184 25.1042 6.3137 24.0174 6.3137 22.3031L6.3125 7.04256Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="gallery-card__title-wrapper">
                    <h3 className="gallery-card__title">{item.title}</h3>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p style={{ padding: "2rem 0", color: "#6b7280", fontWeight: 600 }}>
          {type === "video" ? t("gallery.noVideos") : t("gallery.noPhotos")}
        </p>
      )}
      <div className="gallery-section__footer">
        <SectionFooter href={footerHref} label={defaultFooterLabel} />
      </div>
      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
      {videoModalId !== null && (
        <VideoModal youtubeId={videoModalId} onClose={() => setVideoModalId(null)} />
      )}
    </section>
  );
};

export default GallerySection;
