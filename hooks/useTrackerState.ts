import { useCallback, useEffect, useRef, useState } from 'react';
import { loadState, saveState } from '@/lib/db';
import { createDefaultState } from '@/lib/state';
import type { StateUpdater, TrackerState } from '@/types/tracker';

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

const SAVE_DEBOUNCE_MS = 600;

/** Loads state once, exposes `update`, and saves (debounced) after each change. */
export function useTrackerState() {
  const [state, setState] = useState<TrackerState>(createDefaultState);
  const [ready, setReady] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [status, setStatus] = useState<SaveStatus>('idle');
  const hasUserChanges = useRef(false);

  useEffect(() => {
    let cancelled = false;
    loadState()
      .then((saved) => {
        if (!cancelled && saved) setState({ ...createDefaultState(), ...saved });
      })
      .catch(() => !cancelled && setLoadFailed(true))
      .finally(() => !cancelled && setReady(true));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hasUserChanges.current) return; // skip the initial load
    setStatus('saving');
    const timer = setTimeout(() => {
      saveState(state).then(() => setStatus('saved'), () => setStatus('error'));
    }, SAVE_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [state]);

  const update: StateUpdater = useCallback((recipe) => {
    hasUserChanges.current = true;
    setState((previous) => {
      const draft = structuredClone(previous);
      recipe(draft);
      return draft;
    });
  }, []);

  return { state, update, ready, loadFailed, status };
}
