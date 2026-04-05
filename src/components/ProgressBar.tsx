interface ProgressBarProps {
  value: number;
  label: string;
}

function ProgressBar({ value, label }: ProgressBarProps) {
  return (
    <section
      className="rounded-[1.9rem] border border-white/60 bg-white/75 p-5 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/65"
      aria-live="polite"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-500 dark:text-cyan-300">
            Merge progress
          </p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{label}</p>
        </div>
        <div className="text-2xl font-semibold text-slate-900 dark:text-white">{value}%</div>
      </div>

      <div
        className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-400 transition-all duration-300"
          style={{ width: `${value}%` }}
        />
      </div>
    </section>
  );
}

export default ProgressBar;
