import { Skeleton, SkeletonText, SkeletonImage, SkeletonCard } from "@/components/ui/skeleton";
import "./style.css";

export default function MediaAchievementsSkeleton() {
  return (
    <main className="container main-content">
      <section className="feature-card">
        <div className="feature-grid">
          <div className="feature-image-wrapper">
            <SkeletonImage aspect="4/3" rounded={0} />
            <div className="feature-image-overlay"></div>
          </div>
          <div className="feature-text-wrapper">
            <div>
              <Skeleton h={24} w="80%" className="feature-headline" />
              <SkeletonText lines={2} lastWidth="60%" gap={6} className="feature-description" />
            </div>
            <div className="feature-footer">
              <Skeleton h={14} w="25%" className="feature-author" />
              <Skeleton h={14} w="15%" />
            </div>
          </div>
        </div>
      </section>

      <section className="gallery-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} variant="achievement" />
        ))}
      </section>

      <nav className="MuiPagination-root MuiPagination-text css-13jb70f">
        <ul className="MuiPagination-ul css-51eq8m">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i}>
              <Skeleton w={32} h={32} circle />
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
