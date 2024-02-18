import type { DropdownPassThroughMethodOptions, DropdownPassThroughOptions } from "primereact/dropdown";
import { transitions } from "./transitions";

const dropdown: DropdownPassThroughOptions = {
  root: ({ props }: DropdownPassThroughMethodOptions) => ({
    className: `
        cursor-pointer inline-flex relative select-none
        bg-zinc-100 border border-zinc-300 transition-colors duration-200 ease-in-out rounded-md w-full md:w-56
        hover:border-sky-200 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]
        ${props.disabled ? 'opacity-60 select-none pointer-events-none cursor-default' : ''}
      `,
  }),
  input: ({ props }: DropdownPassThroughMethodOptions) => ({
    className: `
        cursor-pointer block flex flex-auto overflow-hidden overflow-ellipsis whitespace-nowrap relative
        border-0 p-2 transition duration-200 rounded appearance-none font-sans text-base
        focus:outline-none focus:shadow-none text-black text-lg
        ${props.showClear ? 'pr-7' : ''}
      `,
  }),
  item: ({ context }: DropdownPassThroughMethodOptions) => ({
    className: `
        cursor-pointer font-normal overflow-hidden relative whitespace-nowrap
        m-0 p-2 border-0  transition-shadow duration-200 rounded-none text-black text-lg
        ${!context.focused && !context.selected ? 'hover:bg-zinc-200' : ''}
        ${context.focused && !context.selected ? 'hover:bg-zinc-200' : ''}
        ${context.focused && context.selected ? 'bg-sky-200' : ''}
        ${!context.focused && context.selected ? 'bg-sky-100' : ''}
        ${context.disabled ? 'opacity-60 select-none pointer-events-none cursor-default' : ''}
      `,
  }),
  trigger: {
    className: 'flex items-center justify-center shrink-0 bg-transparent text-black w-12 rounded-tr-lg rounded-br-lg'
  },
  panel: {
    className: 'bg-zinc-100'
  },
  transition: transitions.overlay,
}

export { dropdown }