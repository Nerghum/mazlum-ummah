"use client";

import React from "react";
import Image from "next/image";
import { GalleryItem } from "@/data/gallery-data";
import "./gallery-grid.css";

type VideoCardProps = {
  item: GalleryItem;
  onClick: () => void;
};

const VideoCard = ({ item, onClick }: VideoCardProps) => {
  const thumbnailUrl = `https://img.youtube.com/vi/${item.youtubeId}/mqdefault.jpg`;

  return (
    <div className="video-card" onClick={onClick}>
      <div className="video-card-thumbnail-wrap">
        <Image
          src={thumbnailUrl}
          alt={item.title || "Gallery Video"}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
        <div className="video-card-overlay">
          <div className="video-card-pulse-container">
            <div className="video-pulse-ring video-card-pulse-ring" />
            <div className="video-pulse-ring video-pulse-ring-delayed video-card-pulse-ring" />
            <div className="video-card-play-btn">
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
      <div className="gallery-card-title-wrapper">
        <h3 className="gallery-card-title">{item.title}</h3>
      </div>
    </div>
  );
};

export default VideoCard;
