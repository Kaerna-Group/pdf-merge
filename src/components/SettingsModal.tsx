import { useEffect } from 'react';
import type { ThemePreference } from '../types/theme';

interface SettingsModalProps {
  isOpen: boolean;
  themePreference: ThemePreference;
  onClose: () => void;
  onThemeChange: (theme: ThemePreference) => void;
}

const themeOptions: Array<{
  value: ThemePreference;
  title: string;
  description: string;
}> = [
  {
    value: 'light',
    title: 'Light',
    description: 'Bright glass surfaces with crisp contrast.',
  },
  {
    value: 'dark',
    title: 'Dark',
    description: 'Cinematic contrast with deeper glow and softer glare.',
  },
  {
    value: 'system',
    title: 'System',
    description: 'Follows the operating system preference automatically.',
  },
];

function SettingsModal({ isOpen, themePreference, onClose, onThemeChange }: SettingsModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const activeOption = themeOptions.find((option) => option.value === themePreference) ?? themeOptions[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-md animate-[fadeIn_160ms_ease-out]" onClick={onClose}>
      <div
        className="w-full max-w-xl rounded-[2.15rem] border border-white/70 bg-white/92 p-6 shadow-[0_50px_120px_-40px_rgba(15,23,42,0.55)] backdrop-blur-2xl animate-[modalIn_220ms_cubic-bezier(0.16,1,0.3,1)] dark:border-white/10 dark:bg-slate-900/90 sm:p-7"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-500 dark:text-cyan-300">
              Preferences
            </p>
            <h2 id="settings-title" className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
              Visual settings
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-7 text-slate-600 dark:text-slate-300">
              Theme preference is stored in localStorage. That is the correct fit here because the app is fully client-side and the server never needs this state.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition duration-200 hover:rotate-90 hover:bg-slate-50 active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            aria-label="Close settings"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="mt-8 rounded-[1.6rem] border border-slate-200 bg-slate-100/80 p-1.5 dark:border-slate-800 dark:bg-slate-950/70">
          <div className="grid grid-cols-3 gap-1.5">
            {themeOptions.map((option) => {
              const isActive = option.value === themePreference;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onThemeChange(option.value)}
                  className={`rounded-[1.1rem] px-4 py-3 text-sm font-semibold transition duration-200 ${
                    isActive
                      ? 'bg-white text-slate-950 shadow-[0_20px_40px_-28px_rgba(15,23,42,0.55)] dark:bg-slate-800 dark:text-white'
                      : 'text-slate-500 hover:text-slate-900 active:scale-[0.98] dark:text-slate-400 dark:hover:text-slate-100'
                  }`}
                >
                  {option.title}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 rounded-[1.7rem] border border-white/70 bg-white/80 p-5 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.45)] dark:border-white/10 dark:bg-slate-950/60">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">Selected profile</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">{activeOption.title}</h3>
            </div>
            <div className={`h-14 w-14 rounded-2xl border border-white/80 shadow-inner dark:border-white/10 ${themePreference === 'light' ? 'bg-[linear-gradient(135deg,#fef3c7,#ffffff)]' : themePreference === 'dark' ? 'bg-[linear-gradient(135deg,#020617,#155e75)]' : 'bg-[linear-gradient(135deg,#f8fafc,#0f172a)]'}`} />
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{activeOption.description}</p>
        </div>

        <div className="mt-7 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-25px_rgba(15,23,42,0.6)] active:translate-y-0 active:scale-[0.98] dark:bg-white dark:text-slate-950"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
