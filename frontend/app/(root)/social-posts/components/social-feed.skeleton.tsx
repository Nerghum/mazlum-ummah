import { SkeletonCard } from "@/components/ui/skeleton";

interface SocialFeedSkeletonProps {
  count?: number;
}

export default function SocialFeedSkeleton({ count = 3 }: SocialFeedSkeletonProps) {
  return (
    <div className="social-feed">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} variant="social" className="social-card" />
      ))}
    </div>
  );
}
