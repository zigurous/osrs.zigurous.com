import { AppHeader, Button, SocialButton, Stack, Text } from '@zigurous/forge-react'; // prettier-ignore
import React, { useState } from 'react';
import NavigationMenu from './NavigationMenu';

interface HeaderBarProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  center?: React.ReactNode;
  title: string;
}

export default function HeaderBar({
  left,
  right,
  center,
  title,
}: HeaderBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <AppHeader
        fluid
        bordered
        sizing={{
          center: !center ? 'none' : undefined,
        }}
        left={
          <>
            <Stack align="center">
              <Button
                icon="menu"
                iconAlignment="only"
                onClick={() => setIsMenuOpen(true)}
                size="lg"
                variant="text"
              />
              <Text bold className="ml-xs" marginBottom="xxxs" type="title-sm">
                {title}
              </Text>
            </Stack>
            {left}
          </>
        }
        center={center}
        right={
          <>
            {right}
            <Stack align="center" className="header-bar__buttons" spacing="md">
              <SocialButton
                color="default"
                link="github"
                size="sm"
                variant="outline"
                url="https://github.com/zigurous/osrs-region-analyzer/issues"
              >
                Report Bug
              </SocialButton>
              <SocialButton
                color="default"
                icon="local_cafe"
                iconProps={{ className: 'material', variant: 'outlined' }}
                link={{
                  id: 'support',
                  name: 'Support Me',
                  href: 'https://buymeacoffee.com/zigurous',
                  external: true,
                }}
                size="sm"
                variant="outline"
              >
                Support Me
              </SocialButton>
            </Stack>
          </>
        }
      />
      <NavigationMenu
        open={isMenuOpen}
        onRequestClose={() => setIsMenuOpen(false)}
      />
    </>
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
        text: 'Support Us',
        href: 'https://buymeacoffee.com/zigurous',
        external: true,
      },
      {
        icon: 'Prayer_Tutor_icon',
        text: 'Contribute',
        href: 'https://github.com/zigurous/osrs-region-analyzer',
        external: true,
      },
      {
        icon: 'Danger_Tutor_icon',
        text: 'Report a Bug',
        href: 'https://github.com/zigurous/osrs-region-analyzer/issues',
        external: true,
      },
    ],
  },
];
