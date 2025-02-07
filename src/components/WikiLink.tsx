import classNames from 'classnames';
import React from 'react';
import { formatNameFromId } from '../utils';

type WikiLinkProps = {
  textual?: boolean;
  wikiId: string;
} & React.ComponentPropsWithoutRef<'a'>;

export default function WikiLink({
  children,
  className,
  textual,
  wikiId,
  ...rest
}: WikiLinkProps) {
  return (
    <a
      id={wikiId}
      className={classNames(className, { link: textual })}
      href={`https://oldschool.runescape.wiki/w/${wikiId}`}
      target="_blank"
      {...rest}
    >
      {children || formatNameFromId(wikiId)}
    </a>
  );
}
