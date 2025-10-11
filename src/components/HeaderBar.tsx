import { AppHeader, Button, Stack, Text } from '@zigurous/forge-react';
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
              <Text
                bold
                className="ml-xs"
                marginBottom="xxxs"
                type="title-sm"
                wrap="nowrap"
              >
                {title}
              </Text>
            </Stack>
            {left}
          </>
        }
        center={center}
        right={right}
      />
      <NavigationMenu
        open={isMenuOpen}
        onRequestClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}
