'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useTrackerState } from '@/hooks/useTrackerState';
import type { TabId } from '@/types/tracker';
import { BottomNav } from './ui/BottomNav';
import { RestTimer } from './ui/RestTimer';
import { SaveStatusBadge } from './ui/SaveStatusBadge';
import { WeekTab } from './week/WeekTab';

// The Week tab is the landing view, so it ships in the main bundle.
// The other tabs are fetched the first time they are opened.
const TabFallback = () => <p className="mu">Loading…</p>;
const ProgressTab = dynamic(() => import('./progress/ProgressTab'), { loading: TabFallback });
const BodyTab = dynamic(() => import('./body/BodyTab'), { loading: TabFallback });

export function Tracker() {
  const { state, update, ready, loadFailed, status } = useTrackerState();
  const [activeTab, setActiveTab] = useState<TabId>('week');

  if (!ready) return <main><TabFallback /></main>;

  return (
    <>
      <SaveStatusBadge status={loadFailed ? 'error' : status} />
      <main>
        {activeTab === 'week' && <WeekTab state={state} update={update} />}
        {activeTab === 'progress' && <ProgressTab state={state} update={update} />}
        {activeTab === 'body' && <BodyTab state={state} update={update} />}
      </main>
      <RestTimer />
      <BottomNav active={activeTab} onChange={setActiveTab} />
    </>
  );
}
