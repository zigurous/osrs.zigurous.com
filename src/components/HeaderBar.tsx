import { AppHeader, SocialButton, Stack, Text, Toggle } from '@zigurous/forge-react'; // prettier-ignore
import { Link } from 'gatsby';
import React from 'react';
import { useRegionsContext } from '../context';
import icon from '../images/world-map-icon.png';

export default function HeaderBar() {
  const context = useRegionsContext();
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
            <Text bold className="ml-sm" marginBottom="xxxs" type="subtitle">
              Region Analyzer
            </Text>
          </Stack>
          <Toggle
            className="ml-xxl"
            id="multi-region-toggle"
            label="Multi-Region"
            onToggle={context.setMultiRegionMode}
            toggled={context.multiRegionMode}
            size="md"
          />
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
