import PageBannerSkeleton from "@/components/page-banner/page-banner.skeleton";
import BlogDetailsSkeleton from "./components/blog-details.skeleton";

export default function Loading() {
  return (
    <>
      <PageBannerSkeleton hasTitle={false} />
      <BlogDetailsSkeleton />
    </>
  );
}
