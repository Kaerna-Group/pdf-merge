interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex min-h-12 items-center justify-center gap-3 rounded-2xl border border-white/60 bg-white/70 px-4 text-sm font-semibold text-slate-700 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.5)] backdrop-blur-xl transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-slate-900/65 dark:text-slate-100"
      aria-label="Toggle color theme"
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs text-white dark:bg-amber-300 dark:text-slate-900">
        {theme === 'dark' ? 'DM' : 'LT'}
      </span>
      <span>{theme === 'dark' ? 'Dark mode' : 'Light mode'}</span>
    </button>
  );
}

export default ThemeToggle;
