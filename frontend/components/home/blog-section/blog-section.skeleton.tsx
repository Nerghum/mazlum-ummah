import { Skeleton, SkeletonLines } from "@/components/ui/skeleton";
import SectionHeaderSkeleton from "@/components/section-header/section-header.skeleton";
import SectionFooterSkeleton from "@/components/section-footer/section-footer.skeleton";
import "./style.css";

/**
 * Mirrors BlogSection's DOM; .blog-card__image-wrap is aspect-ratio 16/9 in CSS
 * and the title/excerpt placeholders live inside the real h3/p, so the card
 * keeps the exact height it has once loaded.
 */
const BlogSectionSkeleton = () => {
  return (
    <section className="blog-section">
      <SectionHeaderSkeleton />
      <div className="blog-section__grid">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="blog-section__grid-item">
            <span className="blog-card-link">
              <div className="blog-card__inner">
                <span className="blog-card__image-wrap">
                  <Skeleton
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                  />
                  <span className="blog-card__date">
                    <Skeleton h="1em" w="5.5em" />
                  </span>
                </span>
                <div className="blog-card__content">
                  <div className="blog-card__body">
                    <div className="blog-card__text">
                      <h3 className="blog-card__title">
                        <SkeletonLines lines={2} lineHeight={1.25} lastWidth="70%" />
                      </h3>
                      <p className="blog-card__excerpt">
                        <SkeletonLines lines={3} lineHeight={1.625} lastWidth="55%" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </span>
          </div>
        ))}
      </div>
      <div className="blog-section__footer">
        <SectionFooterSkeleton />
      </div>
    </section>
  );
};

export default BlogSectionSkeleton;
