import { PrimeReactProvider } from 'primereact/api';
import Header from 'app/_components/header';

type RootProviderProps = {
  children: React.ReactNode;
};

const RootProvider: React.FunctionComponent<RootProviderProps> = ({ children }) => {
  return (
    <PrimeReactProvider>
      <Header />
      <main className='flex flex-col items-center justify-center gap-16 pt-8 lg:pt-16 w-full px-4'>{children}</main>
    </PrimeReactProvider>
  );
};

export default RootProvider;
