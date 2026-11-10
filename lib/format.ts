/** "+1.5", "-2", or "–" when either value is missing. */
export function formatDelta(current?: number, baseline?: number): string {
  if (current === undefined || baseline === undefined) return '–';
  const diff = Math.round((current - baseline) * 10) / 10;
  return `${diff > 0 ? '+' : ''}${diff}`;
}
