interface ActionBarProps {
  canMerge: boolean;
  hasFiles: boolean;
  isMerging: boolean;
  downloadUrl: string | null;
  onMerge: () => void;
  onClear: () => void;
}

function ActionBar({
  canMerge,
  hasFiles,
  isMerging,
  downloadUrl,
  onMerge,
  onClear,
}: ActionBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-[2.1rem] border border-white/60 bg-white/75 p-4 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/65 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="pr-2 sm:min-w-[180px]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-400 dark:text-slate-500">Actions</p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Merge the queue or export the final PDF.</p>
      </div>

      <button
        type="button"
        className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 px-5 text-sm font-semibold text-white shadow-[0_18px_45px_-20px_rgba(14,165,233,0.75)] transition duration-200 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_24px_60px_-18px_rgba(14,165,233,0.85)] active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
        onClick={onMerge}
        disabled={!canMerge}
      >
        {isMerging ? 'Merging PDFs...' : 'Merge PDFs'}
      </button>

      <button
        type="button"
        className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:bg-slate-50 hover:shadow-[0_20px_45px_-28px_rgba(15,23,42,0.28)] active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-700"
        onClick={onClear}
        disabled={!hasFiles || isMerging}
      >
        Clear queue
      </button>

      <a
        className={`inline-flex min-h-12 items-center justify-center rounded-2xl px-5 text-sm font-semibold transition duration-200 sm:ml-auto ${
          downloadUrl
            ? 'border border-emerald-300 bg-emerald-50 text-emerald-700 hover:-translate-y-1 hover:bg-emerald-100 hover:shadow-[0_20px_50px_-28px_rgba(16,185,129,0.45)] active:translate-y-0 active:scale-[0.99] dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300 dark:hover:bg-emerald-500/15'
            : 'pointer-events-none border border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-600'
        }`}
        href={downloadUrl ?? undefined}
        download="merged.pdf"
        aria-disabled={!downloadUrl}
      >
        Download merged.pdf
      </a>
    </div>
  );
}

export default ActionBar;
