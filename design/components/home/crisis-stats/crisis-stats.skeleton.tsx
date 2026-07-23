import { Skeleton, SkeletonLines } from "@/components/ui/skeleton";
import Wrapper from "@/components/wrapper";
import "./style.css";

/**
 * Mirrors CrisisStats. .crisis-card is aspect-ratio 4/3 and its content is
 * overlaid, so card height is CSS-driven; the heading, subheading and
 * disclaimer placeholders sit inside the real elements to keep their boxes.
 */
const CrisisStatsSkeleton = () => {
  return (
    <section className="crisis-section">
      <Wrapper>
        <div className="crisis-header">
          <h2 className="crisis-heading">
            <SkeletonLines lines={1} lineHeight={1.35} lastWidth="55%" />
          </h2>
          <p className="crisis-subheading">
            <SkeletonLines lines={1} lineHeight={1.6} lastWidth="75%" />
          </p>
        </div>

        <div className="crisis-grid">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="crisis-card">
              <Skeleton style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
              <div className="crisis-overlay" />
              <div className="crisis-content">
                <div className="crisis-top-row">
                  <span className="crisis-badge">
                    <Skeleton h="1em" w="4em" />
                  </span>
                  <span className="crisis-icon-circle">
                    <Skeleton w={15} h={15} circle />
                  </span>
                </div>
                <div className="crisis-body">
                  <h3 className="crisis-card-title">
                    <SkeletonLines lines={1} lineHeight={1.1} lastWidth="60%" />
                  </h3>
                  <p className="crisis-card-subtitle">
                    <SkeletonLines lines={2} lineHeight={1.45} lastWidth="50%" />
                  </p>
                </div>
                <div>
                  <div className="crisis-divider" />
                  <div className="crisis-stat">
                    <span className="crisis-number">
                      <Skeleton h="1em" w="3em" />
                    </span>
                    <span className="crisis-cause">
                      <Skeleton h="1em" w="6em" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="crisis-disclaimer">
          <SkeletonLines lines={1} lineHeight={1.5} lastWidth="60%" />
        </p>
      </Wrapper>
    </section>
  );
};

export default CrisisStatsSkeleton;
