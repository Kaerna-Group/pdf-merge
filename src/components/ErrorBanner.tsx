interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  return (
    <div
      className="flex flex-col gap-4 rounded-[1.75rem] border border-rose-200/80 bg-rose-50/90 p-4 text-rose-950 shadow-[0_25px_70px_-45px_rgba(225,29,72,0.55)] backdrop-blur-xl dark:border-rose-500/25 dark:bg-rose-500/10 dark:text-rose-100 sm:flex-row sm:items-start sm:justify-between"
      role="alert"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500 dark:text-rose-300">
          Merge error
        </p>
        <p className="mt-2 text-sm leading-6">{message}</p>
      </div>
      <button
        type="button"
        className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-rose-300/70 px-4 text-sm font-semibold transition hover:bg-rose-100 dark:border-rose-400/20 dark:hover:bg-rose-500/10"
        onClick={onDismiss}
      >
        Dismiss
      </button>
    </div>
  );
}

export default ErrorBanner;
