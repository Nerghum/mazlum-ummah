import { Skeleton, SkeletonText, SkeletonImage } from "@/components/ui/skeleton";
import "./style.css";

export default function NewsDetailsSkeleton() {
  return (
    <section className="MuiBox-root css-1vhc6zl">
      <div className="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row css-1qkll0f">
        <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-lg-7.7 css-1ezbg89">
          <div className="MuiBox-root css-1fobf8d">
            <Skeleton h={28} w="85%" className="news-details-title" />
            <div className="news-details-meta">
              <Skeleton h={14} w="15%" />
              <Skeleton h={14} w="25%" />
            </div>
          </div>

          <div className="news-details-top-image">
            <SkeletonImage aspect="16/9" rounded={0} />
          </div>

          <div className="news-details-top-ad-banner">
            <Skeleton h={90} w="100%" />
          </div>

          <div className="MuiBox-root css-1fobf8d">
            <SkeletonText lines={4} lastWidth="60%" gap={8} />
          </div>

          <div className="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row css-11d1lw4">
            <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-sm-6 MuiGrid2-grid-lg-6 css-126rge6">
              <SkeletonImage aspect="16/10" rounded={20} />
            </div>
            <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-sm-6 MuiGrid2-grid-lg-6 css-126rge6">
              <SkeletonImage aspect="16/10" rounded={20} />
            </div>
          </div>

          <div className="MuiBox-root css-1fobf8d">
            <SkeletonText lines={3} lastWidth="50%" gap={8} />
          </div>

          <div className="MuiBox-root css-1fobf8d">
            <SkeletonText lines={3} lastWidth="40%" gap={8} />
          </div>

          <div className="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row css-11d1lw4">
            <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-sm-12 MuiGrid2-grid-lg-12 css-197n5pv">
              <SkeletonImage aspect="16/10" rounded={20} />
            </div>
          </div>
        </div>

        <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-lg-4.3 css-81xp92">
          <div className="MuiBox-root css-0">
            <div className="MuiBox-root css-zua1x5">
              <Skeleton h={18} w="20%" />
              <div className="MuiStack-root css-1iil1mo">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} w={40} h={40} circle />
                ))}
              </div>
            </div>
            <div className="news-vertical-ad-card">
              <SkeletonImage aspect="4/3" rounded={0} />
            </div>
            <div className="MuiBox-root css-zpnox9">
              <div className="MuiBox-root css-l3ps0i">
                <Skeleton h={28} w="70%" />
                <Skeleton h={44} w="100%" rounded={8} />
                <Skeleton h={44} w="100%" rounded={8} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
