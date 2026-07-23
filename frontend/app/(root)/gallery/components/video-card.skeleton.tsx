import { Skeleton, SkeletonImage } from "@/components/ui/skeleton";
import "./gallery-grid.css";

export default function VideoCardSkeleton() {
  return (
    <div className="video-card">
      <div className="video-card-thumbnail-wrap" style={{ position: "relative" }}>
        <SkeletonImage aspect="16/9" rounded={0} />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Skeleton w={48} h={48} circle />
        </div>
      </div>
      <div className="gallery-card-title-wrapper">
        <Skeleton h={16} w="70%" className="gallery-card-title" />
      </div>
    </div>
  );
}
