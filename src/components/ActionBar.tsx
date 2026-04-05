interface ActionBarProps {
  canMerge: boolean;
  hasFiles: boolean;
  isMerging: boolean;
  downloadUrl: string | null;
  onMerge: () => void;
  onClear: () => void;
}

function ActionBar({
  canMerge,
  hasFiles,
  isMerging,
  downloadUrl,
  onMerge,
  onClear,
}: ActionBarProps) {
  return (
    <div className="action-bar">
      <button
        type="button"
        className="primary-button"
        onClick={onMerge}
        disabled={!canMerge}
      >
        {isMerging ? 'Merging...' : 'Merge PDFs'}
      </button>

      <button
        type="button"
        className="ghost-button"
        onClick={onClear}
        disabled={!hasFiles || isMerging}
      >
        Clear list
      </button>

      <a
        className={`download-button ${downloadUrl ? '' : 'is-disabled'}`}
        href={downloadUrl ?? undefined}
        download="merged.pdf"
        aria-disabled={!downloadUrl}
      >
        Download merged.pdf
      </a>
    </div>
  );
}

export default ActionBar;
