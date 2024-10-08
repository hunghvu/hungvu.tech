import type { MultiSelectPassThroughMethodOptions, MultiSelectPassThroughOptions } from "primereact/multiselect";
import type { CheckboxPassThroughMethodOptions } from "primereact/checkbox";
import { transitions } from "./transitions";

const multiselect: MultiSelectPassThroughOptions = {
  root: ({ props }: MultiSelectPassThroughMethodOptions) => ({
    className: `inline-flex cursor-pointer select-none
        bg-zinc-100 border border-zinc-500 transition-colors duration-200 ease-in-out rounded-md
        w-full md:w-80
        ${props === null || props === undefined || props.disabled ? 'opacity-60 select-none pointer-events-none cursor-default' : ''}`

  }),
  labelContainer: { className: 'overflow-hidden flex flex-auto cursor-pointer' },
  label: {
    className: 'block overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis text-zinc-600 p-2 transition duration-200 font-normal'
  },
  trigger: {
    className: 'flex items-center justify-center shrink-0 bg-transparent text-zinc-600 w-12 rounded-tr-lg rounded-br-lg'
  },
  panel: {
    className: 'bg-zinc-100 text-zinc-600 border-0 rounded-md shadow-md'
  },
  header: {
    className: 'p-2 border-b border-zinc-500 text-zinc-600 bg-zinc-100 rounded-t-md flex items-center justify-between'
  },
  headerCheckboxContainer: {
    className: 'inline-flex cursor-pointer select-none align-bottom relative mr-2 w-6 h-6'
  },
  headerCheckbox: {
    root: ({ props }: CheckboxPassThroughMethodOptions) => ({
      className: `flex items-center justify-center border-2 w-6 h-6 text-zinc-600 rounded-md transition-colors duration-200
          hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]
          ${!(props !== null && props !== undefined && props.checked) ? 'border-zinc-500 bg-zinc-100' : 'border-blue-500 bg-blue-500'}`

    }),
    icon: { className: 'w-4 h-4 transition-all duration-200 text-zinc-100 text-base' }
  },
  wrapper: {
    className: 'max-h-[200px] overflow-auto bg-zinc-100 text-zinc-600 border-0 rounded-md shadow-md'
  },
  list: { className: 'py-2 list-none m-0' },
  emptyMessage: { className: 'px-4 text-zinc-600' },
  item: ({ context }: MultiSelectPassThroughMethodOptions) => ({
    className: `cursor-pointer font-normal overflow-hidden relative whitespace-nowrap m-0 p-2 border-0  transition-shadow duration-200 rounded-none
        ${!context.selected ? 'hover:bg-zinc-200' : ''}
        ${context.selected ? 'bg-sky-200' : ''}`
  }),
  checkboxContainer: {
    className: 'inline-flex cursor-pointer select-none align-bottom relative mr-2 w-6 h-6'
  },
  checkbox: {
    root: ({ context }: MultiSelectPassThroughMethodOptions) => ({
      className: `flex items-center justify-center border-2 w-6 h-6 text-zinc-600 rounded-md transition-colors duration-200
          hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]
          ${!(context !== null && context !== undefined && context.selected) ? 'border-zinc-500 bg-zinc-100' : 'border-blue-500 bg-blue-500'}`
    }),
    icon: { className: 'w-4 h-4 transition-all duration-200 text-zinc-100 text-base' }
  },
  filterContainer: { className: 'flex flex-row justify-center items-center' },
  filterInput: {
    root: {
      className: `
        hover:border-blue-500 focus:outline-none focus:outline-offset-0 
        focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]`
    }
  },
  transition: transitions.overlay
}

export { multiselect };