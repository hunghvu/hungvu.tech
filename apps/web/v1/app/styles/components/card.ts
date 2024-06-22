import { geist } from "app/_components/fonts"

const card = {
  root: {
    className: `py-2 lg:p-4 bg-transparent hover:bg-emerald-950/80 hover:rounded-md lg:min-h-[21rem] ${geist.className} mt-4`,
  },
  body: { className: 'flex flex-col gap-4 pt-4 px-4 pb-0' },
  title: { className: 'font-bold mb-2 text-xl md:text-2xl lg:min-h-[6rem]' },
  subTitle: {
    className: 'font-normal mb-2 ',
  },
  content: { className: 'text-base md:text-lg lg:min-h-[6rem]' },
}

export { card }