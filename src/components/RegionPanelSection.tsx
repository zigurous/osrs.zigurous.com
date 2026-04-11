import { type MarginToken, Text } from '@zigurous/forge-react';
import classNames from 'classnames';
import React from 'react';

interface RegionPanelSectionProps {
  children?: React.ReactNode;
  className?: string;
  counter?: number;
  title?: string;
  titleMargin?: MarginToken;
}

export default function RegionPanelSection({
  children,
  className,
  counter,
  title,
  titleMargin = 'xl',
}: RegionPanelSectionProps) {
  return (
    <section className={classNames('region-panel__section', className)}>
      {title && (
        <React.Fragment>
          <Text
            as="h2"
            className="ml-sm"
            marginBottom={titleMargin}
            type="title-lg"
          >
            {title}
            {counter && (
              <Text
                as="span"
                className="ml-sm"
                color="disabled"
                type="caption"
                weight="600"
              >
                {counter}
              </Text>
            )}
          </Text>
        </React.Fragment>
      )}
      {children}
    </section>
  );
}
