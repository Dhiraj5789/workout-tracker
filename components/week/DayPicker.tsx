import { dayKey } from '@/lib/keys';
import { WEEK_PLAN } from '@/lib/plan';
import type { TrackerState } from '@/types/tracker';

interface Props {
  week: number;
  done: TrackerState['done'];
  selected: number;
  today: number;
  onSelect: (dayIndex: number) => void;
}

export function DayPicker({ week, done, selected, today, onSelect }: Props) {
  return (
    <div className="days">
      {WEEK_PLAN.map(({ day, kind }, index) => {
        const classes = ['day', index === selected && 'sel', index === today && 'today'].filter(Boolean).join(' ');
        return (
          <button key={day} className={classes} onClick={() => onSelect(index)}>
            {day}
            <b>{done[dayKey(week, index)] ? '✓' : kind}</b>
          </button>
        );
      })}
    </div>
  );
}
