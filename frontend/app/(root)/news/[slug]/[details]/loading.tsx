import { SkeletonDetailPage, SkeletonPageBanner } from "@/components/skeleton-loader";

export default function Loading() {
  return (
    <>
      <SkeletonPageBanner />
      <SkeletonDetailPage />
    </>
  );
}
