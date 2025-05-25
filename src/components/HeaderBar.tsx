import { SocialButton, Stack, Text } from '@zigurous/forge-react';
import { Link } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { useRegionsContext } from '../context';
import icon from '../images/world-map-icon.png';
import '../styles/header-bar.css';

interface HeaderBarProps {
  location: Location;
}

export default function HeaderBar({ location }: HeaderBarProps) {
  const context = useRegionsContext();
  const [showInstructions, setShowInstructions] = useState(() =>
    Boolean(!location.search.includes('?region=')),
  );

  useEffect(() => {
    if (context.selectedRegion) {
      setShowInstructions(false);
    }
  }, [context.selectedRegion]);

  return (
    <header className="header-bar shadow">
      <div className="header-bar__title">
        <Link to="/">
          <img src={icon} width={32} height={32} />
        </Link>
        <Text bold className="ml-md" marginBottom="xxxs" type="subtitle">
          Region Analyzer
        </Text>
      </div>
      {showInstructions && (
        <Text
          className="header-bar__instructions ml-xl"
          color="muted"
          type="title-sm"
        >
          Select a region to analyze
        </Text>
      )}
      <Stack className="header-bar__buttons" spacing="md">
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
    </header>
  );
}
