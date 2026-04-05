interface SettingsButtonProps {
  onOpen: () => void;
}

function SettingsButton({ onOpen }: SettingsButtonProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/70 bg-white/80 text-slate-700 shadow-[0_24px_70px_-38px_rgba(15,23,42,0.55)] backdrop-blur-2xl transition duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:bg-white active:translate-y-0 active:scale-100 dark:border-white/10 dark:bg-slate-900/75 dark:text-slate-100 dark:hover:bg-slate-900"
      aria-label="Open settings"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3.25" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8.92 4.6H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.64.27 1.1.9 1.1 1.6V11a1.65 1.65 0 0 0 1.5 1H22a2 2 0 1 1 0 4h-.09c-.7 0-1.33.46-1.6 1Z" />
      </svg>
    </button>
  );
}

export default SettingsButton;
