import { PrimeReactProvider } from 'primereact/api';
import Navbar from "./_components/navbar"
import { NextFont } from "next/dist/compiled/@next/font";

type RootProviderProps = {
  font: NextFont,
  children: React.ReactNode
}

const RootProvider: React.FunctionComponent<RootProviderProps> = ({ font, children }) => {
  return (
    <PrimeReactProvider>
      <body className={`${font.className} w-full h-full`}>
        <Navbar />
        <main className="flex flex-col gap-16">{children}</main>
      </body>
    </PrimeReactProvider>
  )
}

export default RootProvider