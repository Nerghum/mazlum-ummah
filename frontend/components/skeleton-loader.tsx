import React from "react";

type SkeletonProps = {
  className?: string;
};

const Skeleton = ({ className = "" }: SkeletonProps) => (
  <span className={`skeleton-loader ${className}`} aria-hidden="true" />
);

const SkeletonText = ({ lines = 3 }: { lines?: number }) => (
  <div className="skeleton-text-group" aria-hidden="true">
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton key={index} className={`skeleton-line skeleton-line--${index + 1}`} />
    ))}
  </div>
);

const SkeletonNewsCard = ({ featured = false }: { featured?: boolean }) => (
  <div className={featured ? "MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 css-j5005a" : "MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-sm-6 MuiGrid2-grid-lg-4 css-s2cpvg"}>
    <div className={`skeleton-card ${featured ? "skeleton-card--featured" : ""}`}>
      <Skeleton className="skeleton-card__image" />
      <div className="skeleton-card__body">
        <SkeletonText lines={3} />
      </div>
    </div>
  </div>
);

export const SkeletonHomeHero = () => (
  <section className="hero-slider skeleton-hero">
    <div className="hero-overlay">
      <div className="hero-content">
        <div className="hero-text-wrapper">
          <div className="hero-title-wrapper">
            <Skeleton className="skeleton-hero__title" />
            <Skeleton className="skeleton-hero__title skeleton-hero__title--short" />
          </div>
          <Skeleton className="skeleton-hero__button" />
        </div>
      </div>
    </div>
  </section>
);

export const SkeletonBreakingNews = () => (
  <section className="breaking-news-section skeleton-breaking-news">
    <div className="wrapper">
      <div className="breaking-news-header">
        <Skeleton className="skeleton-breaking-label" />
      </div>
    </div>
    <div className="breaking-news-scroll">
      <div className="breaking-news-track skeleton-breaking-track">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="breaking-news-card skeleton-breaking-card">
            <Skeleton className="breaking-news-card-img" />
            <div className="breaking-news-card-text">
              <div className="skeleton-text-group">
                <Skeleton className="skeleton-line skeleton-breaking-line" />
                <Skeleton className="skeleton-line skeleton-breaking-line skeleton-breaking-line--short" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="breaking-news-ad">
      <Skeleton className="skeleton-breaking-ad" />
    </div>
  </section>
);

export const SkeletonHomeNewsSection = ({ title = true }: { title?: boolean }) => (
  <section className="home-news-section skeleton-section">
    <div className="wrapper">
      {title && <Skeleton className="skeleton-section-title" />}
      <div className="home-news-featured-row">
        <div className="home-news-featured-main">
          <div className="home-news-featured-horizontal skeleton-home-card">
            <Skeleton className="home-news-img home-news-img-wide" />
            <div className="home-news-featured-text">
              <div className="home-news-featured-text-inner">
                <SkeletonText lines={3} />
              </div>
            </div>
          </div>
        </div>
        <div className="home-news-featured-side">
          <div className="home-news-card home-news-card-second skeleton-home-card">
            <Skeleton className="home-news-img home-news-img-square" />
            <div className="home-news-card-text">
              <div className="home-news-card-text-inner">
                <SkeletonText lines={3} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-news-grid">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="home-news-grid-item">
            <div className="home-news-card skeleton-home-card">
              <Skeleton className="home-news-img home-news-img-square" />
              <div className="home-news-card-text">
                <div className="home-news-card-text-inner">
                  <SkeletonText lines={3} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const SkeletonBlogSection = () => (
  <section className="blog-section skeleton-section">
    <Skeleton className="skeleton-section-title" />
    <div className="blog-section__grid">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="blog-section__grid-item">
          <div className="blog-card__inner skeleton-home-card">
            <Skeleton className="blog-card__image-wrap" />
            <div className="blog-card__content">
              <div className="blog-card__body">
                <SkeletonText lines={3} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export const SkeletonHomePage = () => (
  <>
    <SkeletonHomeHero />
    <SkeletonBreakingNews />
    <SkeletonHomeNewsSection />
    <SkeletonHomeNewsSection />
    <SkeletonBlogSection />
  </>
);

export const SkeletonNewsCategoryPage = () => (
  <section className="MuiBox-root css-1vhc6zl">
    <div className="MuiBox-root css-fm5laq">
      <Skeleton className="skeleton-page-title" />
      <div className="news-toolbar-right">
        <Skeleton className="skeleton-control" />
        <Skeleton className="skeleton-control skeleton-control--small" />
      </div>
    </div>
    <div className="news-featured-row">
      <SkeletonNewsCard featured />
      <SkeletonNewsCard />
    </div>
    <div className="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row css-iz5kae">
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonNewsCard key={index} />
      ))}
    </div>
  </section>
);

export const SkeletonBlogListPage = () => (
  <>
    <SkeletonHomeHero />
    <SkeletonFeatureListContent />
  </>
);

export const SkeletonFeatureListContent = () => (
  <main className="container main-content">
    <section className="feature-card skeleton-feature-card">
      <div className="feature-grid">
        <Skeleton className="feature-image-wrapper" />
        <div className="feature-text-wrapper">
          <SkeletonText lines={4} />
        </div>
      </div>
    </section>
    <section className="gallery-grid">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="gallery-card gallery-card-photo skeleton-home-card">
          <Skeleton className="gallery-card-image-wrapper" />
          <div className="gallery-card-content">
            <SkeletonText lines={3} />
          </div>
        </div>
      ))}
    </section>
  </main>
);

export const SkeletonDetailPage = () => (
  <section className="MuiBox-root css-1vhc6zl">
    <div className="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row css-1qkll0f">
      <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-lg-7.7 css-1ezbg89">
        <div className="MuiBox-root css-1fobf8d">
          <Skeleton className="skeleton-detail-title" />
          <Skeleton className="skeleton-detail-meta" />
        </div>
        <Skeleton className="news-details-top-image skeleton-detail-image" />
        <div className="MuiBox-root css-1fobf8d skeleton-detail-content">
          <SkeletonText lines={8} />
        </div>
      </div>
      <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-lg-4.3 css-81xp92">
        <Skeleton className="skeleton-sidebar-card" />
        <Skeleton className="skeleton-sidebar-card skeleton-sidebar-card--small" />
      </div>
    </div>
  </section>
);

export const SkeletonGalleryGrid = ({ count = 6 }: { count?: number }) => (
  <div className="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row css-17vctqv">
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-sm-6 MuiGrid2-grid-lg-6 css-126rge6"
      >
        <div className="gallery-grid-card video-card skeleton-home-card">
          <Skeleton className="MuiBox-root css-2rgoel skeleton-gallery-image" />
          <div className="gallery-card-title-wrapper">
            <Skeleton className="skeleton-line" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const SkeletonNoticeList = () => (
  <div className="notice-list">
    {Array.from({ length: 5 }).map((_, index) => (
      <article key={index} className="notice-card">
        <div className="notice-card__rail" aria-hidden="true" />
        <div className="notice-card__body">
          <Skeleton className="skeleton-detail-meta" />
          <SkeletonText lines={4} />
        </div>
      </article>
    ))}
  </div>
);

export const SkeletonSocialPostsPage = () => (
  <div className="social-feed">
    {Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className="social-card skeleton-home-card">
        <Skeleton className="skeleton-social-header" />
        <SkeletonText lines={4} />
        <Skeleton className="skeleton-social-image" />
      </div>
    ))}
  </div>
);

export default Skeleton;
