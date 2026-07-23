"use client";

import { use } from "react";

const BASE_DELAY = Number(process.env.NEXT_PUBLIC_SKELETON_DELAY ?? 0);

if (process.env.NEXT_PUBLIC_SKELETON_DELAY && Number.isNaN(BASE_DELAY)) {
  console.warn(
    `[skeleton-delay] NEXT_PUBLIC_SKELETON_DELAY="${process.env.NEXT_PUBLIC_SKELETON_DELAY}" is not a number — skeleton delays are off. Use a plain ms value, e.g. 1500.`
  );
}

/**
 * Per-key delay state. `true` means "already waited": the section is mounted
 * and must never suspend again, otherwise a later re-render (locale switch,
 * parent state change) would replace loaded content with its skeleton.
 */
const pending = new Map<string, Promise<void> | true>();

/** How many mounted sections hold each key, so it survives a StrictMode remount. */
const holders = new Map<string, number>();

/**
 * Dev-only helper: suspends the caller for NEXT_PUBLIC_SKELETON_DELAY ms (times
 * `factor`) so a Suspense skeleton is on screen long enough to review. No-op
 * when the env var is unset, malformed or 0, so production renders immediately.
 */
export function useSkeletonDelay(key: string, factor = 1): void {
  if (!BASE_DELAY || Number.isNaN(BASE_DELAY)) return;

  const entry = pending.get(key);

  if (entry === true) return;

  if (entry) {
    use(entry);
    return;
  }

  const promise = new Promise<void>((resolve) => {
    setTimeout(() => {
      pending.set(key, true);
      resolve();
    }, BASE_DELAY * factor);
  });

  pending.set(key, promise);
  use(promise);
}

/** Called by a mounted section; balanced by {@link releaseSkeletonDelay}. */
export function retainSkeletonDelay(key: string): void {
  holders.set(key, (holders.get(key) ?? 0) + 1);
}

/**
 * Called when a section unmounts. Once nothing holds the key its state is
 * dropped, so navigating back to the section shows its skeleton again. The
 * timeout lets a StrictMode remount re-retain the key first.
 */
export function releaseSkeletonDelay(key: string): void {
  const next = (holders.get(key) ?? 1) - 1;

  if (next > 0) {
    holders.set(key, next);
    return;
  }

  holders.delete(key);

  setTimeout(() => {
    if (!holders.has(key)) pending.delete(key);
  }, 0);
}
