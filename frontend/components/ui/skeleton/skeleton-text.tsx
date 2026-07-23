import Skeleton from "./skeleton";

interface SkeletonTextProps {
  lines?: number;
  lastWidth?: string;
  gap?: number;
  className?: string;
}

export default function SkeletonText({
  lines = 3,
  lastWidth = "60%",
  gap = 8,
  className,
}: SkeletonTextProps) {
  return (
    <div
      className={className}
      style={{ display: "flex", flexDirection: "column", gap: `${gap}px` }}
    >
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} h={14} w={i === lines - 1 ? lastWidth : "100%"} />
      ))}
    </div>
  );
}
