import { useState } from 'react';
import { mondayFirstIndex } from '@/lib/date';
import { getProgress } from '@/lib/progress';
import type { TabProps } from '@/types/tracker';
import { DayPanel } from './DayPanel';
import { DayPicker } from './DayPicker';
import { WeekHeader } from './WeekHeader';

export function WeekTab({ state, update }: TabProps) {
  const today = mondayFirstIndex();
  const [selectedDay, setSelectedDay] = useState(today);
  const progress = getProgress(state);

  return (
    <>
      <WeekHeader state={state} progress={progress} />
      <DayPicker
        week={progress.week}
        done={state.done}
        selected={selectedDay}
        today={today}
        onSelect={setSelectedDay}
      />
      <DayPanel state={state} update={update} week={progress.week} dayIndex={selectedDay} />
    </>
  );
}
