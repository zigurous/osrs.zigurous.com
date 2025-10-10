import { type PreRenderHTMLArgs, type RenderBodyArgs } from 'gatsby';
import React from 'react';

type ReactProps<T extends Element> = React.DetailedHTMLProps<
  React.HTMLAttributes<T>,
  T
>;

const HtmlAttributes: ReactProps<HTMLHtmlElement> = {
  lang: 'en',
};

const HeadComponents: React.ReactNode[] = [
  <link
    key="fonts.googleapis.com"
    rel="preconnect"
    href="https://fonts.googleapis.com"
  />,
  <link
    key="fonts.gstatic.com"
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossOrigin="anonymous"
  />,
  <link
    key="IBM-Plex-Sans"
    href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500&display=swap"
    rel="stylesheet"
  />,
  <link
    key="PT-Serif"
    href="https://fonts.googleapis.com/css2?family=PT+Serif:wght@400;700&display=swap"
    rel="stylesheet"
  />,
  <link
    key="Tiny5"
    href="https://fonts.googleapis.com/css2?family=Tiny5&display=swap"
    rel="stylesheet"
  />,
  <link
    key="forge-css"
    href="https://cdn.zigurous.com/forge-css@1.2.1/dist/index.min.css"
    rel="stylesheet"
  />,
];

const BodyAttributes: ReactProps<HTMLBodyElement> = {
  ['data-theme']: 'dark',
} as ReactProps<HTMLBodyElement>;

export const onRenderBody = ({
  setHeadComponents,
  setHtmlAttributes,
  setBodyAttributes,
}: RenderBodyArgs) => {
  setHtmlAttributes(HtmlAttributes);
  setHeadComponents(HeadComponents);
  setBodyAttributes(BodyAttributes);
};

export const onPreRenderHTML = ({ getHeadComponents }: PreRenderHTMLArgs) => {
  if (process.env.NODE_ENV === 'production') {
    const headComponents = getHeadComponents();
    headComponents.sort((a, b) => {
      const x = a as React.ReactElement;
      const y = b as React.ReactElement;
      if (x.type === y.type) return 0;
      if (x.type === 'style') return 1;
      if (y.type === 'style') return -1;
      return 0;
    });
  }
};
