import { type GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'OSRS Analyzer',
    siteUrl: 'https://osrs.zigurous.com/',
  },
  plugins: [
    'gatsby-plugin-sitemap',
    'gatsby-plugin-no-sourcemaps',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'OSRS Analyzer',
        start_url: '/',
        display: 'standalone',
        theme_color: '#312a25',
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
  trailingSlash: 'always',
};

export default config;
