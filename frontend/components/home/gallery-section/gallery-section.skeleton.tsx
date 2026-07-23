import { Skeleton, SkeletonLines } from "@/components/ui/skeleton";
import SectionHeaderSkeleton from "@/components/section-header/section-header.skeleton";
import SectionFooterSkeleton from "@/components/section-footer/section-footer.skeleton";
import "./style.css";

interface GallerySectionSkeletonProps {
  /** Must match the real section's `type` — image and video cards differ in height. */
  type?: "image" | "video";
  count?: number;
}

/**
 * Mirrors GallerySection. Image cards get the 16/9 .gallery-card__image-wrap,
 * video cards the fixed 14.6875rem .video-card__thumbnail-wrap, and the title
 * placeholder sits inside the real (1-line clamped) h3.
 */
const GallerySectionSkeleton = ({ type = "image", count = 6 }: GallerySectionSkeletonProps) => {
  return (
    <section className="gallery-section">
      <SectionHeaderSkeleton />
      <div className="gallery-section__grid">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="gallery-section__grid-item">
            <div className={type === "video" ? "video-card" : "gallery-card"}>
              <div
                className={
                  type === "video" ? "video-card__thumbnail-wrap" : "gallery-card__image-wrap"
                }
              >
                <Skeleton
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                />
              </div>
              <div className="gallery-card__title-wrapper">
                <h3 className="gallery-card__title">
                  <SkeletonLines lines={1} lineHeight={1.4} lastWidth="70%" />
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="gallery-section__footer">
        <SectionFooterSkeleton />
      </div>
    </section>
  );
};

export default GallerySectionSkeleton;
