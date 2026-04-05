import type { MergeStatus } from '../types/pdf';
import type { ThemePreference } from '../types/theme';

interface HeroSectionProps {
  filesCount: number;
  status: MergeStatus;
  themePreference: ThemePreference;
}

function HeroSection({ filesCount, status, themePreference }: HeroSectionProps) {
  const statusLabel = status === 'success' ? 'Ready' : status === 'merging' ? 'Live' : 'Idle';

  return (
    <section className="relative overflow-hidden rounded-[2.75rem] border border-white/70 bg-white/80 p-6 shadow-[0_55px_140px_-60px_rgba(15,23,42,0.5)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/68 sm:p-8 lg:p-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.22),_transparent_26%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.12),_transparent_28%)] dark:bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.12),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.1),_transparent_28%)]" />
      <div className="relative">
        <h1 className="max-w-5xl text-4xl font-semibold tracking-[-0.05em] text-slate-950 dark:text-white sm:text-6xl lg:text-[4.5rem] lg:leading-[0.98]">
          Merge PDFs in a polished workspace with premium light and dark themes.
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
          Files stay in the browser, new uploads sort alphabetically first, and drag-and-drop gives full control over the final order before export.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[1.75rem] border border-white/80 bg-white/85 p-5 shadow-[0_25px_80px_-50px_rgba(15,23,42,0.35)] transition hover:-translate-y-1 hover:shadow-[0_40px_100px_-55px_rgba(15,23,42,0.45)] dark:border-white/10 dark:bg-slate-950/55">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">Queued PDFs</p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">{filesCount}</p>
          </div>
          <div className="rounded-[1.75rem] border border-white/80 bg-white/85 p-5 shadow-[0_25px_80px_-50px_rgba(15,23,42,0.35)] transition hover:-translate-y-1 hover:shadow-[0_40px_100px_-55px_rgba(15,23,42,0.45)] dark:border-white/10 dark:bg-slate-950/55">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">Current status</p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">{statusLabel}</p>
          </div>
          <div className="rounded-[1.75rem] border border-white/80 bg-white/85 p-5 shadow-[0_25px_80px_-50px_rgba(15,23,42,0.35)] transition hover:-translate-y-1 hover:shadow-[0_40px_100px_-55px_rgba(15,23,42,0.45)] dark:border-white/10 dark:bg-slate-950/55">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">Theme profile</p>
            <p className="mt-3 text-4xl font-semibold capitalize tracking-tight text-slate-950 dark:text-white">{themePreference}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
