import React, { useCallback, useRef } from 'react';

type DragDropAreaProps = {
  onFiles: (files: File[]) => void;
  accept?: string; // e.g. 'image/*'
  className?: string;
};

export const DragDropArea: React.FC<DragDropAreaProps> = ({ onFiles, accept = '*', className = '' }) => {
  const [active, setActive] = React.useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

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
      className={`dropzone ${active ? 'is-active' : ''} ${className}`.trim()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={(e) => {
          if (e.target.files) onFiles(Array.from(e.target.files));
          e.currentTarget.value = '';
        }}
      />

      <div className="dropzone__content">
        <div className="dropzone__icon" aria-hidden="true">↑</div>
        <p className="dropzone__title">Drag & drop files here</p>
        <p className="dropzone__hint">or</p>
        <button type="button" className="dropzone__button" onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}>
          Browse files
        </button>
        <small className="dropzone__hint">Accepted: {accept}</small>
      </div>
    </div>
  );
};

export default DragDropArea;
