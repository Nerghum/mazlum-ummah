import PageBannerSkeleton from "@/components/page-banner/page-banner.skeleton";
import NewsDetailsSkeleton from "./components/news-details.skeleton";

/**
 * Leaf segment only — /news/[slug]/[details] has no child routes, so this never
 * leaks a parent skeleton onto another page. It exists because the page is an
 * async server component: without it, navigation here shows nothing until the
 * server responds. Mirrors the page's own SectionBoundary fallbacks.
 */
export default function Loading() {
  return (
    <>
      <PageBannerSkeleton hasTitle={false} />
      <NewsDetailsSkeleton />
    </>
  );
}
