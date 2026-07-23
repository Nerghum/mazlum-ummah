import { Skeleton, SkeletonText, SkeletonImage } from "@/components/ui/skeleton";

export default function SocialCardSkeleton() {
  return (
    <div className="social-card">
      <div className="social-card__header">
        <div className="social-card__author-info">
          <Skeleton w={40} h={40} circle className="social-card__avatar" />
          <div className="social-card__author-details">
            <Skeleton h={14} w="50%" />
            <Skeleton h={10} w="25%" />
          </div>
        </div>
        <Skeleton w={20} h={20} rounded={4} />
      </div>

      <div className="social-card__text-content">
        <SkeletonText lines={2} lastWidth="70%" gap={6} className="social-card__description" />
        <div className="social-card__hashtags">
          <Skeleton h={18} w="20%" rounded={12} />
          <Skeleton h={18} w="25%" rounded={12} />
          <Skeleton h={18} w="15%" rounded={12} />
        </div>
      </div>

      <div className="social-card__content">
        <div className="social-card__grid social-card__grid--2">
          <SkeletonImage aspect="1/1" rounded="4px" />
          <SkeletonImage aspect="1/1" rounded="4px" />
        </div>
      </div>
    </div>
  );
}
