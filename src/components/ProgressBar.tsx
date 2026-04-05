interface ProgressBarProps {
  value: number;
  label: string;
}

function ProgressBar({ value, label }: ProgressBarProps) {
  return (
    <section className="progress-card" aria-live="polite">
      <div className="progress-header">
        <span>Merging PDFs</span>
        <span>{value}%</span>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div className="progress-fill" style={{ width: `${value}%` }} />
      </div>
      <p className="progress-label">{label}</p>
    </section>
  );
}

export default ProgressBar;
