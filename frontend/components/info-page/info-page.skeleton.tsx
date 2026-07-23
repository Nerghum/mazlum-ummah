import { Skeleton, SkeletonText, SkeletonImage } from "@/components/ui/skeleton";
import "./style.css";

interface InfoPageSkeletonProps {
  sectionCount?: number;
}

export default function InfoPageSkeleton({ sectionCount = 3 }: InfoPageSkeletonProps) {
  return (
    <section className="info-page">
      <div className="info-page__grid">
        <article className="info-page__main">
          {Array.from({ length: sectionCount }).map((_, i) => (
            <section key={i} className="info-page__section">
              <Skeleton h={24} w={i === 0 ? "50%" : "40%"} />
              <SkeletonText lines={3} lastWidth="70%" gap={8} />
            </section>
          ))}
        </article>

        <aside className="info-page__sidebar">
          <div className="info-page__share-card">
            <Skeleton h={18} w="20%" />
            <div className="info-page__share-actions">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} w={40} h={40} circle />
              ))}
            </div>
          </div>

          <div className="info-page__donation-card">
            <Skeleton h={28} w="70%" />
            <Skeleton h={44} w="100%" rounded={8} />
            <Skeleton h={44} w="100%" rounded={8} />
          </div>

          <div className="info-page__ad-card">
            <SkeletonImage aspect="4/3" rounded={16} />
          </div>
        </aside>
      </div>
    </section>
  );
}
