import type { SaveStatus } from '@/hooks/useTrackerState';

const LABELS: Record<SaveStatus, string> = {
  idle: '',
  saving: 'Saving…',
  saved: 'Saved',
  error: 'Not saved',
};

export function SaveStatusBadge({ status }: { status: SaveStatus }) {
  return <div className="status" aria-live="polite">{LABELS[status]}</div>;
}
