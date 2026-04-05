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
    <div className="flex flex-col gap-3 rounded-[2rem] border border-white/60 bg-white/75 p-4 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/65 sm:flex-row sm:flex-wrap">
      <button
        type="button"
        className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={onMerge}
        disabled={!canMerge}
      >
        {isMerging ? 'Merging PDFs...' : 'Merge PDFs'}
      </button>

      <button
        type="button"
        className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-700"
        onClick={onClear}
        disabled={!hasFiles || isMerging}
      >
        Clear queue
      </button>

      <a
        className={`inline-flex min-h-12 items-center justify-center rounded-2xl px-5 text-sm font-semibold transition sm:ml-auto ${
          downloadUrl
            ? 'border border-emerald-300 bg-emerald-50 text-emerald-700 hover:-translate-y-0.5 hover:bg-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300 dark:hover:bg-emerald-500/15'
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
