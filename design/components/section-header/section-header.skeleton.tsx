import { SkeletonLines } from "@/components/ui/skeleton";
import "./style.css";

const SectionHeaderSkeleton = () => {
  return (
    <div className="section-header">
      {/* Placeholder sits inside the real h2 so its box matches the loaded title. */}
      <h2 className="section-header__title">
        <SkeletonLines lines={1} lineHeight={1.4} lastWidth="12em" />
      </h2>
    </div>
  );
};

export default SectionHeaderSkeleton;
