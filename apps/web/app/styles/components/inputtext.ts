import type { InputTextPassThroughMethodOptions, InputTextPassThroughOptions } from "primereact/inputtext";

const inputtext: InputTextPassThroughOptions = {
  root: ({ props, context }: InputTextPassThroughMethodOptions) => ({
    className: `m-0 font-sans text-zinc-600 bg-zinc-100 border border-zinc-500 transition-colors duration-200 appearance-none rounded-lg 
      ${!context.disabled ? `hover:border-sky-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]` : ''} 
      ${!props.size || typeof props.size === 'number' ? 'text-lg p-2 font-normal' : ''}`

  })
}

export { inputtext }