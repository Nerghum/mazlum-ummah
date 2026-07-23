import { Skeleton } from "@/components/ui/skeleton";
import "./style.css";

interface PageBannerSkeletonProps {
  hasTitle?: boolean;
  hasSubtitle?: boolean;
  hasAd?: boolean;
}

/**
 * Mirrors PageBanner's DOM exactly (same elements, same classes) so swapping
 * skeleton -> content causes no layout shift. Sizes use em / aspect-ratio so
 * they follow the same responsive CSS as the real title and ad image.
 */
export default function PageBannerSkeleton({
  hasTitle = true,
  hasSubtitle = false,
  hasAd = true,
}: PageBannerSkeletonProps) {
  return (
    <section
      className={`page-banner ${hasTitle ? "page-banner--has-title" : ""} ${hasAd ? "page-banner--has-ad" : ""}`.trim()}
    >
      {hasTitle && (
        <h1 className="page-banner__title">
          <Skeleton h="1.4em" w="100%" />
        </h1>
      )}

      {hasSubtitle && (
        <div className="page-banner__subtitle-container">
          <p className="page-banner__subtitle">
            <Skeleton h="1.5em" w="80%" />
          </p>
        </div>
      )}

      {hasAd && (
        <div className="page-banner__ad-wrapper">
          <div className="page-banner__ad-container">
            <Skeleton
              className="page-banner__ad-img"
              style={{ aspectRatio: "3 / 1", height: "auto" }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
