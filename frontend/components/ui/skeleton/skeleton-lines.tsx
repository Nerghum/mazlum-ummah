import Skeleton from "./skeleton";

interface SkeletonLinesProps {
  /** How many text lines the real element occupies (usually its line-clamp). */
  lines?: number;
  /** Width of the final line. */
  lastWidth?: string;
  /** The real element's line-height, as a unitless CSS number. */
  lineHeight?: number;
  /** Fraction of the line box the bar fills; the rest stays as leading. */
  fill?: number;
}

/**
 * Text placeholder sized in `em`, so it inherits the real element's font-size
 * and reserves exactly `lines * lineHeight` — put it *inside* the real heading
 * or paragraph element to keep its box identical to the loaded state.
 */
export default function SkeletonLines({
  lines = 1,
  lastWidth = "70%",
  lineHeight = 1.5,
  fill = 0.72,
}: SkeletonLinesProps) {
  const leading = (lineHeight * (1 - fill)) / 2;

  return (
    <>
      {Array.from({ length: lines }).map((_, i) => (
        // The leading is padding on a wrapper, not margin on the bar: adjacent
        // sibling margins would collapse and leave each line short of its
        // line box, which is exactly the shift this component exists to avoid.
        <span
          key={i}
          style={{ display: "block", paddingTop: `${leading}em`, paddingBottom: `${leading}em` }}
        >
          <Skeleton h={`${lineHeight * fill}em`} w={i === lines - 1 ? lastWidth : "100%"} />
        </span>
      ))}
    </>
  );
}
