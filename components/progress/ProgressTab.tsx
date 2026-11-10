import { PHASES, getProgress } from '@/lib/progress';
import type { TabProps } from '@/types/tracker';
import { ProgressBar } from '../ui/ProgressBar';

export default function ProgressTab({ state, update }: TabProps) {
  const { week, completed, percent } = getProgress(state);

  const changeStart = (value: string) => {
    if (value) update((draft) => void (draft.start = value));
  };
  const changeTarget = (value: string) => {
    const weeks = Number(value);
    if (weeks > 0) update((draft) => void (draft.target = weeks));
  };

  return (
    <>
      <h1>Progress</h1>
      <div className="card">
        <h2>{completed} of {state.target} weeks</h2>
        <ProgressBar percent={percent} />
        <p className="mu">
          A week counts when Workout A, B and C (or their at-home versions) are all complete. You are in week {week}.
        </p>
      </div>
      <div className="card">
        <div className="g">
          <div>
            <label htmlFor="start-date">Start date</label>
            <input id="start-date" type="date" value={state.start} onChange={(e) => changeStart(e.target.value)} />
          </div>
          <div>
            <label htmlFor="target-weeks">Target weeks</label>
            <input id="target-weeks" type="number" value={state.target} onChange={(e) => changeTarget(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="card">
        <h2>Phases</h2>
        <div className="mu">
          {PHASES.map(({ weeks, label }) => (
            <div key={weeks}>{weeks}: {label}</div>
          ))}
          <div>Every 6th week: lighter deload</div>
        </div>
      </div>
    </>
  );
}
