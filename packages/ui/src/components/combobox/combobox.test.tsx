import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Combobox } from './combobox';

const options = ['Alabama', 'Alaska', 'California'];
function Fixture() {
  const [value, setValue] = React.useState('Alabama');
  return <Combobox label="Region" value={value} onValueChange={setValue} options={options} />;
}

describe('Combobox', () => {
  it('filters in the field and commits the highlighted keyboard selection', () => {
    render(<Fixture />);
    const field = screen.getByRole('combobox');
    fireEvent.focus(field);
    fireEvent.change(field, { target: { value: 'Cal' } });
    expect(screen.queryByRole('option', { name: 'Alabama' })).not.toBeInTheDocument();
    fireEvent.keyDown(field, { key: 'ArrowDown' });
    expect(field).toHaveAttribute('aria-activedescendant', screen.getByRole('option').id);
    fireEvent.keyDown(field, { key: 'Enter' });
    expect(field).toHaveValue('California');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
  it('restores the selected value on Escape and outside dismissal without committing search text', () => {
    const change = vi.fn();
    render(<Combobox label="Region" value="Alabama" onValueChange={change} options={options} />);
    const field = screen.getByRole('combobox');
    for (const dismiss of [() => fireEvent.keyDown(field, { key: 'Escape' }), () => fireEvent.pointerDown(document.body)]) {
      fireEvent.focus(field);
      fireEvent.change(field, { target: { value: 'unknown' } });
      expect(screen.getByRole('status')).toHaveTextContent('No options found');
      dismiss();
      expect(field).toHaveValue('Alabama');
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    }
    expect(change).not.toHaveBeenCalled();
  });
  it('selects with a pointer while preserving input focus semantics', () => {
    render(<Fixture />);
    fireEvent.focus(screen.getByRole('combobox'));
    fireEvent.pointerDown(screen.getByRole('option', { name: 'Alaska' }));
    expect(screen.getByRole('combobox')).toHaveValue('Alaska');
  });
  it('does not open disabled fields', () => {
    render(<Combobox label="Region" value="" onValueChange={vi.fn()} options={options} disabled />);
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('combobox')).toBeDisabled();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
