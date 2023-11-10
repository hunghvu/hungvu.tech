import { PrimeReactProvider } from 'primereact/api';
import Navbar from "./_components/header/index"

type RootProviderProps = {
  children: React.ReactNode
}

const RootProvider: React.FunctionComponent<RootProviderProps> = ({ children }) => {
  return (
    <PrimeReactProvider>
        <Navbar />
        <main className="flex flex-row items-center justify-center gap-16 pt-16 w-full">{children}</main>
    </PrimeReactProvider>
  )
}

export default RootProvider