/**
 * Author: Hung Vu
 *
 * Root layout.
 */

import React from 'react';
import Script from 'next/script';
import Provider from './provider';
import { geist } from './_components/fonts';

import './global.css';

// FOUC (affects CLS): https://github.com/primefaces/primereact/issues/5188
// We will just ignore FOUC for now because importing does not fully resolve the issue.
// Besides, a large CSS file has an impact to performance.
import 'primereact/resources/themes/lara-dark-teal/theme.css';

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
      <Script id='css-layers'>
        {`
          const cssLayerOrder = document.createElement('style');
          cssLayerOrder.innerHTML = '@layer tailwind-base, primereact, tailwind-utilities;';
          cssLayerOrder.setAttribute('type', 'text/css');
          document.querySelector('head').prepend(cssLayerOrder);
        `}
      </Script>

      <body className={`${geist.className} text-[#ffffffde] scrollbar`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
};

export default Layout;
