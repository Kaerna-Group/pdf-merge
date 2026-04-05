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
      className={`file-item ${isDragging ? 'is-dragging' : ''}`}
    >
      <button
        type="button"
        className="drag-handle"
        aria-label={`Reorder ${item.name}`}
        disabled={disabled}
        {...attributes}
        {...listeners}
      >
        <span />
        <span />
      </button>

      <div className="file-meta">
        <p className="file-name">{item.name}</p>
        <p className="file-details">
          #{index + 1} in queue • {formatFileSize(item.size)}
        </p>
      </div>

      <button
        type="button"
        className="remove-button"
        onClick={() => onRemove(item.id)}
        disabled={disabled}
      >
        Remove
      </button>
    </li>
  );
}

export default FileListItem;
