import type { BodyField, DayKind, Exercise, WorkoutId } from '@/types/tracker';
import { youtubeSearchUrl } from './youtube';

const ex = (name: string, scheme: string, formUrl?: string): Exercise => ({ name, scheme, formUrl });

export const AT_HOME_VIDEO_URL = youtubeSearchUrl('full body bodyweight workout at home no equipment');

export const QUICK_LINKS = [
  { label: 'Mobility warm-up (10 min)', url: 'https://www.youtube.com/watch?v=AM_lVBx1f6Q' },
  { label: 'Stretching (10 min)', url: youtubeSearchUrl('10 minute full body stretching after workout') },
  { label: 'At-home bodyweight workout', url: AT_HOME_VIDEO_URL },
  { label: 'Run warm-up', url: youtubeSearchUrl('10 minute dynamic warm up before running') },
] as const;

export const WORKOUTS: Record<WorkoutId, readonly Exercise[]> = {
  A: [
    ex('Incline dumbbell press', '3 × 8–12', 'https://youtube.com/shorts/8fXfwG4ftaQ'),
    ex('Barbell squat', '3 × 6–8', 'https://youtube.com/shorts/iKCJCydYYrE'),
    ex('T-bar row', '3 × 8–12', 'https://youtube.com/shorts/Nm3M-4fmprk'),
    ex('Dumbbell lateral raise', '3 × 12–15', 'https://youtube.com/shorts/Kl3LEzQ5Zqs'),
    ex('Incline dumbbell curl', '3 × 8–12, superset'),
    ex('Overhead dumbbell triceps extension', '3 × 8–12, superset', 'https://youtube.com/shorts/ekEo-BSg0_U'),
  ],
  B: [
    ex('Barbell bench press', '3 × 5–8', 'https://youtube.com/shorts/_FkbD0FhgVE'),
    ex('Dumbbell Romanian deadlift', '3 × 6–8', 'https://youtube.com/shorts/fW8-0VV13w4'),
    ex('Lat pulldown', '3 × 8–12', 'https://youtube.com/shorts/OwDZmfaTTBA'),
    ex('Walking lunges', '2 × 8 per leg'),
    ex('Dumbbell hammer curl', '3 × 8–12'),
    ex('Reverse crunch', '3 × 10–15', 'https://youtube.com/shorts/ZyE4r7wiI6w'),
  ],
  C: [
    ex('Seated dumbbell shoulder press', '3 × 8–12', 'https://youtube.com/shorts/k6tzKisR3NY'),
    ex('One-arm dumbbell row', '3 × 8–12', 'https://youtube.com/shorts/rO4Q7nW0ygo'),
    ex('Standing dumbbell lunge', '3 × 8–10 per leg', 'https://www.youtube.com/watch?v=FnUEsp-mQpU'),
    ex('Leg curl', '2 × 10–15', 'https://youtube.com/shorts/FMCq0hT3KRU'),
    ex('Pec deck fly', '2 × 10–15', 'https://youtube.com/shorts/a9vQ_hwIksU'),
    ex('Standing calf raise', '3 × 10–15, superset'),
    ex('Reverse pec deck', '3 × 10–15, superset', 'https://youtube.com/shorts/7tgx6QHB0-A'),
  ],
};

export const HOME_WORKOUT: readonly Exercise[] = [
  ex('Push-ups', '3 × 2 reps short of failure'),
  ex('Rear-foot-elevated split squat', '3 × 10 per leg'),
  ex('Backpack or towel row', '3 × 12'),
  ex('Single-leg glute bridge', '3 × 12 per leg'),
  ex('Pike push-up', '3 × 8'),
  ex('Plank', '3 × 40 s'),
];

export const RUN_EXERCISE: readonly Exercise[] = [ex('Warm-up, run, then stretch', 'Log it when done')];

export const WEEK_PLAN: readonly { day: string; kind: DayKind }[] = [
  { day: 'Mon', kind: 'A' },
  { day: 'Tue', kind: 'Rest' },
  { day: 'Wed', kind: 'B' },
  { day: 'Thu', kind: 'Rest' },
  { day: 'Fri', kind: 'C' },
  { day: 'Sat', kind: 'Run' },
  { day: 'Sun', kind: 'Rest' },
];

export const isWorkout = (kind: DayKind): kind is WorkoutId => kind === 'A' || kind === 'B' || kind === 'C';

export const BODY_FIELDS: readonly { key: BodyField; label: string }[] = [
  { key: 'weight', label: 'Weight (kg)' },
  { key: 'bf', label: 'Body fat %' },
  { key: 'waist', label: 'Waist' },
  { key: 'hips', label: 'Hips' },
  { key: 'thigh', label: 'Thigh' },
  { key: 'chest', label: 'Chest' },
  { key: 'arm', label: 'Upper arm' },
  { key: 'shoulders', label: 'Shoulders' },
];

/** Prefill for the very first measurement form. */
export const STARTING_BASELINE = { weight: 70, bf: 27 } as const;
