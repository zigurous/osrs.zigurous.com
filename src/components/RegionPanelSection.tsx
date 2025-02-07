import { Text } from '@zigurous/forge-react';
import classNames from 'classnames';
import React from 'react';

interface RegionPanelSectionProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
}

export default function RegionPanelSection({
  children,
  className,
  title,
}: RegionPanelSectionProps) {
  return (
    <section className={classNames('region-panel__section', className)}>
      {title && (
        <Text as="h2" className="ml-sm mb-xl" type="title-lg">
          {title}
        </Text>
      )}
      {children}
    </section>
  );
}
