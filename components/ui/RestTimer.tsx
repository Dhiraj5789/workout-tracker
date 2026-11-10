import { useEffect, useState } from 'react';

const REST_SECONDS = 90;
const GO_MESSAGE_MS = 1500;

export function RestTimer() {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null); // null = not running

  useEffect(() => {
    if (secondsLeft === null) return;
    if (secondsLeft <= 0) {
      navigator.vibrate?.(300);
      const reset = setTimeout(() => setSecondsLeft(null), GO_MESSAGE_MS);
      return () => clearTimeout(reset);
    }
    const tick = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
    return () => clearTimeout(tick);
  }, [secondsLeft]);

  const label = secondsLeft === null ? `Rest ${REST_SECONDS}s` : secondsLeft <= 0 ? 'Go!' : `Rest ${secondsLeft}s`;

  return (
    <button id="timer" onClick={() => setSecondsLeft(secondsLeft === null ? REST_SECONDS : null)}>
      {label}
    </button>
  );
}
