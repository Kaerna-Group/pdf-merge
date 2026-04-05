import type { PdfItem } from '../types/pdf';

const PDF_MIME_TYPE = 'application/pdf';

export function validatePdfFile(file: File): string | null {
  const hasPdfMimeType = file.type === PDF_MIME_TYPE;
  const hasPdfExtension = file.name.toLowerCase().endsWith('.pdf');

  if (!hasPdfMimeType && !hasPdfExtension) {
    return `"${file.name}" is not a PDF file.`;
  }

  return null;
}

export function createPdfItems(files: File[]): { items: PdfItem[]; errors: string[] } {
  const items: PdfItem[] = [];
  const errors: string[] = [];

  files.forEach((file) => {
    const validationError = validatePdfFile(file);

    if (validationError) {
      errors.push(validationError);
      return;
    }

    items.push({
      id: crypto.randomUUID(),
      file,
      name: file.name,
      size: file.size,
    });
  });

  return { items, errors };
}
