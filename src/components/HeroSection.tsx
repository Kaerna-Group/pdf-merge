import type { MergeStatus } from '../types/pdf';
import type { ThemePreference } from '../types/theme';
import SettingsButton from './SettingsButton';

interface HeroSectionProps {
  filesCount: number;
  status: MergeStatus;
  themePreference: ThemePreference;
  onOpenSettings: () => void;
}

function HeroSection({ filesCount, status, themePreference, onOpenSettings }: HeroSectionProps) {
  const statusLabel = status === 'success' ? 'Ready' : status === 'merging' ? 'Live' : 'Idle';

  return (
    <header className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-start">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/80 p-6 shadow-[0_55px_140px_-60px_rgba(15,23,42,0.5)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/68 sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.22),_transparent_26%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.12),_transparent_28%)] dark:bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.12),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.1),_transparent_28%)]" />
        <div className="relative">
          <p className="inline-flex rounded-full border border-cyan-200/80 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.34em] text-cyan-600 shadow-sm dark:border-cyan-400/20 dark:bg-slate-950/40 dark:text-cyan-300">
            PDF Merge Studio
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
            Merge PDFs in a polished workspace with premium light and dark themes.
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
            Files stay in the browser, new uploads sort alphabetically first, and drag-and-drop gives full control over the final order before export.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.75rem] border border-white/80 bg-white/85 p-5 shadow-[0_25px_80px_-50px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-slate-950/55">
              <p className="text-sm text-slate-500 dark:text-slate-400">Queued PDFs</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{filesCount}</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/80 bg-white/85 p-5 shadow-[0_25px_80px_-50px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-slate-950/55">
              <p className="text-sm text-slate-500 dark:text-slate-400">Current status</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{statusLabel}</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/80 bg-white/85 p-5 shadow-[0_25px_80px_-50px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-slate-950/55">
              <p className="text-sm text-slate-500 dark:text-slate-400">Theme profile</p>
              <p className="mt-2 text-3xl font-semibold capitalize text-slate-950 dark:text-white">{themePreference}</p>
            </div>
          </div>
        </div>
      </section>

      <SettingsButton themePreference={themePreference} onOpen={onOpenSettings} />
    </header>
  );
}

export default HeroSection;
