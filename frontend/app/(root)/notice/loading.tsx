import PageBannerSkeleton from "@/components/page-banner/page-banner.skeleton";
import NoContentSkeleton from "@/components/no-content/no-content.skeleton";
import SectionBoundary from "@/components/dev/section-boundary";

export default function Loading() {
  return (
    <>
      <PageBannerSkeleton hasTitle={true} />
      <SectionBoundary id="notice-content" fallback={<NoContentSkeleton />}>
        <NoContentSkeleton />
      </SectionBoundary>
    </>
  );
}
