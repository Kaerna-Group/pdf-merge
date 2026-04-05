export type MergeStatus = 'idle' | 'merging' | 'success' | 'error';

export interface PdfItem {
  id: string;
  file: File;
  name: string;
  size: number;
}

export interface MergeResult {
  blob: Blob;
  fileName: string;
}
