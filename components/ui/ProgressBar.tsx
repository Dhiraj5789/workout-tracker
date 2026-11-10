export function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(percent)}>
      <i style={{ width: `${percent}%` }} />
    </div>
  );
}
