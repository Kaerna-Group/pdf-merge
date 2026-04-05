import { useEffect, useMemo, useState } from 'react';
import ActionBar from './components/ActionBar';
import ErrorBanner from './components/ErrorBanner';
import FileDropzone from './components/FileDropzone';
import FileList from './components/FileList';
import ProgressBar from './components/ProgressBar';
import ThemeToggle from './components/ThemeToggle';
import { mergePdfs } from './services/mergePdfs';
import type { MergeStatus, PdfItem } from './types/pdf';
import { createPdfItems } from './utils/file';
import { sortByLabel } from './utils/format';

type ThemeMode = 'light' | 'dark';

const THEME_STORAGE_KEY = 'pdf-merge-theme';

function App() {
  const [files, setFiles] = useState<PdfItem[]>([]);
  const [status, setStatus] = useState<MergeStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState('Waiting for files');
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [theme, setTheme] = useState<ThemeMode>('dark');

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;

    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme);
      return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [downloadUrl]);

  const canMerge = useMemo(() => files.length > 0 && status !== 'merging', [files.length, status]);

  const resetDownload = () => {
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
    }
  };

  const resetProgressState = (label: string) => {
    setStatus('idle');
    setProgress(0);
    setProgressLabel(label);
  };

  const handleFilesSelected = (selectedFiles: File[]) => {
    const { items, errors } = createPdfItems(selectedFiles);

    setError(errors.join(' '));

    if (items.length === 0) {
      return;
    }

    resetDownload();
    resetProgressState('Waiting for merge');
    setFiles((current) => sortByLabel([...current, ...items]));
  };

  const handleRemove = (id: string) => {
    resetDownload();
    setFiles((current) => current.filter((item) => item.id !== id));
    resetProgressState('Waiting for merge');
  };

  const handleReorder = (items: PdfItem[]) => {
    resetDownload();
    setFiles(items);
    resetProgressState('Waiting for merge');
  };

  const handleClear = () => {
    resetDownload();
    setFiles([]);
    setStatus('idle');
    setProgress(0);
    setProgressLabel('Waiting for files');
    setError('');
  };

  const handleMerge = async () => {
    if (files.length === 0) {
      setError('Add at least one PDF before starting the merge.');
      return;
    }

    resetDownload();
    setError('');
    setStatus('merging');
    setProgress(0);
    setProgressLabel('Preparing files...');

    try {
      const result = await mergePdfs(files, {
        onProgress: (value, currentFileName) => {
          setProgress(value);
          setProgressLabel(`Processing ${currentFileName}`);
        },
      });

      const url = URL.createObjectURL(result.blob);
      setDownloadUrl(url);
      setStatus('success');
      setProgress(100);
      setProgressLabel('Your merged PDF is ready to download.');
    } catch (mergeError) {
      setStatus('error');
      setProgress(0);
      setProgressLabel('Merge failed');
      setError(
        mergeError instanceof Error
          ? mergeError.message
          : 'Unexpected error while merging PDFs.',
      );
    }
  };

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.2),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.15),_transparent_30%),linear-gradient(180deg,_#f8fafc_0%,_#e2e8f0_100%)] transition-colors duration-300 dark:bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.14),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.12),_transparent_28%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)]">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-white/70 to-transparent dark:from-white/5" />
      <div className="absolute left-[-10rem] top-[-8rem] h-72 w-72 rounded-full bg-cyan-300/35 blur-3xl dark:bg-cyan-500/20" />
      <div className="absolute bottom-[-8rem] right-[-8rem] h-80 w-80 rounded-full bg-emerald-200/45 blur-3xl dark:bg-emerald-400/10" />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
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
                <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{files.length}</p>
              </div>
              <div className="rounded-[1.6rem] border border-slate-200/80 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                <p className="text-sm text-slate-500 dark:text-slate-400">Current status</p>
                <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">
                  {status === 'success' ? 'Ready' : status === 'merging' ? 'Live' : 'Idle'}
                </p>
              </div>
              <div className="rounded-[1.6rem] border border-slate-200/80 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                <p className="text-sm text-slate-500 dark:text-slate-400">Default ordering</p>
                <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">A-Z</p>
              </div>
            </div>
          </section>

          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </header>

        <FileDropzone disabled={status === 'merging'} onFilesSelected={handleFilesSelected} />

        {error ? <ErrorBanner message={error} onDismiss={() => setError('')} /> : null}

        {status === 'merging' || status === 'success' ? (
          <ProgressBar value={progress} label={progressLabel} />
        ) : null}

        <ActionBar
          canMerge={canMerge}
          hasFiles={files.length > 0}
          isMerging={status === 'merging'}
          downloadUrl={downloadUrl}
          onMerge={handleMerge}
          onClear={handleClear}
        />

        <FileList
          items={files}
          disabled={status === 'merging'}
          onRemove={handleRemove}
          onReorder={handleReorder}
        />
      </main>
    </div>
  );
}

export default App;
