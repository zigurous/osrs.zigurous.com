import { AppHeader, SocialButton, Stack, Text } from '@zigurous/forge-react'; // prettier-ignore
import React from 'react';
import icon from '../images/world-map-icon.png';

interface HeaderBarProps {
  children?: React.ReactNode;
  title: string;
}

export default function HeaderBar({ children, title }: HeaderBarProps) {
  return (
    <AppHeader
      fluid
      bordered
      sizing={{
        center: 'none',
      }}
      left={
        <>
          <Stack align="center">
            <img src={icon} width={32} height={32} />
            <Text bold className="ml-sm" marginBottom="xxxs" type="title-sm">
              {title}
            </Text>
          </Stack>
          {children}
        </>
      }
      right={
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
      }
    />
  );
}
