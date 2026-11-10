import { STARTING_BASELINE } from '@/lib/plan';
import type { BodyEntry, TabProps } from '@/types/tracker';
import { MeasurementForm } from './MeasurementForm';
import { MeasurementHistory } from './MeasurementHistory';

export default function BodyTab({ state, update }: TabProps) {
  const latest = state.body.at(-1);

  // One entry per date: saving the same date again replaces it.
  const saveEntry = (entry: BodyEntry) =>
    update((draft) => {
      draft.body = [...draft.body.filter((e) => e.date !== entry.date), entry].sort((a, b) =>
        a.date.localeCompare(b.date),
      );
    });

  return (
    <>
      <h1>Body</h1>
      <MeasurementForm
        initialValues={latest ?? STARTING_BASELINE}
        isFirstEntry={!latest}
        onSave={saveEntry}
      />
      {state.body.length > 0 && <MeasurementHistory entries={state.body} />}
    </>
  );
}
