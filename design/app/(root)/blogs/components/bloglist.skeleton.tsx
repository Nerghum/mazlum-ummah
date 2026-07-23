import { Skeleton, SkeletonLines } from "@/components/ui/skeleton";
import "./style.css";

/**
 * Mirrors BlogList element-for-element. The page renders the hero outside the
 * Suspense boundary, so no hero placeholder belongs here.
 * Card boxes come from CSS (feature image 300px/350px, card image 12rem), and
 * text placeholders sit inside the real headings/paragraphs.
 */

const ImageFill = () => (
  <Skeleton style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
);

const PhotoCard = () => (
  <div className="gallery-card gallery-card-photo">
    <div className="gallery-card-image-wrapper">
      <ImageFill />
    </div>
    <div className="gallery-card-content">
      <h3 className="gallery-card-title">
        <SkeletonLines lines={2} lineHeight={1.5555} lastWidth="65%" />
      </h3>
      <p className="gallery-card-description">
        <SkeletonLines lines={2} lineHeight={1.5} lastWidth="55%" />
      </p>
      <div className="gallery-card-footer">
        <Skeleton h="1em" w="6em" />
        <Skeleton h="1em" w="4em" />
      </div>
    </div>
  </div>
);

const AccentCard = () => (
  <div className="gallery-card gallery-card-accent">
    <div className="accent-decoration"></div>
    <div>
      <h3 className="gallery-card-title title-accent">
        <SkeletonLines lines={2} lineHeight={1.25} lastWidth="70%" />
      </h3>
      <p className="gallery-card-description description-accent">
        <SkeletonLines lines={3} lineHeight={1.625} lastWidth="50%" />
      </p>
    </div>
    <div className="gallery-card-footer footer-accent">
      <Skeleton h="1em" w="6em" />
      <Skeleton h="1em" w="5em" />
    </div>
  </div>
);

export default function BlogListSkeleton() {
  return (
    <>
      <main className="container main-content">
        <section className="feature-card">
          <div className="feature-grid">
            <div className="feature-image-wrapper">
              <ImageFill />
              <div className="feature-image-overlay"></div>
            </div>

            <div className="feature-text-wrapper">
              <div>
                <h2 className="feature-headline">
                  <SkeletonLines lines={2} lineHeight={1.3333} lastWidth="60%" />
                </h2>
                <p className="feature-description">
                  <SkeletonLines lines={4} lineHeight={1.625} lastWidth="45%" />
                </p>
              </div>

              <div className="feature-footer">
                <span className="feature-author">
                  <Skeleton h="1em" w="7em" />
                </span>
                <span className="feature-link">
                  <Skeleton h="1em" w="4em" />
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="gallery-grid">
          {Array.from({ length: 6 }).map((_, i) =>
            i % 2 === 0 ? <PhotoCard key={i} /> : <AccentCard key={i} />
          )}
        </section>

        <nav
          aria-label="pagination navigation"
          className="MuiPagination-root MuiPagination-text css-13jb70f"
        >
          <ul className="MuiPagination-ul css-51eq8m">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i}>
                <Skeleton w={32} h={32} circle />
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </>
  );
}
