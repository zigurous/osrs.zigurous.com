import { clamp, Input, keyboardEventHandler } from '@zigurous/forge-react';
import React from 'react';

interface SkillLevelInputProps {
  level: number | '';
  placeholder?: string;
  setLevel: (lvl: number | '') => void;
}

export default function SkillLevelInput({
  level,
  placeholder = 'Lvl',
  setLevel,
}: SkillLevelInputProps) {
  return (
    <Input
      onChange={e =>
        setLevel(
          e.target.value ? clamp(Number.parseInt(e.target.value), 1, 99) : '',
        )
      }
      onKeyDown={keyboardEventHandler(
        'Enter',
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.currentTarget.blur();
        },
      )}
      placeholder={placeholder}
      min={1}
      max={99}
      size="xs"
      style={{ width: '104px' }}
      type="number"
      value={level}
    />
  );
}
