import { geist } from "app/_components/fonts";
import type { ButtonPassThroughMethodOptions } from "primereact/button";

const button = {
  root: ({ context }: ButtonPassThroughMethodOptions) => ({
    className: `flex flex-row justiry-center items-center text-base md:text-lg p-2 border rounded-md border-solid border-zinc-400 hover:border-zinc-400
      ${geist.className} ${context.disabled ? ' opacity-60 pointer-events-none cursor-default ' : ''}`,
  }),
  label: ({ props }: ButtonPassThroughMethodOptions) => ({
    className: !props.label ? 'hidden' : 'ml-2',
  }),
}

export { button };