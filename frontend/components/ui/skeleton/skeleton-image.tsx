import Skeleton from "./skeleton";

interface SkeletonImageProps {
  aspect?: "16/9" | "16/10" | "4/3" | "1/1" | "3/4" | "2/1";
  rounded?: string | number;
  className?: string;
}

export default function SkeletonImage({ aspect = "16/9", rounded, className }: SkeletonImageProps) {
  return (
    <Skeleton
      className={className}
      rounded={rounded}
      style={{ aspectRatio: aspect.replace("/", " / "), width: "100%" }}
    />
  );
}
