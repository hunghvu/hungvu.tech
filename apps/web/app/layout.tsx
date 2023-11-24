/**
 * Author: Hung Vu
 *
 * Root layout.
 */

import React from 'react';
import Provider from './provider';
import { geist } from './_components/fonts';

import './global.css';

import 'highlight.js/styles/github-dark-dimmed.css';

// Temporary fix for FOUC: https://github.com/primefaces/primereact/issues/5188
import './components.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/mdc-dark-indigo/theme.css';



export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION!,
  },
};

const Layout = ({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  return (
    <html lang='en'>
      {/* Font family is applied to native HTML elmenets. */}
      {/* For PrimeReact components, we need to specify at root component level. */}
      <body className={geist.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
};

export default Layout;
