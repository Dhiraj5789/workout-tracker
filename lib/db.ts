import type { TrackerState } from '@/types/tracker';
import { getSupabase } from './supabase';

const TABLE = 'tracker_state';

/** Row Level Security guarantees this only ever returns the signed-in user's row. */
export async function loadState(): Promise<TrackerState | null> {
  const { data, error } = await getSupabase().from(TABLE).select('data').maybeSingle();
  if (error) throw error;
  return (data?.data as TrackerState | undefined) ?? null;
}

export async function saveState(state: TrackerState): Promise<void> {
  const supabase = getSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not signed in');
  const { error } = await supabase
    .from(TABLE)
    .upsert({ user_id: user.id, data: state, updated_at: new Date().toISOString() });
  if (error) throw error;
}
