import type { MergeStatus } from '../types/pdf';
import type { ThemeMode } from '../types/theme';
import ThemeToggle from './ThemeToggle';

interface HeroSectionProps {
  filesCount: number;
  status: MergeStatus;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

function HeroSection({ filesCount, status, theme, onToggleTheme }: HeroSectionProps) {
  const statusLabel = status === 'success' ? 'Ready' : status === 'merging' ? 'Live' : 'Idle';

  return (
    <header className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-start">
      <section className="rounded-[2.25rem] border border-white/60 bg-white/75 p-6 shadow-[0_45px_120px_-55px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/65 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-cyan-500 dark:text-cyan-300">
          PDF Merge Studio
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
          Merge PDFs with a UI that feels like a shipped product, not a demo.
        </h1>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
          Files stay in the browser, new uploads sort alphabetically first, and drag-and-drop gives you full control over the final order before export.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[1.6rem] border border-slate-200/80 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-950/60">
            <p className="text-sm text-slate-500 dark:text-slate-400">Queued PDFs</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{filesCount}</p>
          </div>
          <div className="rounded-[1.6rem] border border-slate-200/80 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-950/60">
            <p className="text-sm text-slate-500 dark:text-slate-400">Current status</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{statusLabel}</p>
          </div>
          <div className="rounded-[1.6rem] border border-slate-200/80 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-950/60">
            <p className="text-sm text-slate-500 dark:text-slate-400">Default ordering</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">A-Z</p>
          </div>
        </div>
      </section>

      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </header>
  );
}

export default HeroSection;
