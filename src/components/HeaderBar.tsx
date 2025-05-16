import { SocialButton, Stack, Text } from '@zigurous/forge-react';
import { Link } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { useRegionsContext } from '../context';
import icon from '../images/osrs-icon.png';
import '../styles/header-bar.css';

export default function HeaderBar() {
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
      <div className="flex align-center">
        <Link to="/">
          <img src={icon} width={40} height={40} />
        </Link>
        <Text bold className="ml-sm mb-xxs" type="subtitle">
          Region Analyzer
        </Text>
      </div>
      {showInstructions && (
        <p className="instructions ml-xl title-sm text-muted">
          Select a region to analyze
        </p>
      )}
      <Stack spacing="md">
        <SocialButton
          color="default"
          link="github"
          size="sm"
          variant="outline"
          url="https://github.com/zigurous/osrs-region-analyzer"
        >
          GitHub
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
