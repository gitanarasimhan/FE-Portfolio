import React, { useRef, useEffect } from 'react';

export type Option = { value: string; label: string };

type Props = {
  options: Option[];
  value?: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export const Dropdown: React.FC<Props> = ({ options, value, onChange, placeholder = 'Select', className = '' }) => {
  const [open, setOpen] = React.useState(false);
  const [highlight, setHighlight] = React.useState(0);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (open) listRef.current?.querySelector('li')?.scrollIntoView({ block: 'nearest' });
  }, [open, highlight]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); setHighlight(h => Math.min(h + 1, options.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setHighlight(h => Math.max(h - 1, 0)); }
      if (e.key === 'Enter') { e.preventDefault(); const opt = options[highlight]; onSelect(opt); }
      if (e.key === 'Escape') { setOpen(false); buttonRef.current?.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, highlight, options]);

  const onSelect = (opt: Option) => { onChange(opt.value); setOpen(false); buttonRef.current?.focus(); };

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        className="px-4 py-2 border rounded-md bg-white flex items-center justify-between w-48"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <span>{options.find(o => o.value === value)?.label ?? placeholder}</span>
        <svg className="ml-2" width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          tabIndex={-1}
          className="absolute mt-1 w-48 max-h-60 overflow-auto shadow-lg"
          style={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: 8, zIndex: 40 }}
        >
          {options.map((opt, i) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              onMouseEnter={() => setHighlight(i)}
              onClick={() => onSelect(opt)}
              className={`px-3 py-2 cursor-pointer ${i === highlight ? 'bg-gray-100' : ''}`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
