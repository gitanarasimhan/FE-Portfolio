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
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) listRef.current?.querySelector('li')?.scrollIntoView({ block: 'nearest' });
  }, [open, highlight]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); setHighlight(h => Math.min(h + 1, options.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setHighlight(h => Math.max(h - 1, 0)); }
      if (e.key === 'Enter') { e.preventDefault(); const opt = options[highlight]; if (opt) onSelect(opt); }
      if (e.key === 'Escape') { setOpen(false); buttonRef.current?.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, highlight, options]);

  const onSelect = (opt: Option) => { onChange(opt.value); setOpen(false); buttonRef.current?.focus(); };

  return (
    <div ref={wrapperRef} className={`dropdown-shell ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        className="dropdown-trigger"
      >
        <span className="dropdown-trigger__label">{options.find(o => o.value === value)?.label ?? placeholder}</span>
        <span className="dropdown-trigger__icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      </button>

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          tabIndex={-1}
          className="dropdown-menu"
        >
          {options.map((opt, i) => {
            const isSelected = opt.value === value;
            const isHighlighted = i === highlight;

            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setHighlight(i)}
                onClick={() => onSelect(opt)}
                className={`dropdown-menu__item ${isHighlighted ? 'is-highlighted' : ''} ${isSelected ? 'is-selected' : ''}`}
              >
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
