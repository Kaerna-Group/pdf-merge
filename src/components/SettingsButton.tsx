import type { ThemePreference } from '../types/theme';

interface SettingsButtonProps {
  themePreference: ThemePreference;
  onOpen: () => void;
}

function SettingsButton({ themePreference, onOpen }: SettingsButtonProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="inline-flex min-h-12 items-center justify-center gap-3 rounded-2xl border border-white/70 bg-white/75 px-4 text-sm font-semibold text-slate-700 shadow-[0_24px_70px_-38px_rgba(15,23,42,0.55)] backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:bg-slate-900"
      aria-label="Open settings"
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-xs font-bold text-white shadow-lg shadow-cyan-500/30">
        UI
      </span>
      <span className="flex flex-col items-start leading-tight">
        <span>Settings</span>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Theme: {themePreference}</span>
      </span>
    </button>
  );
}

export default SettingsButton;
