"use client";

import React, { useEffect, useCallback } from "react";
import Image from "@/components/ui/blur-image";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryItem } from "@/data/gallery-data";

type LightboxProps = {
  items: GalleryItem[];
  initialIndex: number;
  onClose: () => void;
};

const Lightbox = ({ items, initialIndex, onClose }: LightboxProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);
  const currentItem = items[currentIndex];

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    const scrollY = window.scrollY;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        goNext();
      } else if (e.key === "ArrowLeft") {
        goPrev();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("lightbox-open");
    document.body.style.top = `-${scrollY}px`;

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("lightbox-open");
      document.body.style.top = "";
      window.scrollTo(0, scrollY);
    };
  }, [onClose, goNext, goPrev]);

  if (!currentItem) return null;

  return createPortal(
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-title">{currentItem.title || "Gallery Image"}</div>

      <button onClick={onClose} className="lightbox-close-btn" aria-label="Close lightbox">
        <X size={28} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        className="lightbox-nav-btn lightbox-nav-btn--prev"
        aria-label="Previous image"
      >
        <ChevronLeft size={32} />
      </button>

      <div onClick={(e) => e.stopPropagation()} className="lightbox-image-wrap">
        <Image
          src={currentItem.src}
          alt={currentItem.title || "Gallery Image"}
          fill
          sizes="100vw"
          style={{ objectFit: "contain" }}
          priority
        />
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        className="lightbox-nav-btn lightbox-nav-btn--next"
        aria-label="Next image"
      >
        <ChevronRight size={32} />
      </button>
    </div>,
    document.body
  );
};

export default Lightbox;
