import { useState, useRef, type ChangeEvent, type DragEvent } from 'react';

interface FileDropzoneProps {
  disabled?: boolean;
  onFilesSelected: (files: File[]) => void;
}

function FileDropzone({ disabled = false, onFilesSelected }: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);
    if (selected.length > 0) {
      onFilesSelected(selected);
    }

    event.target.value = '';
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (disabled) {
      return;
    }

    const droppedFiles = Array.from(event.dataTransfer.files ?? []);
    if (droppedFiles.length > 0) {
      onFilesSelected(droppedFiles);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsDragging(false);
    }
  };

  return (
    <section
      className={`relative overflow-hidden rounded-[2rem] border p-6 shadow-[0_40px_120px_-55px_rgba(15,23,42,0.45)] backdrop-blur-xl transition duration-300 ${
        isDragging
          ? 'border-cyan-300 bg-cyan-50/90 dark:border-cyan-400/70 dark:bg-cyan-500/10'
          : 'border-white/60 bg-white/75 dark:border-white/10 dark:bg-slate-900/65'
      } ${disabled ? 'opacity-60' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="absolute inset-4 rounded-[1.5rem] border border-dashed border-slate-300/90 dark:border-slate-700/90" />
      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="inline-flex rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white dark:bg-white dark:text-slate-900">
            Local-only processing
          </p>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            Drop PDFs into a queue that actually looks premium.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
            Upload multiple files, start from alphabetical order, then fine-tune the sequence with drag and drop before merging.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
            onClick={() => inputRef.current?.click()}
            disabled={disabled}
          >
            Choose PDFs
          </button>
          <span className="text-sm text-slate-500 dark:text-slate-400">or drag them here</span>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        multiple
        hidden
        onChange={handleInputChange}
      />
    </section>
  );
}

export default FileDropzone;
