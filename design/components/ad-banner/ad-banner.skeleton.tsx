import { Skeleton } from "@/components/ui/skeleton";
import "./style.css";

const AdBannerSkeleton = () => {
  return (
    <div className="home-ad-banner">
      <Skeleton
        className="ad-banner-desktop"
        style={{ width: "100%", aspectRatio: "728 / 90" }}
        rounded={4}
      />
      <Skeleton
        className="ad-banner-mobile"
        style={{ width: "100%", aspectRatio: "320 / 100" }}
        rounded={4}
      />
    </div>
  );
};

export default AdBannerSkeleton;
