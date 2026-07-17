import { useCallback, useState } from 'react';

/**
 * Returns [saved, withSaveState]
 * - saved: boolean - true for 2 seconds after save completes
 * - withSaveState: wraps an async fn to set saved=true after it finishes
 */
export function useSaveState(duration = 2000) {
  const [saved, setSaved] = useState(false);

  const withSaveState = useCallback((fn) => async (...args) => {
    await fn(...args);
    setSaved(true);
    setTimeout(() => setSaved(false), duration);
  }, [duration]);

  return [saved, withSaveState];
}
