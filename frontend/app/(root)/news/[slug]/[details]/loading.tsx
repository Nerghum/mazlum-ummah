import PageBannerSkeleton from "@/components/page-banner/page-banner.skeleton";
import NewsDetailsSkeleton from "./components/news-details.skeleton";

export default function Loading() {
  return (
    <>
      <PageBannerSkeleton hasTitle={false} />
      <NewsDetailsSkeleton />
    </>
  );
}
