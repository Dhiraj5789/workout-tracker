import { youtubeSearchUrl } from '@/lib/youtube';
import type { Exercise, StateUpdater, TrackerState } from '@/types/tracker';

interface ListProps {
  exercises: readonly Exercise[];
  /** Prefix for tick keys, e.g. "3-0-g". */
  keyPrefix: string;
  state: TrackerState;
  update: StateUpdater;
  /** Show the kg input (gym workouts only). */
  showWeight?: boolean;
}

export function ExerciseList({ exercises, keyPrefix, state, update, showWeight = false }: ListProps) {
  return (
    <>
      {exercises.map((exercise, index) => {
        const tickKey = `${keyPrefix}-${index}`;
        return (
          <ExerciseRow
            key={tickKey}
            exercise={exercise}
            checked={Boolean(state.chk[tickKey])}
            weight={showWeight ? (state.wt[exercise.name] ?? '') : null}
            onCheck={(checked) =>
              update((draft) => {
                if (checked) draft.chk[tickKey] = true;
                else delete draft.chk[tickKey];
              })
            }
            onWeight={(value) => update((draft) => void (draft.wt[exercise.name] = value))}
          />
        );
      })}
    </>
  );
}

interface RowProps {
  exercise: Exercise;
  checked: boolean;
  /** null hides the weight input. */
  weight: string | null;
  onCheck: (checked: boolean) => void;
  onWeight: (value: string) => void;
}

function ExerciseRow({ exercise, checked, weight, onCheck, onWeight }: RowProps) {
  const formUrl = exercise.formUrl ?? youtubeSearchUrl(`${exercise.name} proper form tutorial`);
  return (
    <div className="ex">
      <input type="checkbox" aria-label={`Done: ${exercise.name}`} checked={checked} onChange={(e) => onCheck(e.target.checked)} />
      <div className="n">
        {exercise.name}
        <span>{exercise.scheme}</span>
      </div>
      {weight !== null && (
        <input
          type="number"
          inputMode="decimal"
          placeholder="kg"
          aria-label={`Weight in kg: ${exercise.name}`}
          value={weight}
          onChange={(e) => onWeight(e.target.value)}
        />
      )}
      <a href={formUrl} target="_blank" rel="noopener noreferrer">Form</a>
    </div>
  );
}
