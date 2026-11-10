export const MS_PER_DAY = 86_400_000;

export const toIsoDate = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export const todayIso = (): string => toIsoDate(new Date());

/** Index of today in a Monday-first week (Mon = 0 ... Sun = 6). */
export const mondayFirstIndex = (d = new Date()): number => (d.getDay() + 6) % 7;

export const daysSince = (isoDate: string, now = Date.now()): number =>
  (now - new Date(`${isoDate}T00:00`).getTime()) / MS_PER_DAY;
