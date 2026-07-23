import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";
import "./style.css";

export default function NewsListSkeleton() {
  return (
    <section className="MuiBox-root css-1vhc6zl">
      <div className="MuiBox-root css-fm5laq">
        <Skeleton h={28} w="25%" />
        <div className="news-toolbar-right">
          <Skeleton h={50} w="100%" rounded={8} />
          <Skeleton h={50} w={140} rounded={8} />
        </div>
      </div>

      <div className="news-featured-row">
        <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 css-j5005a">
          <SkeletonCard variant="news-featured" className="css-19dhy7x" />
        </div>
        <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-sm-6 MuiGrid2-grid-lg-4 css-s2cpvg">
          <SkeletonCard variant="news" className="news-featured-row-second" />
        </div>
      </div>

      <div className="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row css-iz5kae">
        {Array.from({ length: 5 }).map((_, i) =>
          i === 2 ? (
            <div
              key={`ad-${i}`}
              className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-sm-6 MuiGrid2-grid-lg-4 css-s2cpvg"
            >
              <SkeletonCard variant="ad" />
            </div>
          ) : (
            <div
              key={i}
              className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-sm-6 MuiGrid2-grid-lg-4 css-s2cpvg"
            >
              <SkeletonCard variant="news" />
            </div>
          )
        )}
      </div>

      <nav className="MuiPagination-root MuiPagination-text css-oggzwd">
        <ul className="MuiPagination-ul css-51eq8m">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i}>
              <Skeleton w={32} h={32} circle />
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
