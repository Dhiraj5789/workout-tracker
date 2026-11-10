import type { BodyEntry, TrackerState } from '@/types/tracker';
import { MS_PER_DAY, daysSince } from './date';
import { dayKey } from './keys';

/** Mon, Wed, Fri: a week counts once all three lifts (gym or at-home) are done. */
export const LIFT_DAY_INDEXES = [0, 2, 4] as const;

const MS_PER_WEEK = 7 * MS_PER_DAY;
const DELOAD_EVERY_N_WEEKS = 6;
const MEASUREMENT_INTERVAL_DAYS = 28;

export const PHASES = [
  { weeks: 'Weeks 1–12', label: 'Fat loss and muscle foundation', lastWeek: 12 },
  { weeks: 'Weeks 13–24', label: 'Add badminton, trim lift volume', lastWeek: 24 },
  { weeks: 'Week 25 on', label: 'Jump work and basketball return', lastWeek: Infinity },
] as const;

export function currentWeek(startIso: string, now = Date.now()): number {
  const elapsed = now - new Date(`${startIso}T00:00`).getTime();
  return Math.max(1, Math.floor(elapsed / MS_PER_WEEK) + 1);
}

export const isWeekComplete = (done: TrackerState['done'], week: number): boolean =>
  LIFT_DAY_INDEXES.every((day) => done[dayKey(week, day)]);

export function countCompletedWeeks(done: TrackerState['done'], throughWeek: number): number {
  let count = 0;
  for (let week = 1; week <= throughWeek; week++) if (isWeekComplete(done, week)) count++;
  return count;
}

export function getProgress(state: TrackerState) {
  const week = currentWeek(state.start);
  const completed = countCompletedWeeks(state.done, week);
  const percent = Math.min(100, (completed / state.target) * 100);
  return { week, completed, percent };
}

export function phaseFor(week: number): { number: number; label: string } {
  const index = PHASES.findIndex((phase) => week <= phase.lastWeek);
  return { number: index + 1, label: PHASES[index].label };
}

export const isDeloadWeek = (week: number): boolean => week % DELOAD_EVERY_N_WEEKS === 0;

export function runGuidance(week: number): string {
  if (week <= 4) return 'Easy run, 3–5 km at a pace where you can talk. Build from your current 3 km.';
  if (week % 2 === 1) return 'Easy run, 4–6 km, conversational pace.';
  return 'Intervals: 10 min easy, then 6–8 × (1 min hard, 2 min jog), then 5 min easy.';
}

/** Returns a reminder message, or null when nothing is due. */
export function measurementReminder(body: readonly BodyEntry[]): string | null {
  const latest = body[body.length - 1];
  if (!latest) return 'Enter your starting measurements in the Body tab.';
  return daysSince(latest.date) >= MEASUREMENT_INTERVAL_DAYS ? 'Monthly measurements are due.' : null;
}
