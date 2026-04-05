import { useEffect, useMemo, useState } from 'react';
import ActionBar from './components/ActionBar';
import ErrorBanner from './components/ErrorBanner';
import FileDropzone from './components/FileDropzone';
import FileList from './components/FileList';
import ProgressBar from './components/ProgressBar';
import { mergePdfs } from './services/mergePdfs';
import type { MergeStatus, PdfItem } from './types/pdf';
import { createPdfItems } from './utils/file';

function App() {
  const [files, setFiles] = useState<PdfItem[]>([]);
  const [status, setStatus] = useState<MergeStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState('Waiting for files');
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

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

  const handleFilesSelected = (selectedFiles: File[]) => {
    const { items, errors } = createPdfItems(selectedFiles);

    if (errors.length > 0) {
      setError(errors.join(' '));
    } else {
      setError('');
    }

    if (items.length === 0) {
      return;
    }

    resetDownload();
    setStatus('idle');
    setProgress(0);
    setProgressLabel('Waiting for merge');
    setFiles((current) => [...current, ...items]);
  };

  const handleRemove = (id: string) => {
    resetDownload();
    setFiles((current) => current.filter((item) => item.id !== id));
    setStatus('idle');
    setProgress(0);
    setProgressLabel('Waiting for merge');
  };

  const handleReorder = (items: PdfItem[]) => {
    resetDownload();
    setFiles(items);
    setStatus('idle');
    setProgress(0);
    setProgressLabel('Waiting for merge');
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

  return (
    <div className="app-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <main className="app-container">
        <section className="hero-card">
          <div className="hero-copy">
            <span className="eyebrow">PDF Merge Studio</span>
            <h1>Combine multiple PDFs into one polished file in your browser.</h1>
            <p>
              Upload, reorder, remove, and merge PDFs without a backend. Everything
              stays local to your device.
            </p>
          </div>
          <div className="hero-stats">
            <div>
              <strong>{files.length}</strong>
              <span>files queued</span>
            </div>
            <div>
              <strong>{status === 'success' ? 'Ready' : status === 'merging' ? 'Live' : 'Idle'}</strong>
              <span>merge status</span>
            </div>
          </div>
        </section>

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
