/**
 * Author: Hung Vu
 *
 * A wrapper component for all pages.
 */

import { PrimeReactProvider } from 'primereact/api';
import Header from 'app/_components/header';

interface RootProviderProps {
  children: React.ReactNode;
}

const Provider: React.FunctionComponent<RootProviderProps> = ({ children }) => {
  return (
    <PrimeReactProvider>
      <Header />
      <main className={`flex flex-col items-center justify-center gap-16 pt-8 lg:pt-16 w-full px-4 
                        bg-[url('/background.svg')] bg-cover bg-fixed bg-no-repeat`}>
        {children}
      </main>
    </PrimeReactProvider>
  );
};

export default Provider;
