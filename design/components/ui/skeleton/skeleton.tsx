import { cn } from "@/lib/utils";
import "./style.css";

interface SkeletonProps {
  w?: string | number;
  h?: string | number;
  rounded?: string | number;
  circle?: boolean;
  pulse?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function Skeleton({
  w,
  h,
  rounded,
  circle = false,
  pulse = false,
  className,
  style,
}: SkeletonProps) {
  return (
    <span
      className={cn(
        "skeleton",
        circle && "skeleton--circle",
        pulse && "skeleton--pulse",
        className
      )}
      style={{
        width: typeof w === "number" ? `${w}px` : w,
        height: typeof h === "number" ? `${h}px` : h,
        borderRadius: rounded
          ? typeof rounded === "number"
            ? `${rounded}px`
            : rounded
          : undefined,
        ...style,
      }}
    />
  );
}
