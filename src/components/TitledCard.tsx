import { Icon, Text } from '@zigurous/forge-react';
import classNames from 'classnames';
import React from 'react';
import '../styles/titled-card.css';

interface TitledCardProps {
  caption?: string;
  children?: React.ReactNode;
  className?: string;
  customTitle?: React.ReactNode;
  onClickHeader?: () => void;
  shadow?: boolean;
  subtitle?: string;
  title: string;
  titleIconLeft?: string;
  titleIconRight?: string;
  titleIconSize?: string | number;
  titleLinkId?: string;
  titleLinkUrl?: string;
  type?: 'list' | 'table';
}

export default function TitledCard({
  caption,
  children,
  className,
  customTitle,
  onClickHeader,
  shadow = true,
  subtitle,
  title,
  titleIconLeft,
  titleIconRight,
  titleIconSize = 12,
  titleLinkId,
  titleLinkUrl,
  type,
}: TitledCardProps) {
  const Element = titleLinkId ? 'a' : onClickHeader ? 'button' : 'div';
  return (
    <div
      className={classNames(
        'titled-card',
        { [`titled-card--${type}`]: type, 'shadow-xs': shadow },
        className,
      )}
      key={title}
    >
      <Element
        className="titled-card__header"
        href={
          titleLinkUrl ||
          (titleLinkId
            ? `https://oldschool.runescape.wiki/w/${titleLinkId}`
            : undefined)
        }
        target={titleLinkId ? '_blank' : undefined}
        onClick={onClickHeader}
      >
        {customTitle || (
          <div className="titled-card__title">
            {titleIconLeft && (
              <img
                alt=""
                aria-hidden
                className="titled-card__icon"
                src={`https://oldschool.runescape.wiki/images/${titleIconLeft}.png`}
              />
            )}
            <Text size="lg" type="title">
              {title}
              {subtitle && (
                <Text as="span" className="ml-sm" color="disabled" size="md">
                  {subtitle}
                </Text>
              )}
            </Text>
          </div>
        )}
        {(caption || titleIconRight) && (
          <div className="titled-card__caption">
            {caption && (
              <Text className="mr-sm" type="caption">
                {caption}
              </Text>
            )}
            {titleIconRight && (
              <Icon icon={titleIconRight} size={titleIconSize} />
            )}
          </div>
        )}
      </Element>
      <div className="titled-card__body">{children}</div>
    </div>
  );
}
