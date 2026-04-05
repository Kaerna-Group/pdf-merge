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
  accent: string;
}> = [
  {
    value: 'light',
    title: 'Light',
    description: 'Bright canvas with glass cards and crisp contrast.',
    accent: 'from-amber-200 via-orange-200 to-white',
  },
  {
    value: 'dark',
    title: 'Dark',
    description: 'Deeper cinematic look for long sessions and stronger glow.',
    accent: 'from-slate-900 via-cyan-950 to-slate-800',
  },
  {
    value: 'system',
    title: 'System',
    description: 'Tracks the operating system preference automatically.',
    accent: 'from-cyan-200 via-white to-slate-900',
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-md" onClick={onClose}>
      <div
        className="w-full max-w-2xl rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_50px_120px_-40px_rgba(15,23,42,0.55)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/88 sm:p-7"
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
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Theme preference is stored in localStorage. That is the right fit here because the app is fully client-side and the server does not need to read this setting.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            aria-label="Close settings"
          >
            ?
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {themeOptions.map((option) => {
            const isActive = option.value === themePreference;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onThemeChange(option.value)}
                className={`group rounded-[1.6rem] border p-4 text-left transition ${
                  isActive
                    ? 'border-cyan-400 bg-cyan-50 shadow-[0_30px_80px_-40px_rgba(6,182,212,0.5)] dark:border-cyan-400/60 dark:bg-cyan-500/10'
                    : 'border-slate-200 bg-white hover:-translate-y-1 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-slate-700'
                }`}
              >
                <div className={`h-28 rounded-[1.2rem] bg-gradient-to-br ${option.accent}`} />
                <div className="mt-4 flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{option.title}</h3>
                  <span className={`inline-flex h-5 w-5 rounded-full border-2 ${isActive ? 'border-cyan-500 bg-cyan-500' : 'border-slate-300 dark:border-slate-600'}`} />
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{option.description}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-7 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
