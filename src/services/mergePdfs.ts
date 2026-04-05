import { PDFDocument } from 'pdf-lib';
import type { MergeResult, PdfItem } from '../types/pdf';

interface MergeOptions {
  fileName?: string;
  onProgress?: (value: number, currentFileName: string) => void;
}

export async function mergePdfs(
  files: PdfItem[],
  options: MergeOptions = {},
): Promise<MergeResult> {
  if (files.length === 0) {
    throw new Error('Add at least one PDF file before merging.');
  }

  const mergedPdf = await PDFDocument.create();
  const fileName = options.fileName ?? 'merged.pdf';

  for (let index = 0; index < files.length; index += 1) {
    const current = files[index];
    options.onProgress?.(Math.round((index / files.length) * 100), current.name);

    let sourceBytes: ArrayBuffer;

    try {
      sourceBytes = await current.file.arrayBuffer();
    } catch {
      throw new Error(`"${current.name}" could not be read.`);
    }

    let sourcePdf: PDFDocument;

    try {
      sourcePdf = await PDFDocument.load(sourceBytes, {
        ignoreEncryption: false,
      });
    } catch {
      throw new Error(`"${current.name}" is not a valid readable PDF.`);
    }

    const pages = await mergedPdf.copyPages(sourcePdf, sourcePdf.getPageIndices());
    pages.forEach((page) => mergedPdf.addPage(page));

    options.onProgress?.(
      Math.round(((index + 1) / files.length) * 100),
      current.name,
    );
  }

  const mergedBytes = await mergedPdf.save();
  const blobBytes = mergedBytes.slice().buffer;
  const blob = new Blob([blobBytes], { type: 'application/pdf' });

  return {
    blob,
    fileName,
  };
}
