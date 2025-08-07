import '../styles/titled-card.css';
import { Icon, Text } from '@zigurous/forge-react';
import classNames from 'classnames';
import React from 'react';

interface TitledCardProps {
  caption?: string;
  captionIcon?: string | React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  onClickHeader?: () => void;
  shadow?: boolean;
  style?: React.CSSProperties;
  subtitle?: string;
  title: string;
  titleIcon?: string;
  titleLinkId?: string;
  titleLinkUrl?: string;
  type?: 'list' | 'table';
}

export default function TitledCard({
  caption,
  captionIcon,
  children,
  className,
  onClickHeader,
  shadow = true,
  style,
  subtitle,
  title,
  titleIcon,
  titleLinkId,
  titleLinkUrl,
  type,
}: TitledCardProps) {
  const Element = onClickHeader ? 'button' : titleLinkId ? 'a' : 'div';
  if (!captionIcon && (titleLinkUrl || titleLinkId)) {
    captionIcon = 'open_in_new';
  }
  return (
    <div
      className={classNames(
        'titled-card',
        { [`titled-card--${type}`]: type, 'shadow-xs': shadow },
        className,
      )}
      style={style}
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
        onClick={e => {
          if ((e.ctrlKey || e.altKey) && titleLinkId) {
            if (typeof window !== 'undefined') {
              window.open(`https://oldschool.runescape.wiki/w/${titleLinkId}`);
            }
          } else if (onClickHeader) {
            onClickHeader();
          }
        }}
      >
        <div className="titled-card__title">
          {titleIcon && (
            <img
              alt=""
              aria-hidden
              className="titled-card__icon"
              src={`https://oldschool.runescape.wiki/images/${titleIcon}.png`}
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
        {(caption || captionIcon) && (
          <div className="titled-card__caption">
            {caption && (
              <Text
                className={Boolean(captionIcon) ? 'mr-sm' : undefined}
                type="caption"
              >
                {caption}
              </Text>
            )}
            {typeof captionIcon === 'string' ? (
              <Icon icon={captionIcon} size={12} />
            ) : (
              captionIcon
            )}
          </div>
        )}
      </Element>
      <div className="titled-card__body">{children}</div>
    </div>
  );
}
