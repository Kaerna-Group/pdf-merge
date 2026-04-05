import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import type { PdfItem } from '../types/pdf';
import FileListItem from './FileListItem';

interface FileListProps {
  items: PdfItem[];
  disabled: boolean;
  onRemove: (id: string) => void;
  onReorder: (items: PdfItem[]) => void;
}

function FileList({ items, disabled, onRemove, onReorder }: FileListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    if (oldIndex < 0 || newIndex < 0) {
      return;
    }

    onReorder(arrayMove(items, oldIndex, newIndex));
  };

  if (items.length === 0) {
    return (
      <section className="file-panel empty-state">
        <h3>No PDFs added yet</h3>
        <p>Once you add files, you can sort them, remove them, and merge them into one document.</p>
      </section>
    );
  }

  return (
    <section className="file-panel">
      <div className="file-panel-header">
        <div>
          <h3>Merge queue</h3>
          <p>Drag files to set the page order in the final merged document.</p>
        </div>
        <span className="file-count">{items.length} file(s)</span>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <ul className="file-list">
            {items.map((item, index) => (
              <FileListItem
                key={item.id}
                item={item}
                index={index}
                disabled={disabled}
                onRemove={onRemove}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </section>
  );
}

export default FileList;
