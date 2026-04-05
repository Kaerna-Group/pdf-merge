import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useMemo, useState } from 'react';
import type { PdfItem } from '../types/pdf';
import FileListItem from './FileListItem';

interface FileListProps {
  items: PdfItem[];
  disabled: boolean;
  onRemove: (id: string) => void;
  onReorder: (items: PdfItem[]) => void;
}

function FileList({ items, disabled, onRemove, onReorder }: FileListProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const activeItem = useMemo(
    () => items.find((item) => item.id === activeId) ?? null,
    [activeId, items],
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

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

  const handleDragCancel = () => {
    setActiveId(null);
  };

  if (items.length === 0) {
    return (
      <section className="rounded-[2rem] border border-dashed border-slate-300 bg-white/70 p-10 text-center shadow-[0_30px_90px_-55px_rgba(15,23,42,0.4)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/60">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
          Empty queue
        </p>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
          Add PDFs to start the merge pipeline.
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400">
          New uploads are sorted alphabetically first. After that, you can drag files into any custom order before merging.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-[2rem] border border-white/60 bg-white/75 p-5 shadow-[0_40px_120px_-55px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/65">
      <div className="flex flex-col gap-3 border-b border-slate-200/80 pb-5 dark:border-slate-800 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-500 dark:text-cyan-300">
            Merge queue
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Drag cards to define the final page sequence.
          </h3>
        </div>
        <div className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-slate-900">
          {items.length} file(s)
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <ul className="mt-5 grid gap-4">
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

        <DragOverlay adjustScale={false} dropAnimation={null}>
          {activeItem ? (
            <div className="rotate-[0.35deg]">
              <FileListItem
                item={activeItem}
                index={items.findIndex((item) => item.id === activeItem.id)}
                disabled
                onRemove={onRemove}
                isOverlay
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </section>
  );
}

export default FileList;
