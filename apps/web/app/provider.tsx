/**
 * Author: Hung Vu
 *
 * A wrapper component for all pages.
 */
'use client';
import Image from 'next/image';
import { PrimeReactProvider } from 'primereact/api';
import Header from 'app/_components/header';
import Styles from './styles';
import Footer from './_components/footer';

interface RootProviderProps {
  children: React.ReactNode;
}

const Provider: React.FunctionComponent<RootProviderProps> = ({ children }) => {
  return (
    // It seems by default, there are always some in-line styles in the DOM (<head>).
    // However, with unstyled:true, they are not applied.
    // This ensures there is no conflict between Tailwind and PrimeReact theme.
    <PrimeReactProvider value={{ unstyled: true, pt: Styles }}>
      <div className='z-10 fixed top-0 w-full h-full'>
        <Image alt='Background image of hungvu.tech - Enjoy technology in the starry night.' layout='fill' objectFit='cover' src='/background.svg' />
      </div>
      <div className='flex flex-col gap-8 h-screen'>
        <Header />
        <main className='flex flex-col items-center justify-center gap-16 lg:pt-16 w-full px-4 z-20 relative mb-auto'>{children}</main>
        <Footer />
      </div>
    </PrimeReactProvider>
  );
};

export default Provider;
