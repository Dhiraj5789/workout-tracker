import { formatDelta } from '@/lib/format';
import { BODY_FIELDS } from '@/lib/plan';
import type { BodyEntry } from '@/types/tracker';

export function MeasurementHistory({ entries }: { entries: readonly BodyEntry[] }) {
  const first = entries[0];
  const latest = entries[entries.length - 1];

  return (
    <div className="card tbl">
      <h2>History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            {BODY_FIELDS.map(({ key }) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {[...entries].reverse().map((entry) => (
            <tr key={entry.date}>
              <td>{entry.date.slice(5)}</td>
              {BODY_FIELDS.map(({ key }) => <td key={key}>{entry[key] ?? '–'}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      {entries.length > 1 && (
        <p className="mu">
          Since start: weight {formatDelta(latest.weight, first.weight)} kg, waist{' '}
          {formatDelta(latest.waist, first.waist)} cm, body fat {formatDelta(latest.bf, first.bf)}%
        </p>
      )}
    </div>
  );
}
