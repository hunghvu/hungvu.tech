/**
 * Author: Hung Vu
 *
 * A wrapper component for all pages.
 */

import Image from 'next/image';
import { PrimeReactProvider } from 'primereact/api';
import Header from 'app/_components/header';

interface RootProviderProps {
  children: React.ReactNode;
}

const Provider: React.FunctionComponent<RootProviderProps> = ({ children }) => {
  return (
    <PrimeReactProvider>
      <div className='z-10 fixed top-0 w-full h-full'>
        <Image alt='Background image of hungvu.tech - Enjoy technology in the starry night.' layout='fill' objectFit='cover' src='/background.svg' />
      </div>
      <Header />
      <main className='flex flex-col items-center justify-center gap-16 pt-8 lg:pt-16 w-full px-4 z-20 relative'>{children}</main>
    </PrimeReactProvider>
  );
};

export default Provider;
