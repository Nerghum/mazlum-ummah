import { Skeleton } from "@/components/ui/skeleton";
import "./style.css";

const ITEM_WIDTHS = [72, 60, 85, 68, 78, 62, 90, 65];

const NewsCategoryBarSkeleton = () => {
  return (
    <div className="news-category-bar">
      <div className="news-category-bar__track">
        {ITEM_WIDTHS.map((w, i) => (
          <Skeleton key={i} w={w} h={18} rounded={4} />
        ))}
      </div>
    </div>
  );
};

export default NewsCategoryBarSkeleton;
