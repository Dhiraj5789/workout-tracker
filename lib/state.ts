import type { TrackerState } from '@/types/tracker';
import { todayIso } from './date';

export const createDefaultState = (): TrackerState => ({
  start: todayIso(),
  target: 26,
  done: {},
  mode: {},
  chk: {},
  wt: {},
  body: [],
});
