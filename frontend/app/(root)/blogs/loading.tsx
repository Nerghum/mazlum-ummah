import PageBannerSkeleton from "@/components/page-banner/page-banner.skeleton";
import BlogListSkeleton from "./components/bloglist.skeleton";

export default function Loading() {
  return (
    <>
      <PageBannerSkeleton hasTitle={true} />
      <BlogListSkeleton />
    </>
  );
}
