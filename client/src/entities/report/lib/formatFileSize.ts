export const formatFileSize = (sizeKb: number | null) =>
  sizeKb ? `${(sizeKb / 1024).toFixed(1)} MB` : '—'
