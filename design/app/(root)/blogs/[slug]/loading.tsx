import PageBannerSkeleton from "@/components/page-banner/page-banner.skeleton";
import BlogDetailsSkeleton from "./components/blog-details.skeleton";

/**
 * Leaf segment only — /blogs/[slug] has no child routes, so this never leaks a
 * parent skeleton onto another page. It exists because the page is an async
 * server component: without it, navigation here shows nothing until the server
 * responds. Mirrors what the page's own SectionBoundary fallbacks render.
 */
export default function Loading() {
  return (
    <>
      <PageBannerSkeleton hasTitle={false} />
      <BlogDetailsSkeleton />
    </>
  );
}
