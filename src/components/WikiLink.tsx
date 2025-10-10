import classNames from 'classnames';
import React from 'react';
import { formatNameFromId } from '../utils/formatting';

type WikiLinkProps = {
  textual?: boolean;
  wikiId: string;
} & React.ComponentPropsWithoutRef<'a'>;

const WikiLink = React.forwardRef<HTMLAnchorElement, WikiLinkProps>(
  ({ children, className, textual, wikiId, ...rest }, ref) => {
    return (
      <a
        id={wikiId}
        className={classNames(className, { link: textual })}
        href={`https://oldschool.runescape.wiki/w/${wikiId}`}
        onClick={e => e.stopPropagation()}
        ref={ref}
        target="_blank"
        {...rest}
      >
        {children || formatNameFromId(wikiId)}
      </a>
    );
  },
);

export default WikiLink;
