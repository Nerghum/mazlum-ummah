import PageBannerSkeleton from "@/components/page-banner/page-banner.skeleton";
import NewsListSkeleton from "./components/newslist.skeleton";

export default function Loading() {
  return (
    <>
      <PageBannerSkeleton hasTitle={true} />
      <NewsListSkeleton />
    </>
  );
}
