import { type MarginToken, Text } from '@zigurous/forge-react';
import classNames from 'classnames';
import React from 'react';

interface RegionPanelSectionProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  titleMargin?: MarginToken;
}

export default function RegionPanelSection({
  children,
  className,
  title,
  titleMargin = 'xl',
}: RegionPanelSectionProps) {
  return (
    <section className={classNames('region-panel__section', className)}>
      {title && (
        <Text
          as="h2"
          className={classNames('ml-sm', {
            [`mb-${titleMargin}`]: titleMargin,
          })}
          type="title-lg"
        >
          {title}
        </Text>
      )}
      {children}
    </section>
  );
}
