import { Text } from '@zigurous/forge-react';
import classNames from 'classnames';
import React from 'react';
import TitledCard from './TitledCard';
import WikiLink from './WikiLink';

interface GearProgressionNotesProps {
  filter?: string;
  notes?: string[];
}

export default function GearProgressionNotes({
  filter,
  notes,
}: GearProgressionNotesProps) {
  if (filter && notes) {
    notes = notes
      .filter(note => !note.startsWith('::') || note.startsWith(`::${filter}|`))
      .map(note => note.replace(`::${filter}|`, ''));
  }
  return notes && notes.length > 0 ? (
    <TitledCard className="gear-progression-card" id="notes" title="Notes">
      <ul className="text-muted">
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
  ) : null;
}

function parseRichText(str: string) {
  let copy = str;
  const jsx: React.ReactNode[] = [str];
  const regex = new RegExp('(?:<Link="([^"]+)">([^<]+)<\/Link>)', 'g');
  [...str.matchAll(regex)].forEach(match => {
    const split = copy.split(match[0]);
    jsx[jsx.length - 1] = (
      <React.Fragment key={split[0]}>{split[0]}</React.Fragment>
    );
    jsx.push(
      <WikiLink className="link" key={match[0]} wikiId={match[1]}>
        {match[2]}
      </WikiLink>,
    );
    jsx.push(<React.Fragment key={split[1]}>{split[1]}</React.Fragment>);
    copy = split[1];
  });
  return jsx;
}
