// Key formats are persisted in the database, so keep them stable.
export type ExerciseGroup = 'g' | 'h' | 'r'; // gym, home, run

export const dayKey = (week: number, dayIndex: number): string => `${week}-${dayIndex}`;

export const exerciseGroupKey = (week: number, dayIndex: number, group: ExerciseGroup): string =>
  `${dayKey(week, dayIndex)}-${group}`;
