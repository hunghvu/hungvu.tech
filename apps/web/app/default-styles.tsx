import type { PrimeReactPTOptions } from 'primereact/api';
import type { ButtonPassThroughMethodOptions } from 'primereact/button';
import type { MenubarPassThroughMethodOptions } from 'primereact/menubar';
import type { ToastState } from 'primereact/toast';
import { geist } from './_components/fonts';

const DefaultStyles: PrimeReactPTOptions = {
  button: {
    root: ({ context }: ButtonPassThroughMethodOptions) => ({
      className: `flex flex-row justiry-center items-center text-base md:text-lg p-2 border rounded-md border-solid border-zinc-400 hover:border-zinc-400
        ${geist.className} ${context.disabled ? ' opacity-60 pointer-events-none cursor-default ' : ''}`,
    }),
    label: ({ props }: ButtonPassThroughMethodOptions) => ({
      className: !props.label ? 'hidden' : 'ml-2',
    }),
  },
  card: {
    root: {
      className: `py-2 lg:p-4 bg-transparent hover:bg-emerald-950/80 hover:rounded-md lg:min-h-[21rem] ${geist.className} mt-4`,
    },
    body: { className: 'flex flex-col gap-5 pt-5 px-5 pb-0' },
    title: { className: 'font-bold mb-2 text-xl md:text-2xl lg:min-h-[6rem]' },
    subTitle: {
      className: 'font-normal mb-2 ',
    },
    content: { className: 'text-base md:text-lg lg:min-h-[6rem]' },
  },
  divider: {
    root: {
      className:
        'flex relative w-full py-4 before:block before:left-0 before:absolute before:top-1/2 before:w-full before:border-t before:border-zinc-700',
    },
    content: { className: 'px-1 z-10 ' },
  },
  menubar: {
    root: {
      className: `
        flex flex-row justify-around items-center font-bold sticky top-0 z-30 bg-gradient-to-r from-zinc-950 from-60% to-[#00002f] to-90%
        px-2 py-1 ${geist.className} text-xl md:text-2xl border-b border-zinc-700 text-zinc-400
      `,
    },
    menu: ({ state }: MenubarPassThroughMethodOptions) => ({
      className: `
        lg:gap-4 bg-transparent backdrop-blur sm:p-0 sm:flex sm:flex-row sm:top-auto sm:left-auto sm:relative sm:bg-transparent 
        sm:shadow-none sm:w-auto flex-col top-full left-0 absolute py-1 shadow-md w-full hover:bg-zinc-400/10 hover:text-zinc-400
        ${state?.mobileActive ? 'flex border-b border-zinc-700' : 'hidden border-none'}`,
    }),
    action: {
      className: 'flex flex-row justify-center items-center gap-1 cursor-pointer p-2',
    },
    button: {
      className: 'sm:hidden hover:text-zinc-400',
    },
    popupIcon: {
      className: 'w-6 h-6',
    },
  },
  tag: {
    root: {
      className: 'flex items-center justify-center text-xs font-semibold px-2 bg-emerald-950 rounded-md',
    },
    value: { className: `leading-6 ${geist.className} text-sm md:text-base text-zinc-300` },
  },
  toast: {
    root: {
      className: '-translate-x-1/2 w-96',
    },
    // ToastPassthroughMethodOptions does not have index, so we have to customize types here
    message: ({ state, index }: { state: ToastState; index: number }) => ({
      className: `flex flex-row my-4 border-solid border-0 border-l-8 ${
        state.messages[index] && state.messages[index].message.severity === 'success'
          ? 'bg-emerald-700/60 border-green-100/60'
          : state.messages[index] && state.messages[index].message.severity === 'error'
          ? 'bg-red-100/60 border-red-500/60'
          : ''
      }`,
    }),
    content: { className: 'flex justify-center p-4 bg-transparent backdrop-blur' },
    icon: {
      className: 'w-6 h-6 mr-2',
    },
    text: { className: 'text-base font-normal flex flex-col flex-1 grow shrink ml-4' },
    summary: { className: 'font-bold block' },
    detail: { className: 'mt-1 block' },
    // DO NOT USE TRANSITION REFERNCE AT: https://primereact.org/toast/ (broken implementation)
    // Instead, transition is based of CSSTransitionProps
    // Only uses enter, enterActive, and exitActive. Other classes break the animation.
    // Without the transition, React Transition Group will not work, as it appends "-enter-done", etc,
    // which are imcomplete class names
    // If the "classNames" below is a string (e.g., classNames: "fade"), then React Transition Group will append "-enter-done",
    // to "fade", make it the class "fade-enter-done".
    // References:
    // https://github.com/primefaces/primereact/blob/d935de09744d818c1cbb7b622ccb964698160603/components/lib/toast/ToastBase.js#L75
    // https://stackoverflow.com/questions/50303048/react-transition-group-what-is-the-difference-between-the-appear-enter-exit-e
    // https://stackoverflow.com/questions/66575631/react-transition-group-with-tailwind-css
    transition: {
      addEndListener: () => {
        return null;
      },
      classNames: {
        enter: 'opacity-0',
        enterActive: 'transition-opacity duration-500 opacity-90',
        exitActive: 'transition-opacity duration-500 opacity-0',
      },
    },
  },
};

export default DefaultStyles;
