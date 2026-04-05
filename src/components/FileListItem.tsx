import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import type { PdfItem } from '../types/pdf';
import { formatFileSize } from '../utils/format';

interface FileListItemProps {
  item: PdfItem;
  index: number;
  disabled: boolean;
  onRemove: (id: string) => void;
}

function FileListItem({ item, index, disabled, onRemove }: FileListItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`grid grid-cols-[auto_minmax(0,1fr)] gap-4 rounded-[1.6rem] border p-4 shadow-[0_25px_80px_-50px_rgba(15,23,42,0.55)] transition sm:grid-cols-[auto_minmax(0,1fr)_auto] ${
        isDragging
          ? 'border-cyan-300 bg-cyan-50 dark:border-cyan-400/60 dark:bg-cyan-500/10'
          : 'border-white/60 bg-white/80 dark:border-white/10 dark:bg-slate-900/70'
      }`}
    >
      <button
        type="button"
        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        aria-label={`Reorder ${item.name}`}
        disabled={disabled}
        {...attributes}
        {...listeners}
      >
        <span className="grid gap-1.5">
          <span className="h-0.5 w-4 rounded-full bg-current" />
          <span className="h-0.5 w-4 rounded-full bg-current" />
          <span className="h-0.5 w-4 rounded-full bg-current" />
        </span>
      </button>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white dark:bg-white dark:text-slate-900">
            #{index + 1}
          </span>
          <p className="truncate text-base font-semibold text-slate-950 dark:text-white">{item.name}</p>
        </div>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {formatFileSize(item.size)} • Drag to change the final merge order
        </p>
      </div>

      <button
        type="button"
        className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 px-4 text-sm font-semibold text-rose-700 transition hover:-translate-y-0.5 hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-200 dark:hover:bg-rose-500/15"
        onClick={() => onRemove(item.id)}
        disabled={disabled}
      >
        Remove
      </button>
    </li>
  );
}

export default FileListItem;
