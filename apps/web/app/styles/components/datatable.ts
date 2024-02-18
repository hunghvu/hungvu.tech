import type { ColumnPassThroughMethodOptions } from "primereact/column";
import type { DataTablePassThroughMethodOptions, DataTablePassThroughOptions } from "primereact/datatable";

const datatable: DataTablePassThroughOptions = {
  root: ({ props }: DataTablePassThroughMethodOptions<any>) => ({
    className: `relative ${props.scrollable && props.scrollHeight === `flex` ? `flex flex-col h-full` : ``}`,
  }),
  header: {
    className: `bg-emerald-950 text-zinc-300 rounded-t-md font-bold p-4 border border-solid border-zinc-500`,
  },
  // Use border-separate so we can manually adjust border of cells
  table: {
    className: 'border-separate border-spacing-0'
  },
  thead: ({ context }: DataTablePassThroughMethodOptions<any>) => ({
    className: `
      ${context.scrollable ? `sticky top-0 z-30` : ``}
    `,
  }),
  column: {
    headerCell: ({ context }: ColumnPassThroughMethodOptions) => ({
      className: `
        text-left font-bold border border-solid border-zinc-500 border-t-0 border-r-0
        transition duration-200 text-xl p-4
        ${context.sorted ? `bg-[#00002f]` : `bg-emerald-950 text-zinc-300`}
      `,
    }),
    headerContent: { className: `flex items-center gap-2` },
    bodyCell: {
      className: `
        text-left text-lg border border-solid border-t-0 border-r-0 border-zinc-500 bg-[#00002f]/80 p-4
      `,
    },
    sortIcon: ({ context }: ColumnPassThroughMethodOptions) => ({
      className: `
        ml-2
        ${context.sorted ? `text-emerald-600` : `text-zinc-300`}
      `,
    }),
    sortBadge: {
      className: `
        flex items-center justify-center align-middle rounded-md 
        w-[1.143rem] leading-[1.143rem] ml-2 bg-zinc-300 text-emerald-950
      `,
    },
    columnFilter: { className: `inline-flex items-center ml-auto` },
    filterInput: {
      className: `text-black bg-zinc-100`,
    },
    filterOverlay: {
      className: `bg-emerald-950 border border-t-0 border-solid border-zinc-500 rounded-md min-w-[12.5rem]`
    },
    filterMatchModeDropdown: {
      root: { className: `min-[0px]:flex mb-2` },
    },
    filterRowItems: { className: `m-0 p-0 py-3 list-none ` },
    filterRowItem: ({ context }: ColumnPassThroughMethodOptions) => ({
      className: `
          m-0 py-3 px-5 transition duration-200 hover:bg-emerald-900
          ${context !== null && context !== void 0 && context.highlighted
          ? 'bg-emerald-900'
          : ''}
        `
    }),
    filterOperator: {
      className: `
        px-5 py-3 border-b border-solid 
        border-zinc-500 rounded-md text-zinc-300 bg-[#00002f] 
        rounded-t-md
      `,
    },
    filterOperatorDropdown: {
      root: { className: `min-[0px]:flex` },
    },
    filterConstraint: { className: `p-5 border-b border-solid border-zinc-500 rounded-md` },
    filterAddRule: { className: `py-3 px-5` },
    filterAddRuleButton: {
      root: { className: `justify-center w-full min-[0px]:text-sm` },
    },
    filterRemoveButton: {
      root: { className: `ml-2` },
    },
    filterButtonbar: { className: `flex items-center justify-between p-5` },
    filterClearButton: {
      root: { className: `w-auto min-[0px]:text-sm border-sky-500 text-sky-500 px-4 py-3` },
    },
    filterApplyButton: {
      root: { className: `w-auto min-[0px]:text-sm px-4 py-3` },
    },
    filterMenuButton: {
      className: `
        inline-flex justify-center items-center cursor-pointer no-underline overflow-hidden relative ml-2
        w-8 h-8 rounded-md
        transition duration-200
        hover:text-zinc-300 hover:bg-zinc-300/20
        focus:outline-0 focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]
      `,
    },
    headerFilterClearButton: {
      className: `
      inline-flex justify-center items-center cursor-pointer no-underline overflow-hidden relative ml-2
      w-8 h-8 rounded-md ml-4
      transition duration-200
      hover:text-zinc-300 hover:bg-zinc-300/20
      focus:outline-0 focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]
      `,
    },
  }
}
export { datatable }
