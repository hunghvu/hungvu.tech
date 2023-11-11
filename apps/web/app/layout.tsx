import React from 'react';

import RootProvider from './RootProvider';

import './global.css';

import 'highlight.js/styles/github-dark-dimmed.css';

import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/mdc-dark-indigo/theme.css';

import { geist } from './_components/fonts';


export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <title>Hung's blog</title>
      </head>
      {/* Font family is applied to native HTML elmenets. */}
      {/* For PrimeReact components, we need to specify at root component level. */}
      <body className={geist.className}>
        <RootProvider children={children} />
      </body>
    </html>
  );
}
