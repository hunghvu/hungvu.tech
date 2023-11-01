import { PrimeReactProvider } from 'primereact/api';
import Navbar from "./_components/header/index"
import { NextFont } from "next/dist/compiled/@next/font";

type RootProviderProps = {
  children: React.ReactNode
}

const RootProvider: React.FunctionComponent<RootProviderProps> = ({ children }) => {
  return (
    <PrimeReactProvider>
      <body className={"w-full h-full"}>
        <Navbar />
        <main className="flex flex-col gap-16">{children}</main>
      </body>
    </PrimeReactProvider>
  )
}

export default RootProvider