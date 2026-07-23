import { Skeleton, SkeletonImage } from "@/components/ui/skeleton";

export default function SocialSidebarSkeleton() {
  return (
    <div className="social-sidebar">
      <div className="sidebar-share-container">
        <Skeleton h={18} w="20%" />
        <div className="sidebar-share-buttons-stack">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} w={40} h={40} circle />
          ))}
        </div>
      </div>

      <div className="sidebar-donation-wrapper">
        <div className="sidebar-donation-card">
          <Skeleton h={28} w="70%" />
          <Skeleton h={44} w="100%" rounded={8} />
          <Skeleton h={44} w="100%" rounded={8} />
        </div>
      </div>

      <div className="sidebar-section photos-section">
        <div className="photos-section__header">
          <Skeleton h={18} w="25%" />
          <Skeleton h={14} w="30%" />
        </div>
        <div className="photos-grid">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="photo-item">
              <SkeletonImage aspect="1/1" rounded={4} />
            </div>
          ))}
        </div>
      </div>

      <div className="news-vertical-ad-card">
        <SkeletonImage aspect="4/3" rounded={0} />
      </div>
    </div>
  );
}
