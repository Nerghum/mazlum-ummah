"use client";

import React from "react";
import Image from "next/image";
import Wrapper from "./wrapper";
import { Play } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";

const photos = [
  { id: 1, src: "https://picsum.photos/400/300?random=1", isVideo: false },
  { id: 2, src: "https://picsum.photos/400/300?random=2", isVideo: true },
  { id: 3, src: "https://picsum.photos/400/300?random=3", isVideo: false },
  { id: 4, src: "https://picsum.photos/400/300?random=4", isVideo: false },
  { id: 5, src: "https://picsum.photos/400/300?random=5", isVideo: false },
  { id: 6, src: "https://picsum.photos/400/300?random=6", isVideo: false },
];

const GallerySection = () => {
  const t = useTranslations();

  return (
    <section className="py-[60px] bg-white">
      <Wrapper>
        <h2 className="text-[2rem] font-bold text-[#1a1a1a] text-center mb-8 font-[family-name:var(--font-bornomala)]">
          {t("gallery.photos")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative rounded-[12px] overflow-hidden shadow-md group cursor-pointer"
            >
              <Image
                src={photo.src}
                alt={`Gallery image ${photo.id}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                className="transition-transform duration-300 group-hover:scale-[1.03]"
              />
              {photo.isVideo && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black/55 rounded-full flex items-center justify-center">
                  <Play className="w-5 h-5 text-white fill-white" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-7">
          <button className="bg-[#f32a26] text-white px-[14px] py-[10px] rounded-[6px] text-[0.95rem] hover:bg-[#c41e1e] transition-colors duration-300 flex items-center gap-2 mx-auto font-[family-name:var(--font-bornomala)]">
            {t("common.seeMore")} <span>→</span>
          </button>
        </div>
      </Wrapper>
    </section>
  );
};

export default GallerySection;
