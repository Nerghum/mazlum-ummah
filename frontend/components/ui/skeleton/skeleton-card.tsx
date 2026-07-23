import { cn } from "@/lib/utils";
import Skeleton from "./skeleton";
import SkeletonText from "./skeleton-text";
import SkeletonImage from "./skeleton-image";

type CardVariant =
  | "news"
  | "news-featured"
  | "blog"
  | "crisis"
  | "gallery-image"
  | "gallery-video"
  | "feature"
  | "hero-slide"
  | "ad"
  | "most-read"
  | "social"
  | "achievement";

interface SkeletonCardProps {
  variant?: CardVariant;
  className?: string;
}

export default function SkeletonCard({ variant = "news", className }: SkeletonCardProps) {
  return <div className={cn("skeleton-card", className)}>{variantRenderers[variant]()}</div>;
}

const variantRenderers: Record<CardVariant, () => React.ReactNode> = {
  news: () => (
    <>
      <SkeletonImage aspect="4/3" rounded="7px 7px 0 0" />
      <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <Skeleton h={14} w="40%" />
        <Skeleton h={16} w="90%" />
        <SkeletonText lines={2} lastWidth="70%" gap={6} />
      </div>
    </>
  ),
  "news-featured": () => (
    <>
      <SkeletonImage aspect="16/9" rounded="7px 7px 0 0" />
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <Skeleton h={14} w="35%" />
        <Skeleton h={22} w="75%" />
        <SkeletonText lines={3} lastWidth="50%" gap={6} />
      </div>
    </>
  ),
  blog: () => (
    <>
      <SkeletonImage aspect="4/3" rounded="7px 7px 0 0" />
      <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <Skeleton h={16} w="80%" />
        <SkeletonText lines={2} lastWidth="60%" gap={6} />
        <Skeleton h={12} w="30%" />
      </div>
    </>
  ),
  crisis: () => (
    <>
      <SkeletonImage aspect="3/4" rounded="7px 7px 0 0" />
      <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
        <Skeleton h={20} w="60%" />
        <SkeletonText lines={3} lastWidth="40%" gap={4} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
          <Skeleton h={24} w="40%" rounded={20} />
          <Skeleton h={24} w={24} circle />
        </div>
      </div>
    </>
  ),
  "gallery-image": () => (
    <>
      <SkeletonImage aspect="1/1" rounded="7px" />
    </>
  ),
  "gallery-video": () => (
    <div style={{ position: "relative" }}>
      <SkeletonImage aspect="16/9" rounded="7px" />
      <Skeleton
        w={48}
        h={48}
        circle
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  ),
  feature: () => (
    <>
      <SkeletonImage aspect="4/3" rounded="7px 7px 0 0" />
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <Skeleton h={20} w="70%" />
        <SkeletonText lines={2} lastWidth="50%" gap={6} />
      </div>
    </>
  ),
  "hero-slide": () => (
    <>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "12px",
          padding: "24px",
        }}
      >
        <Skeleton h={28} w="60%" />
        <SkeletonText lines={3} lastWidth="40%" gap={6} />
        <Skeleton h={40} w={140} rounded={20} style={{ marginTop: "8px" }} />
      </div>
    </>
  ),
  ad: () => <Skeleton style={{ width: "100%", height: "90px" }} rounded={7} />,
  "most-read": () => (
    <div style={{ display: "flex", gap: "12px" }}>
      <Skeleton w={80} h={80} rounded={7} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
        <Skeleton h={14} w="85%" />
        <Skeleton h={12} w="50%" />
      </div>
    </div>
  ),
  social: () => (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
        <Skeleton w={40} h={40} circle />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
          <Skeleton h={14} w="50%" />
          <Skeleton h={10} w="25%" />
        </div>
      </div>
      <SkeletonText lines={2} lastWidth="70%" gap={6} />
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", marginTop: "8px" }}
      >
        <SkeletonImage aspect="1/1" rounded="4px" />
        <SkeletonImage aspect="1/1" rounded="4px" />
      </div>
    </>
  ),
  achievement: () => (
    <>
      <SkeletonImage aspect="4/3" rounded="7px 7px 0 0" />
      <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <Skeleton h={16} w="70%" />
        <Skeleton h={12} w="40%" />
      </div>
    </>
  ),
};
