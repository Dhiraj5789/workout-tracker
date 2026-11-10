import type { TabId } from '@/types/tracker';

const TABS: readonly { id: TabId; label: string }[] = [
  { id: 'week', label: 'Week' },
  { id: 'progress', label: 'Progress' },
  { id: 'body', label: 'Body' },
];

interface Props {
  active: TabId;
  onChange: (tab: TabId) => void;
}

export function BottomNav({ active, onChange }: Props) {
  return (
    <nav>
      {TABS.map(({ id, label }) => (
        <button key={id} className={id === active ? 'on' : ''} onClick={() => onChange(id)}>
          {label}
        </button>
      ))}
    </nav>
  );
}
