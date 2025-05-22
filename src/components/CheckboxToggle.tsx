import classNames from 'classnames';
import React from 'react';

interface CheckboxToggleProps {
  checked: boolean;
  className?: string;
  id: string;
  label: string;
  onChange: (checked: boolean) => void;
}

export default function CheckboxToggle({
  checked,
  className,
  id,
  label,
  onChange,
}: CheckboxToggleProps) {
  return (
    <div className={classNames('checkbox-toggle', className)}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        style={{ transform: 'scale(1.25)' }}
      />
      <label className="ml-xs" htmlFor={id} style={{ userSelect: 'none' }}>
        {label}
      </label>
    </div>
  );
}
