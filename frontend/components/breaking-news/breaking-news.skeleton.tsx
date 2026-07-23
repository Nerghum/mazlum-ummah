import { Skeleton, SkeletonLines } from "@/components/ui/skeleton";
import Wrapper from "@/components/wrapper";
import AdBannerSkeleton from "@/components/ad-banner/ad-banner.skeleton";
import "./style.css";

/**
 * Mirrors BreakingNews: same label/card/ad boxes, so the responsive CSS
 * (label font jumps to 3rem on desktop, cards are 22rem wide with a 16/9
 * thumb) gives the skeleton the same height as the loaded strip.
 */
const BreakingNewsSkeleton = () => {
  return (
    <section className="breaking-news-section">
      <Wrapper>
        <div className="breaking-news-header">
          <span className="breaking-news-label">
            <Skeleton h="1em" w="7em" />
          </span>
        </div>
      </Wrapper>

      <div className="breaking-news-scroll">
        <div className="breaking-news-track" style={{ animation: "none" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="breaking-news-card">
              <div className="breaking-news-card-img">
                <Skeleton
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                />
              </div>
              <div className="breaking-news-card-text">
                <span className="breaking-news-card-title" style={{ width: "100%" }}>
                  <SkeletonLines lines={2} lineHeight={1.5333} lastWidth="65%" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="breaking-news-ad">
        <AdBannerSkeleton />
      </div>
    </section>
  );
};

export default BreakingNewsSkeleton;
