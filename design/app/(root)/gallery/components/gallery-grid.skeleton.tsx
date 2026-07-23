import { SkeletonCard } from "@/components/ui/skeleton";
import "./gallery-grid.css";

interface GalleryGridSkeletonProps {
  count?: number;
}

export default function GalleryGridSkeleton({ count = 6 }: GalleryGridSkeletonProps) {
  return (
    <>
      <div className="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row css-17vctqv">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-sm-6 MuiGrid2-grid-lg-6 css-126rge6"
          >
            <SkeletonCard
              variant={i % 2 === 0 ? "gallery-image" : "gallery-video"}
              className="gallery-grid-card video-card"
            />
          </div>
        ))}
      </div>
      <nav className="MuiPagination-root MuiPagination-text css-13jb70f">
        <ul className="MuiPagination-ul css-51eq8m">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i}>
              <SkeletonCard variant="ad" />
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
