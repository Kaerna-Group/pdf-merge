import { useEffect, useMemo, useState } from 'react';
import { mergePdfs } from '../services/mergePdfs';
import type { MergeStatus, PdfItem } from '../types/pdf';
import { createPdfItems } from '../utils/file';
import { sortByLabel } from '../utils/format';

export function usePdfMerge() {
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

  return {
    files,
    status,
    progress,
    progressLabel,
    error,
    downloadUrl,
    canMerge,
    setError,
    handleFilesSelected,
    handleRemove,
    handleReorder,
    handleClear,
    handleMerge,
  };
}
