import '../styles/slider.css';
import classNames from 'classnames';
import React from 'react';

type SliderProps = {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
} & Omit<
  React.ComponentPropsWithRef<'input'>,
  'type' | 'value' | 'min' | 'max' | 'onChange'
>;

export default function Slider({
  min = 0,
  max = 100,
  value = 50,
  onChange,
  ...rest
}: SliderProps) {
  return (
    <div className="slider-container">
      <input
        {...rest}
        className={classNames('slider', rest.className)}
        value={value}
        min={min}
        max={max}
        onChange={e => onChange(parseInt(e.target.value))}
        type="range"
      />
    </div>
  );
}
