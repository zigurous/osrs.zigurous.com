import '../styles/navigation-menu.css';
import { Drawer, Link, Text } from '@zigurous/forge-react'; // prettier-ignore
import { Link as GatsbyLink } from 'gatsby';
import React from 'react';
import WikiIcon from './WikiIcon';

interface NavigationMenuProps {
  open: boolean;
  onRequestClose: () => void;
}

export default function NavigationMenu({
  open,
  onRequestClose,
}: NavigationMenuProps) {
  return (
    <Drawer
      className="navigation-menu"
      open={open}
      onRequestClose={onRequestClose}
      size="sm"
    >
      <div aria-hidden className="navigation-menu__header" />
      {menu.map((section, index) => (
        <React.Fragment key={section.header}>
          <section>
            <Text
              className="my-md px-xl"
              color="muted"
              transform="uppercase"
              type="body"
              weight="500"
            >
              {section.header}
            </Text>
            <ul>
              {section.links.map(link => (
                <li key={link.text}>
                  <Link
                    as={link.external ? 'a' : GatsbyLink}
                    external={link.external}
                    href={link.href}
                    unstyled
                  >
                    <WikiIcon className="mr-sm" icon={link.icon} />
                    <Text color="subtle" size="md" type="body-lg" weight="500">
                      {link.text}
                    </Text>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          {index < menu.length - 1 && <hr />}
        </React.Fragment>
      ))}
    </Drawer>
  );
}

const menu = [
  {
    header: 'Tools',
    links: [
      {
        icon: 'Leagues_Tutor_icon',
        text: 'Region Analyzer',
        href: '/region-analyzer',
        external: false,
      },
      {
        icon: 'Combat_Tutor_icon',
        text: 'Gear Progression',
        href: '/gear-progression',
        external: false,
      },
      {
        icon: 'Lumbridge_Guide_icon',
        text: 'Grid Master',
        href: '/grid-master',
        external: false,
      },
    ],
  },
  {
    header: 'Links',
    links: [
      {
        icon: 'Bank_Tutor_icon',
        text: 'Support Me',
        href: 'https://buymeacoffee.com/zigurous',
        external: true,
      },
      {
        icon: 'Prayer_Tutor_icon',
        text: 'Contribute',
        href: 'https://github.com/zigurous/osrs.zigurous.com',
        external: true,
      },
      {
        icon: 'Danger_Tutor_icon',
        text: 'Report a Bug',
        href: 'https://github.com/zigurous/osrs.zigurous.com/issues',
        external: true,
      },
    ],
  },
];
