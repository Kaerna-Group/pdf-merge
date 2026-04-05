import { useRef, type ChangeEvent, type DragEvent } from 'react';

interface FileDropzoneProps {
  disabled?: boolean;
  onFilesSelected: (files: File[]) => void;
}

function FileDropzone({ disabled = false, onFilesSelected }: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);
    if (selected.length > 0) {
      onFilesSelected(selected);
    }

    event.target.value = '';
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

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
  };

  return (
    <section
      className={`dropzone ${disabled ? 'is-disabled' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="dropzone-content">
        <span className="dropzone-badge">Browser-only PDF workflow</span>
        <h2>Drop your PDF files here</h2>
        <p>
          Drag and drop multiple PDFs or pick them from your computer. Files stay in
          your browser and never leave your device.
        </p>
        <div className="dropzone-actions">
          <button
            type="button"
            className="primary-button"
            onClick={() => inputRef.current?.click()}
            disabled={disabled}
          >
            Choose PDFs
          </button>
          <span>or drag them into this area</span>
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
