import React from 'react';

interface WikiIconProps {
  icon: string;
  size?: string | number;
}

export default function WikiIcon({ icon, size = 21 }: WikiIconProps) {
  return (
    <span
      className="inline-flex justify-center align-center shrink-0"
      style={{ width: size, height: size }}
    >
      <img
        alt=""
        aria-hidden
        className="object-contain w-full h-full"
        src={`https://oldschool.runescape.wiki/images/${icon}.png`}
      />
    </span>
  );
}
