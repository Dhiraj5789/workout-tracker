import { useState } from 'react';
import { todayIso } from '@/lib/date';
import { BODY_FIELDS } from '@/lib/plan';
import type { BodyEntry, BodyField } from '@/types/tracker';

type FormValues = { date: string } & Record<BodyField, string>;

const toFormValues = (source: Partial<Record<BodyField, number>>): FormValues => ({
  date: todayIso(),
  ...(Object.fromEntries(
    BODY_FIELDS.map(({ key }) => [key, source[key]?.toString() ?? '']),
  ) as Record<BodyField, string>),
});

function toEntry(values: FormValues): BodyEntry {
  const entry: BodyEntry = { date: values.date || todayIso() };
  for (const { key } of BODY_FIELDS) {
    const parsed = parseFloat(values[key]);
    if (!Number.isNaN(parsed)) entry[key] = parsed;
  }
  return entry;
}

interface Props {
  initialValues: Partial<Record<BodyField, number>>;
  isFirstEntry: boolean;
  onSave: (entry: BodyEntry) => void;
}

export function MeasurementForm({ initialValues, isFirstEntry, onSave }: Props) {
  const [values, setValues] = useState(() => toFormValues(initialValues));
  const setField = (field: keyof FormValues, value: string) => setValues((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="card">
      <h2>{isFirstEntry ? 'Starting measurements' : 'Add monthly check-in'}</h2>
      <div className="mu">Waist, hips and thigh in cm. Measure in the morning, same spot each time.</div>
      <div className="g">
        <div>
          <label htmlFor="m-date">Date</label>
          <input id="m-date" type="date" value={values.date} onChange={(e) => setField('date', e.target.value)} />
        </div>
        {BODY_FIELDS.map(({ key, label }) => (
          <div key={key}>
            <label htmlFor={`m-${key}`}>{label}</label>
            <input
              id={`m-${key}`}
              type="number"
              inputMode="decimal"
              value={values[key]}
              onChange={(e) => setField(key, e.target.value)}
            />
          </div>
        ))}
      </div>
      <button className="pri" onClick={() => onSave(toEntry(values))}>Save measurements</button>
    </div>
  );
}
