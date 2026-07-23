import { Skeleton } from "@/components/ui/skeleton";
import "./gallery-sidebar.css";

export default function GallerySidebarSkeleton() {
  return (
    <div className="gallery-sidebar">
      <div className="gallery-sidebar-toggle">
        <Skeleton h={36} w="100%" rounded={0} />
      </div>

      <hr className="gallery-sidebar-hr gallery-sidebar-hr--after-toggle" />

      <div className="gallery-sidebar-categories">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {i > 0 && <hr className="gallery-sidebar-hr" />}
            <Skeleton h={36} w="80%" rounded={6} />
          </div>
        ))}
      </div>

      <div className="gallery-sidebar-year-tabs">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} h={24} w={48} rounded={4} />
        ))}
      </div>
    </div>
  );
}
