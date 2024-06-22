import type { ToastState } from "primereact/toast";

const toast = {
  root: {
    className: '-translate-x-1/2 w-96',
  },
  // ToastPassthroughMethodOptions does not have index, so we have to customize types here
  message: ({ state, index }: { state: ToastState; index: number }) => ({
    className: `flex flex-row my-4 border-solid border-0 border-l-8 ${state.messages[index] && state.messages[index].message.severity === 'success'
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
}

export { toast }