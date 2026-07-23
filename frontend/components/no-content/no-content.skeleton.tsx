import { Skeleton, SkeletonLines } from "@/components/ui/skeleton";
import "./style.css";

/**
 * Mirrors NoContent: the image wrapper is a fixed 160x160 box in CSS and the
 * title/description placeholders sit inside the real h5/p, so their margins and
 * line boxes are unchanged when the real copy arrives.
 */
export default function NoContentSkeleton() {
  return (
    <section className="no-content">
      <div className="no-content__container">
        <div className="no-content__content">
          <span className="no-content__image-wrapper">
            <Skeleton style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
          </span>
          <h5 className="no-content__title">
            <SkeletonLines lines={1} lineHeight={1.4} lastWidth="14em" />
          </h5>
          <p className="no-content__description">
            <SkeletonLines lines={1} lineHeight={1.5} lastWidth="22em" />
          </p>
        </div>
      </div>
    </section>
  );
}
