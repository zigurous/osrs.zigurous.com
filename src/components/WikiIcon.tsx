import classNames from 'classnames';
import React from 'react';

type WikiIconProps = {
  icon: string;
  size?: string | number;
} & React.ComponentPropsWithoutRef<'span'>;

export default function WikiIcon({
  className,
  icon,
  size = 21,
  style,
  ...rest
}: WikiIconProps) {
  return (
    <span
      className={classNames(
        'inline-flex justify-center align-center shrink-0',
        className,
      )}
      style={{ ...style, width: size, height: size }}
      {...rest}
    >
      <img
        alt=""
        aria-hidden
        className="object-contain w-full h-full"
        draggable={false}
        src={`https://oldschool.runescape.wiki/images/${icon}.png`}
      />
    </span>
  );
}
