import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'OSRS Region Analyzer',
    siteUrl: 'https://zigurous.github.io/osrs-region-analyzer',
  },
  plugins: [
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'OSRS Region Analyzer',
        short_name: 'Region Analyzer',
        start_url: '/',
        display: 'standalone',
        theme_color: '#c2410c',
        background_color: '#28221d',
        icon: './src/images/favicon.ico',
      },
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: './src/data/',
      },
    },
  ],
  trailingSlash: 'never',
};

export default config;
