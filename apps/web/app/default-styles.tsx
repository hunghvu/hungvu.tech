/* eslint-disable no-nested-ternary */
import type { PrimeReactPTOptions } from 'primereact/api';
import { geist } from './_components/fonts';

const DefaultStyles: PrimeReactPTOptions = {
  button: {
    root: ({ props, context }: any) => ({
      className: `items-center cursor-pointer inline-flex overflow-hidden relative select-none text-center align-bottom h-full transition duration-200 ease-in-out 
        focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_4px_rgba(157,193,251,1),0_1px_2px_0_rgba(0,0,0,1)] 
        ${geist.className} ${
          !props.link && props.severity === null && !props.text && !props.outlined && !props.plain
            ? ' bg-blue-500 border border-blue-500 hover:bg-blue-600 hover:border-blue-600 '
            : ''
        } ${props.link ? ' text-blue-600 bg-transparent border-transparent ' : ''} ${
          props.severity === 'secondary' && !props.text && !props.outlined && !props.plain
            ? ' bg-gray-500 border border-gray-500 hover:bg-gray-600 hover:border-gray-600 '
            : props.severity === 'success' && !props.text && !props.outlined && !props.plain
            ? ' bg-green-500 border border-green-500 hover:bg-green-600 hover:border-green-600 '
            : props.severity === 'info' && !props.text && !props.outlined && !props.plain
            ? ' bg-blue-500 border border-blue-500 hover:bg-blue-600 hover:border-blue-600 '
            : props.severity === 'warning' && !props.text && !props.outlined && !props.plain
            ? ' bg-orange-500 border border-orange-500 hover:bg-orange-600 hover:border-orange-600 '
            : props.severity === 'help' && !props.text && !props.outlined && !props.plain
            ? ' bg-purple-500 border border-purple-500 hover:bg-purple-600 hover:border-purple-600 '
            : props.severity === 'danger' && !props.text && !props.outlined && !props.plain
            ? ' bg-red-500 border border-red-500 hover:bg-red-600 hover:border-red-600 '
            : ''
        } ${props.raised ? ' shadow-lg ' : ''} ${props.rounded ? ' rounded-full ' : ' rounded-md '} ${
          props.text && !props.plain ? ' bg-transparent border-transparent ' : ''
        } ${
          props.text && !props.plain
            ? ' bg-transparent border-transparent '
            : props.text && (props.severity === null || props.severity === 'info') && !props.plain
            ? ' text-blue-500 hover:bg-blue-300/20 '
            : props.text && props.severity === 'secondary' && !props.plain
            ? ' text-gray-500 hover:bg-gray-300/20 '
            : props.text && props.severity === 'success' && !props.plain
            ? ' text-green-500 hover:bg-green-300/20 '
            : props.text && props.severity === 'warning' && !props.plain
            ? ' text-orange-500 hover:bg-orange-300/20 '
            : props.text && props.severity === 'help' && !props.plain
            ? ' text-purple-500 hover:bg-purple-300/20 '
            : props.text && props.severity === 'danger' && !props.plain
            ? ' text-red-500 hover:bg-red-300/20 '
            : ''
        } ${props.raised && props.text ? ' shadow-lg ' : ''} ${
          props.plain && props.text
            ? ' text-gray-500 hover:bg-gray-300/20 '
            : props.plain && props.outlined
            ? ' text-gray-500 border border-gray-500 hover:bg-gray-300/20 '
            : props.plain && !props.outlined && !props.text
            ? ' bg-gray-500 border border-gray-500 hover:bg-gray-600 hover:border-gray-600 '
            : ''
        } ${
          props.outlined && !props.plain
            ? ' bg-transparent border '
            : props.outlined && (props.severity === null || props.severity === 'info') && !props.plain
            ? ' text-blue-500 border border-blue-500 hover:bg-blue-300/20 '
            : props.outlined && props.severity === 'secondary' && !props.plain
            ? ' text-gray-500 border border-gray-500 hover:bg-gray-300/20 '
            : props.outlined && props.severity === 'success' && !props.plain
            ? ' text-green-500 border border-green-500 hover:bg-green-300/20 '
            : props.outlined && props.severity === 'warning' && !props.plain
            ? ' text-orange-500 border border-orange-500 hover:bg-orange-300/20 '
            : props.outlined && props.severity === 'help' && !props.plain
            ? ' text-purple-500 border border-purple-500 hover:bg-purple-300/20 '
            : props.outlined && props.severity === 'danger' && !props.plain
            ? ' text-red-500 border border-red-500 hover:bg-red-300/20 '
            : ''
        } ${
          props.size === null
            ? ' px-4 py-3 text-base '
            : props.size === 'small'
            ? ' text-xs py-2 px-3 '
            : props.size === 'large'
            ? ' text-xl py-3 px-4 '
            : ''
        } ${context.disabled ? ' opacity-60 pointer-events-none cursor-default ' : ''}
      `,
    }),
    label: ({ props }: any) => ({
      className: `flex-1 duration-200 font-bold ${props.link ? 'hover:underline' : ''}`,
    }),
    icon: ({ props }: any) => ({
      className: `mx-0 ${
        props.iconPos === 'left' && props.label !== null
          ? 'mr-2'
          : props.iconPos === 'right' && props.label !== null
          ? 'ml-2'
          : props.iconPos === 'top' && props.label !== null
          ? 'mb-2'
          : props.iconPos === 'bottom' && props.label !== null
          ? 'mt-2'
          : ''
      }`,
    }),
    badge: ({ props }: any) => ({
      className: props.badge ? 'ml-2 w-4 h-4 leading-none flex items-center justify-center' : '',
    }),
  },
  card: {
    root: {
      className: `shadow-md rounded-md ${geist.className}`,
    },
    body: { className: 'flex flex-col gap-5 pt-5 px-5' },
    title: { className: 'text-2xl font-bold mb-2' },
    subTitle: {
      className: 'font-normal mb-2 ',
    },
    footer: { className: 'pt-5' },
  },
  divider: {
    root: ({ props }: any) => ({
      className: `flex relative ${
        props.layout === 'horizontal'
          ? 'w-full my-5 mx-0 py-0 px-5 before:block before:left-0 before:absolute before:top-1/2 before:w-full before:border-t before:border-[#2c323a] '
          : props.layout === 'vertical'
          ? 'min-h-full mx-4 md:mx-5 py-5 before:block before:min-h-full before:absolute before:left-1/2 before:top-0 before:transform before:-translate-x-1/2 before:border-l before:border-[#2c323a] '
          : ''
      } ${
        props.type === 'solid'
          ? 'before:border-solid'
          : props.type === 'dotted'
          ? 'before:border-dotted'
          : props.type === 'dashed'
          ? 'before:border-dashed'
          : ''
      }`,
    }),
    content: { className: 'px-1 z-10 ' },
  },
  menubar: {
    root: {
      className: `px-2 py-1 ${geist.className} text-xl md:text-2xl border-x-0 border-b border-[#2c323a] text-[#8c8c8c]`,
    },
    menu: ({ state }: any) => ({
      className: `m-0 sm:p-0 list-none outline-none sm:flex items-center flex-wrap sm:flex-row sm:top-auto sm:left-auto sm:relative sm:bg-transparent 
        sm:shadow-none sm:w-auto flex-col top-full left-0 absolute py-1 border-0 shadow-md w-full ${
          state?.mobileActive ? 'flex border-x-0 border-t-0 border-b border-[#2c323a]' : 'hidden'
        }`,
    }),
    menuitem: ({ context }: any) => ({
      className: `
        'sm:relative sm:w-auto w-full static transition-shadow duration-200 ${
          context.active ? '' : 'hover:bg-[#aeaeae]/10 hover:text-[#aeaeae] hover:rounded-md'
        }`,
    }),
    popupIcon: {
      className: 'w-[1.5rem] h-[1.5rem]',
    },
    action: ({ context }: any) => ({
      className: `select-none cursor-pointer flex items-center no-underline overflow-hidden relative py-3 px-5 select-none ${
        context.level === 1 ? 'pl-9 sm:pl-5' : context.level === 2 ? 'pl-14 sm:pl-5' : ''
      }`,
    }),
    icon: { className: 'mr-2 text-2xl' },
    submenuIcon: ({ props }: any) => ({
      className: `${props.root ? 'ml-auto sm:ml-2' : 'ml-auto'}`,
    }),
    separator: { className: 'border-t border-gray-300 ' },
    button: {
      className: `flex sm:hidden w-8 h-8 rounded-full 
        transition duration-200 ease-in-out cursor-pointer flex items-center 
        justify-center no-underline hover:text-[#aeaeae]`,
    },
    end: {
      className: 'ml-0',
    },
  },
  tag: {
    root: ({ props }: any) => ({
      className: `inline-flex items-center justify-center bg-blue-500 text-xs font-semibold px-2 ${
        props.severity === 'secondary'
          ? 'bg-gray-500'
          : props.severity === 'success'
          ? 'bg-green-500'
          : props.severity === 'info'
          ? 'bg-dark-cyan-800'
          : props.severity === 'warning'
          ? 'bg-orange-500'
          : props.severity === 'help'
          ? 'bg-purple-500'
          : props.severity === 'danger'
          ? 'bg-red-500'
          : ''
      } ${props.rounded ? 'rounded-full' : 'rounded-md'}`,
    }),
    value: { className: `leading-6 ${geist.className} text-sm md:text-base text-[#aeaeae]` },
    icon: { className: 'mr-1 text-sm' },
  },
  toast: {
    root: {
      className: 'w-96 opacity-90',
    },
    message: ({ state, index }: any) => ({
      className: `my-4 rounded-md w-full border-solid border-0 border-l-4 ${
        state.messages[index] && state.messages[index].message.severity === 'info'
          ? 'bg-blue-100 border-blue-500 text-blue-700'
          : state.messages[index] && state.messages[index].message.severity === 'success'
          ? 'bg-green-100 border-green-500 text-green-700'
          : state.messages[index] && state.messages[index].message.severity === 'warn'
          ? 'bg-orange-100 border-orange-500 text-orange-700'
          : state.messages[index] && state.messages[index].message.severity === 'error'
          ? 'bg-red-100 border-red-500 text-red-700'
          : ''
      }`,
    }),
    content: { className: 'flex items-center py-5 px-7' },
    icon: {
      className: 'w-6 h-6 text-lg mr-2',
    },
    text: { className: 'text-base font-normal flex flex-col flex-1 grow shrink ml-4' },
    summary: { className: 'font-bold block' },
    detail: { className: 'mt-1 block' },
    closeButton: {
      className: `w-8 h-8 rounded-full bg-transparent transition duration-200 ease-in-out
        ml-auto overflow-hidden relative
        flex items-center justify-center
        hover:bg-white/30`,
    },
    transition: {
      addEndListener: (_node: any, _done: any) => {
        return null;
      },
      enterFromClass: { className: 'opacity-0 translate-x-0 translate-y-2/4 translate-z-0' },
      enterActiveClass: { className: 'transition-transform transition-opacity duration-300' },
      leaveFromClass: { className: 'max-h-40' },
      leaveActiveClass: { className: 'transition-all duration-500 ease-in' },
      leaveToClass: { className: 'max-h-0 opacity-0 mb-0 overflow-hidden' },
    },
  },
};

export default DefaultStyles;
