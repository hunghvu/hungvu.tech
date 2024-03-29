import type { PaginatorPassThroughMethodOptions, PaginatorPassThroughOptions } from "primereact/paginator";

const paginator: PaginatorPassThroughOptions = {
  root: {
    className: `
      flex items-center justify-center flex-wrap border border-solid border-zinc-500
      bg-emerald-950 text-zinc-100 px-4 py-2 rounded-md
    `,
  },
  current: {
    className: 'ml-16 mr-4 font-bold text-zinc-300',
  },
  RPPDropdown: {
    root: {
      className: 'mr-16'
    }
  },
  firstPageButton: ({ context }: PaginatorPassThroughMethodOptions) => ({
    className: `
        relative inline-flex items-center justify-center user-none overflow-hidden leading-none
        border-0 text-zinc-300 min-w-[3rem] h-12 m-[0.143rem]
        transition duration-200 hover:bg-sky-200 hover:text-zinc-600 rounded-full
        ${context.disabled ? 'invisible' : ''}
        ${!context.disabled ? 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]' : ''}
        `,
  }),

  prevPageButton: ({ context }: PaginatorPassThroughMethodOptions) => ({
    className: `
        relative inline-flex items-center justify-center user-none overflow-hidden leading-none
        border-0 text-zinc-300  min-w-[3rem] h-12 m-[0.143rem]
        transition duration-200 hover:bg-sky-200 hover:text-zinc-600 rounded-full
        ${context.disabled ? 'invisible' : ''}
        ${!context.disabled ? 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]' : ''}
        `,
  }),

  nextPageButton: ({ context }: PaginatorPassThroughMethodOptions) => ({
    className: `
        relative inline-flex items-center justify-center user-none overflow-hidden leading-none
        border-0 text-zinc-300  min-w-[3rem] h-12 m-[0.143rem]
        transition duration-200 hover:bg-sky-200 hover:text-zinc-600 rounded-full
        ${context.disabled ? 'invisible' : ''}
        ${!context.disabled ? 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]' : ''}
        `,
  }),

  lastPageButton: ({ context }: PaginatorPassThroughMethodOptions) => ({
    className: `
        relative inline-flex items-center justify-center user-none overflow-hidden leading-none
        border-0 text-zinc-300  min-w-[3rem] h-12 m-[0.143rem]
        transition duration-200 hover:bg-sky-200 hover:text-zinc-600 rounded-full
        ${context.disabled ? 'invisible' : ''}
        ${!context.disabled ? 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]' : ''}
        `,
  }),

  pageButton: ({ context }: PaginatorPassThroughMethodOptions) => ({
    className: `
        relative inline-flex items-center justify-center user-none overflow-hidden leading-none
        border-0 min-w-[3rem] h-12 m-[0.143rem]
        transition duration-200 rounded-full
        focus: outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191, 219, 254, 1)]
        ${context.active ? 'bg-sky-200 border-sky-200 text-zinc-600' : 'text-zinc-300'}
        `,
  }),
}

export { paginator }