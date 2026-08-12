import React, { useCallback } from 'react';

type DragDropAreaProps = {
  onFiles: (files: File[]) => void;
  accept?: string; // e.g. 'image/*'
  className?: string;
};

export const DragDropArea: React.FC<DragDropAreaProps> = ({ onFiles, accept = '*', className = '' }) => {
  const [active, setActive] = React.useState(false);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setActive(false);
    const files = Array.from(e.dataTransfer.files).filter(f => {
      if (accept === '*') return true;
      try { return f.type.match(accept); } catch { return true; }
    });
    if (files.length) onFiles(files);
  }, [onFiles, accept]);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setActive(true); }}
      onDragLeave={() => setActive(false)}
      onDrop={onDrop}
      className={`border-dashed border-2 p-6 rounded-md text-center ${className}`}
      style={{ borderColor: 'var(--color-border)', background: active ? '#f1f5f9' : 'transparent' }}
    >
      <p className="mb-2">Drag & drop files here</p>
      <p className="text-sm text-[var(--color-muted)]">Accepted: {accept}</p>
      <input type="file" className="hidden" onChange={(e) => { if (e.target.files) onFiles(Array.from(e.target.files)); }} />
    </div>
  );
};

export default DragDropArea;
