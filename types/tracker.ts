export type WorkoutId = 'A' | 'B' | 'C';
export type DayKind = WorkoutId | 'Run' | 'Rest';
export type DayMode = 'gym' | 'home';
export type TabId = 'week' | 'progress' | 'body';
export type BodyField = 'weight' | 'bf' | 'waist' | 'hips' | 'thigh' | 'chest' | 'arm' | 'shoulders';

export interface Exercise {
  name: string;
  scheme: string;
  formUrl?: string;
}

export type BodyEntry = { date: string } & Partial<Record<BodyField, number>>;

/** Everything persisted to Supabase (one JSON document). */
export interface TrackerState {
  /** ISO date the program started. */
  start: string;
  /** Target number of weeks. */
  target: number;
  /** Completed days, keyed by `${week}-${dayIndex}`. */
  done: Record<string, true>;
  /** Gym or at-home choice per day, same key as `done`. */
  mode: Record<string, DayMode>;
  /** Ticked exercises, keyed by `${week}-${dayIndex}-${g|h|r}-${index}`. */
  chk: Record<string, true>;
  /** Last weight used (kg) per exercise name. */
  wt: Record<string, string>;
  body: BodyEntry[];
}

/** Mutate a draft copy of the state; the hook handles cloning and saving. */
export type StateUpdater = (recipe: (draft: TrackerState) => void) => void;

export interface TabProps {
  state: TrackerState;
  update: StateUpdater;
}
