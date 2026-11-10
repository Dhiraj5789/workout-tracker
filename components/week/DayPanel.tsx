import { dayKey, exerciseGroupKey } from '@/lib/keys';
import {
  AT_HOME_VIDEO_URL,
  HOME_WORKOUT,
  RUN_EXERCISE,
  WEEK_PLAN,
  WORKOUTS,
  isWorkout,
} from '@/lib/plan';
import { runGuidance } from '@/lib/progress';
import type { DayMode, TabProps, WorkoutId } from '@/types/tracker';
import { ExerciseList } from './ExerciseList';

interface Props extends TabProps {
  week: number;
  dayIndex: number;
}

export function DayPanel({ state, update, week, dayIndex }: Props) {
  const { day, kind } = WEEK_PLAN[dayIndex];
  const key = dayKey(week, dayIndex);
  const isDone = Boolean(state.done[key]);

  const toggleDone = () =>
    update((draft) => {
      if (draft.done[key]) delete draft.done[key];
      else draft.done[key] = true;
    });

  return (
    <div className="card">
      {isWorkout(kind) && (
        <WorkoutSection
          title={`${day}: Workout ${kind}`}
          workoutId={kind}
          mode={state.mode[key] ?? 'gym'}
          onModeChange={(mode) => update((draft) => void (draft.mode[key] = mode))}
          state={state}
          update={update}
          week={week}
          dayIndex={dayIndex}
        />
      )}
      {kind === 'Run' && (
        <>
          <h2>Saturday: Run</h2>
          <div className="mu">{runGuidance(week)}</div>
          <ExerciseList
            exercises={RUN_EXERCISE}
            keyPrefix={exerciseGroupKey(week, dayIndex, 'r')}
            state={state}
            update={update}
          />
        </>
      )}
      {kind === 'Rest' && (
        <>
          <h2>{day}: Rest day</h2>
          <div className="mu">Aim for 8–10k steps, sleep 7–8 hours, and hit your protein. Optional: 10 minutes of mobility.</div>
        </>
      )}
      <button className={`pri${isDone ? ' done' : ''}`} onClick={toggleDone}>
        {isDone ? 'Completed. Tap to undo' : 'Mark day complete'}
      </button>
    </div>
  );
}

interface WorkoutSectionProps extends TabProps {
  title: string;
  workoutId: WorkoutId;
  mode: DayMode;
  onModeChange: (mode: DayMode) => void;
  week: number;
  dayIndex: number;
}

function WorkoutSection({ title, workoutId, mode, onModeChange, state, update, week, dayIndex }: WorkoutSectionProps) {
  return (
    <>
      <h2>{title}</h2>
      <div className="seg">
        <button className={mode === 'gym' ? 'on' : ''} onClick={() => onModeChange('gym')}>Gym {workoutId}</button>
        <button className={mode === 'home' ? 'on' : ''} onClick={() => onModeChange('home')}>At-home</button>
      </div>
      {mode === 'gym' ? (
        <>
          <div className="mu">Add reps before weight. Last set of isolation moves: go to failure, then lengthened partials.</div>
          <ExerciseList
            exercises={WORKOUTS[workoutId]}
            keyPrefix={exerciseGroupKey(week, dayIndex, 'g')}
            state={state}
            update={update}
            showWeight
          />
        </>
      ) : (
        <>
          <div className="mu">No equipment needed. Stay 1–2 reps from failure.</div>
          <div className="chips">
            <a href={AT_HOME_VIDEO_URL} target="_blank" rel="noopener noreferrer">Watch at-home workout</a>
          </div>
          <ExerciseList
            exercises={HOME_WORKOUT}
            keyPrefix={exerciseGroupKey(week, dayIndex, 'h')}
            state={state}
            update={update}
          />
        </>
      )}
    </>
  );
}
