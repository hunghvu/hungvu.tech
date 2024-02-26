import type { MenubarPassThroughMethodOptions } from "primereact/menubar"
import { geist } from "app/_components/fonts"

const menubar = {
  root: {
    className: `
      flex flex-row justify-around items-center font-bold fixed w-full z-30 bg-gradient-to-r from-zinc-950 from-60% to-[#00002f] to-90%
      px-2 py-1 ${geist.className} text-xl md:text-2xl border-b border-zinc-700 text-zinc-400
    `,
  },
  menu: ({ state }: MenubarPassThroughMethodOptions) => ({
    className: `
      lg:gap-4 bg-transparent backdrop-blur sm:p-0 sm:flex sm:flex-row sm:top-auto sm:left-auto sm:relative sm:bg-transparent 
      sm:shadow-none sm:w-auto flex-col top-full left-0 absolute py-1 shadow-md w-full
      ${state?.mobileActive ? 'flex border-b border-zinc-700' : 'hidden border-none'}`,
  }),
  action: {
    className: 'flex flex-row justify-center items-center gap-1 cursor-pointer p-2',
  },
  menuitem: {
    className: 'hover:bg-zinc-400/10 hover:text-zinc-400',
  },
  button: {
    className: 'sm:hidden',
  },
  popupIcon: {
    className: 'w-6 h-6',
  },
}

export { menubar }