import PageBannerSkeleton from "@/components/page-banner/page-banner.skeleton";
import MediaAchievementPageSkeleton from "./page.skeleton";

export default function Loading() {
  return (
    <>
      <PageBannerSkeleton hasTitle={true} />
      <MediaAchievementPageSkeleton />
    </>
  );
}
