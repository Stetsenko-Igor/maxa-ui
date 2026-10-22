'use client';

import { useEffect, useRef, useState } from 'react';
import { Input } from '../input/index.js';
import { type FormFieldSize } from '../form-field/index.js';
import { useFieldId } from '@maxa/hooks';
import { CaretDown } from '@maxa/icons';
import './combobox.css';

export type ComboboxProps = {
  label: string;
  required?: boolean;
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
  disabled?: boolean;
  error?: string;
  placeholder?: string;
  emptyMessage?: string;
  size?: FormFieldSize;
  className?: string;
};

/** Editable selection field: search text is never committed as a selection. */
export function Combobox({ label, required, value, onValueChange, options, disabled, error, placeholder = 'Select an option', emptyMessage = 'No options found', size = 'md', className }: ComboboxProps) {
  const id = useFieldId();
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(-1);
  const filtered = options.filter(option => option.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
  const close = () => { setOpen(false); setQuery(''); setActive(-1); };
  const show = () => { if (!disabled) { setOpen(true); setQuery(''); setActive(-1); } };
  const select = (option: string) => { onValueChange(option); close(); };

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) { setOpen(false); setQuery(''); setActive(-1); }
    };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [open]);

  useEffect(() => {
    if (disabled) { setOpen(false); setQuery(''); setActive(-1); }
  }, [disabled]);

  useEffect(() => {
    if (active >= 0) document.getElementById(`${id}-option-${active}`)?.scrollIntoView?.({ block: 'nearest' });
  }, [active, id]);

  return <div className={["maxa-combobox", `maxa-combobox--${size}`, className].filter(Boolean).join(" ")} ref={root} onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) close();
  }}>
    <Input
      size={size}
      id={`${id}-input`}
      label={label}
      required={required ?? false}
      {...(error !== undefined ? { error } : {})}
      disabled={disabled ?? false}
      value={open ? query : value}
      placeholder={placeholder}
      autoComplete="off"
      role="combobox"
      aria-autocomplete="list"
      aria-expanded={open}
      aria-controls={open ? `${id}-list` : undefined}
      aria-activedescendant={open && active >= 0 && active < filtered.length ? `${id}-option-${active}` : undefined}
      trailingIcon={<CaretDown aria-hidden="true" className={open ? 'maxa-combobox__caret maxa-combobox__caret--open' : 'maxa-combobox__caret'} />}
      onFocus={show}
      onClick={() => { if (!open) show(); }}
      onChange={event => { setQuery(event.target.value); setOpen(true); setActive(-1); }}
      onKeyDown={event => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault();
          if (!open) { show(); setActive(event.key === 'ArrowDown' ? 0 : options.length - 1); }
          else setActive(previous => filtered.length ? (previous < 0 ? (event.key === 'ArrowDown' ? 0 : filtered.length - 1) : (previous + (event.key === 'ArrowDown' ? 1 : -1) + filtered.length) % filtered.length) : -1);
        } else if (event.key === 'Enter' && open) {
          event.preventDefault();
          if (active >= 0 && filtered[active]) select(filtered[active]);
          else if (filtered.length === 1 && filtered[0]) select(filtered[0]);
        } else if (event.key === 'Escape' && open) { event.preventDefault(); event.stopPropagation(); close(); }
        else if ((event.key === 'Home' || event.key === 'End') && open) { event.preventDefault(); setActive(filtered.length ? (event.key === 'Home' ? 0 : filtered.length - 1) : -1); }
        else if (event.key === 'Tab') close();
      }}
    />
    {open && !disabled && <div className="maxa-combobox__list" id={`${id}-list`} role="listbox" aria-label={label}>
      {filtered.map((option, index) => <div
        id={`${id}-option-${index}`}
        key={option}
        role="option"
        aria-selected={option === value}
        className={`maxa-combobox__option${index === active ? ' maxa-combobox__option--active' : ''}`}
        onPointerMove={() => setActive(index)}
        onPointerDown={event => { event.preventDefault(); select(option); }}
      >{option}</div>)}
      {!filtered.length && <div className="maxa-combobox__empty" role="status">{emptyMessage}</div>}
    </div>}
  </div>;
}
