import { Text } from '@zigurous/forge-react';
import classNames from 'classnames';
import React from 'react';
import TitledCard from './TitledCard';
import WikiLink from './WikiLink';

interface GearProgressionNotesProps {
  notes?: string[];
}

export default function GearProgressionNotes({
  notes,
}: GearProgressionNotesProps) {
  if (!notes) return null;
  return (
    <TitledCard className="gear-progression-card" id="notes" title="Notes">
      <ul
        className={classNames('text-muted', {
          'list-bullet': notes.length > 1,
          'list-indent': notes.length > 1,
        })}
      >
        {notes.map((note, index) => (
          <li
            className={classNames({
              'mb-sm': index < notes.length - 1,
            })}
            key={note}
          >
            <Text className="line-snug" type="body-sm">
              {parseRichText(note)}
            </Text>
          </li>
        ))}
      </ul>
    </TitledCard>
  );
}

function parseRichText(str: string) {
  let copy = str;
  const jsx: React.ReactNode[] = [str];
  const regex = new RegExp('(?:<Link="([^"]+)">([^<]+)<\/Link>)', 'g');
  str.matchAll(regex).forEach(match => {
    const split = copy.split(match[0]);
    jsx[jsx.length - 1] = (
      <React.Fragment key={split[0]}>{split[0]}</React.Fragment>
    );
    jsx.push(
      <WikiLink className="text-primary" key={match[0]} wikiId={match[1]}>
        {match[2]}
      </WikiLink>,
    );
    jsx.push(<React.Fragment key={split[1]}>{split[1]}</React.Fragment>);
    copy = split[1];
  });
  return jsx;
}
