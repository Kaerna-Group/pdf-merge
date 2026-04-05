import type { PropsWithChildren } from 'react';

function AppBackground({ children }: PropsWithChildren) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.2),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.15),_transparent_30%),linear-gradient(180deg,_#f8fafc_0%,_#e2e8f0_100%)] transition-colors duration-300 dark:bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.14),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.12),_transparent_28%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)]">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-white/70 to-transparent dark:from-white/5" />
      <div className="absolute left-[-10rem] top-[-8rem] h-72 w-72 rounded-full bg-cyan-300/35 blur-3xl dark:bg-cyan-500/20" />
      <div className="absolute bottom-[-8rem] right-[-8rem] h-80 w-80 rounded-full bg-emerald-200/45 blur-3xl dark:bg-emerald-400/10" />
      {children}
    </div>
  );
}

export default AppBackground;
