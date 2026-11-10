import { QUICK_LINKS } from '@/lib/plan';
import { isDeloadWeek, measurementReminder, phaseFor, type getProgress } from '@/lib/progress';
import type { TrackerState } from '@/types/tracker';
import { ProgressBar } from '../ui/ProgressBar';

interface Props {
  state: TrackerState;
  progress: ReturnType<typeof getProgress>;
}

export function WeekHeader({ state, progress }: Props) {
  const { week, completed, percent } = progress;
  const phase = phaseFor(week);
  const reminder = measurementReminder(state.body);

  return (
    <>
      <h1>Week {week} of {state.target}</h1>
      <div className="mu">
        Phase {phase.number}: {phase.label}
        {isDeloadWeek(week) && ' · Deload week: use about 70% of your usual weights'}
      </div>
      <ProgressBar percent={percent} />
      <div className="mu" style={{ marginTop: 6 }}>{completed} full weeks completed</div>
      {reminder && <div className="banner">{reminder}</div>}
      <div className="chips">
        {QUICK_LINKS.map(({ label, url }) => (
          <a key={label} href={url} target="_blank" rel="noopener noreferrer">{label}</a>
        ))}
      </div>
    </>
  );
}
