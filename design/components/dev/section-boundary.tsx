"use client";

import { ReactNode, Suspense, useEffect } from "react";
import {
  releaseSkeletonDelay,
  retainSkeletonDelay,
  useSkeletonDelay,
} from "@/hooks/use-skeleton-delay";

const Delay = ({ id, factor }: { id: string; factor: number }) => {
  useSkeletonDelay(id, factor);

  // Hold the key while mounted so re-renders never re-suspend, and drop it on
  // unmount so a later visit to the section shows its skeleton again.
  useEffect(() => {
    retainSkeletonDelay(id);
    return () => releaseSkeletonDelay(id);
  }, [id]);

  return null;
};

type SectionBoundaryProps = {
  /** Unique per section — keys the delay so sections resolve independently. */
  id: string;
  /** Skeleton shown while the section is pending. */
  fallback: ReactNode;
  /** Multiplies NEXT_PUBLIC_SKELETON_DELAY, to stagger sections. */
  factor?: number;
  children: ReactNode;
};

/**
 * Per-section Suspense boundary. In production it renders children straight
 * through; with NEXT_PUBLIC_SKELETON_DELAY set it holds the section's skeleton
 * so each section can be reviewed on its own.
 */
const SectionBoundary = ({ id, fallback, factor = 1, children }: SectionBoundaryProps) => (
  <Suspense fallback={fallback}>
    <Delay id={id} factor={factor} />
    {children}
  </Suspense>
);

export default SectionBoundary;
