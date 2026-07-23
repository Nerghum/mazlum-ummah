import { Skeleton, SkeletonLines } from "@/components/ui/skeleton";
import SectionHeaderSkeleton from "@/components/section-header/section-header.skeleton";
import SectionFooterSkeleton from "@/components/section-footer/section-footer.skeleton";
import Wrapper from "@/components/wrapper";
import "./style.css";

/**
 * Mirrors NewsSection's DOM one-for-one — same wrappers, same classes — so the
 * CSS (aspect-ratio image boxes, paddings, line-clamps) sizes the skeleton
 * exactly like the loaded section and nothing shifts on swap.
 */

// Fills the .home-news-img box, which is already aspect-ratio 16/9 in CSS.
const ImageFill = () => (
  <Skeleton style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
);

const DatePlaceholder = () => (
  <span className="home-news-date">
    <Skeleton h="1em" w="5.5em" />
  </span>
);

const NewsSectionSkeleton = () => {
  return (
    <section className="home-news-section">
      <Wrapper>
        <SectionHeaderSkeleton />

        <div className="home-news-featured-row">
          <div className="home-news-featured-main">
            <span className="home-news-card-link">
              <div className="home-news-featured-horizontal">
                <span className="home-news-img home-news-img-wide">
                  <ImageFill />
                  <DatePlaceholder />
                </span>
                <div className="home-news-featured-text">
                  <div className="home-news-featured-text-inner">
                    <div className="home-news-text-wrap">
                      <h2 className="home-news-title">
                        <SkeletonLines lines={2} lineHeight={1.25} lastWidth="70%" />
                      </h2>
                      <p className="home-news-excerpt">
                        <SkeletonLines lines={4} lineHeight={1.625} lastWidth="55%" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </span>
          </div>
          <div className="home-news-featured-side">
            <span className="home-news-card-link">
              <div className="home-news-card home-news-card-second">
                <span className="home-news-img home-news-img-square">
                  <ImageFill />
                  <DatePlaceholder />
                </span>
                <div className="home-news-card-text">
                  <div className="home-news-card-text-inner">
                    <div className="home-news-text-wrap">
                      <h2 className="home-news-title">
                        <SkeletonLines lines={2} lineHeight={1.25} lastWidth="70%" />
                      </h2>
                      <p className="home-news-excerpt">
                        <SkeletonLines lines={3} lineHeight={1.625} lastWidth="60%" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </span>
          </div>
        </div>

        <div className="home-news-grid">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="home-news-grid-item">
              <span className="home-news-card-link">
                <div className="home-news-card">
                  <span className="home-news-img home-news-img-square">
                    <ImageFill />
                    <DatePlaceholder />
                  </span>
                  <div className="home-news-card-text">
                    <div className="home-news-card-text-inner">
                      <div className="home-news-text-wrap">
                        <h2 className="home-news-title">
                          <SkeletonLines lines={2} lineHeight={1.25} lastWidth="70%" />
                        </h2>
                        <p className="home-news-excerpt">
                          <SkeletonLines lines={3} lineHeight={1.625} lastWidth="60%" />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </span>
            </div>
          ))}
        </div>

        <div className="home-news-footer">
          <SectionFooterSkeleton />
        </div>
      </Wrapper>
    </section>
  );
};

export default NewsSectionSkeleton;
