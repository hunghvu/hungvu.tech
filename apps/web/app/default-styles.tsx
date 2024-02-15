import type { PrimeReactPTOptions } from 'primereact/api';
import type { ButtonPassThroughMethodOptions } from 'primereact/button';
import type { MenubarPassThroughMethodOptions } from 'primereact/menubar';
import { geist } from './_components/fonts';
import { classNames } from 'primereact/utils';

const TRANSITIONS = {
  overlay: {
    timeout: 150,
    classNames: {
      enter: 'opacity-0 scale-75',
      enterActive: 'opacity-100 !scale-100 transition-transform transition-opacity duration-150 ease-in',
      exit: 'opacity-100',
      exitActive: '!opacity-0 transition-opacity duration-150 ease-linear',
    },
  },
};

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
  datatable: {
    root: ({ props }: any) => ({
      className: classNames('relative', {
        'flex flex-col h-full': props.scrollable && props.scrollHeight === 'flex',
      }),
    }),
    loadingOverlay: {
      className: classNames(
        'fixed w-full h-full t-0 l-0 bg-gray-100/40',
        'transition duration-200',
        'absolute flex items-center justify-center z-2',
        'dark:bg-gray-950/40' // Dark Mode
      ),
    },
    loadingIcon: { className: 'w-8 h-8' },
    wrapper: ({ props }: any) => ({
      className: classNames({
        relative: props.scrollable,
        'flex flex-col grow h-full': props.scrollable && props.scrollHeight === 'flex',
      }),
    }),
    header: ({ props }: any) => ({
      className: classNames(
        'bg-slate-50 text-slate-700 border-gray-300 font-bold p-4',
        'dark:border-blue-900/40 dark:text-white/80 dark:bg-gray-900', // Dark Mode
        props.showGridlines ? 'border-x border-t border-b-0' : 'border-y border-x-0'
      ),
    }),
    table: { className: 'w-full border-spacing-0' },
    thead: ({ context }: any) => ({
      className: classNames({
        'bg-slate-50 sticky top-0 z-30': context.scrollable,
      }),
    }),
    tbody: ({ props, context }: any) => ({
      className: classNames({
        'sticky z-[1]': props.frozenRow && context.scrollable,
      }),
    }),
    tfoot: ({ context }: any) => ({
      className: classNames({
        'bg-slate-50 bottom-0 z-[1]': context.scrollable,
      }),
    }),
    footer: {
      className: classNames(
        'bg-slate-50 text-slate-700 border-t-0 border-b border-x-0 border-gray-300 font-bold p-4',
        'dark:border-blue-900/40 dark:text-white/80 dark:bg-gray-900' // Dark Mode
      ),
    },
    column: {
      headerCell: ({ context, props }: any) => ({
        className: classNames(
          'text-left border-0 border-b border-solid border-gray-300 dark:border-blue-900/40 font-bold',
          'transition duration-200',
          context?.size === 'small' ? 'p-2' : context?.size === 'large' ? 'p-5' : 'p-4', // Size
          context.sorted ? 'bg-blue-50 text-blue-700' : 'bg-slate-50 text-slate-700', // Sort
          context.sorted ? 'dark:text-white/80 dark:bg-blue-300' : 'dark:text-white/80 dark:bg-gray-900', // Dark Mode
          {
            'sticky z-[1]': props.frozen || props.frozen === '', // Frozen Columns
            'border-x border-y': context?.showGridlines,
            'overflow-hidden space-nowrap border-y relative bg-clip-padding': context.resizable, // Resizable
          }
        ),
      }),
      headerContent: { className: 'flex items-center' },
      bodyCell: ({ props, context }: any) => ({
        className: classNames(
          'text-left border-0 border-b border-solid border-gray-300',
          context?.size === 'small' ? 'p-2' : context?.size === 'large' ? 'p-5' : 'p-4', // Size
          'dark:text-white/80 dark:border-blue-900/40', // Dark Mode
          {
            'sticky bg-inherit': props && (props.frozen || props.frozen === ''), // Frozen Columns
            'border-x border-y': context.showGridlines,
          }
        ),
      }),
      sortIcon: ({ context }: any) => ({
        className: classNames('ml-2', context.sorted ? 'text-blue-700 dark:text-white/80' : 'text-slate-700 dark:text-white/70'),
      }),
      sortBadge: {
        className: classNames(
          'flex items-center justify-center align-middle',
          'rounded-[50%] w-[1.143rem] leading-[1.143rem] ml-2',
          'text-blue-700 bg-blue-50',
          'dark:text-white/80 dark:bg-blue-400' // Dark Mode
        ),
      },
      columnFilter: { className: 'inline-flex items-center ml-auto' },
      filterInput: {
        className: 'text-black',
      },
      filterOverlay: {
        className: classNames(
          'bg-white text-gray-600 border-0 rounded-md min-w-[12.5rem]',
          'dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80' //Dark Mode
        ),
      },
      filterMatchModeDropdown: {
        root: { className: 'min-[0px]:flex mb-2' },
      },
      filterRowItems: { className: 'm-0 p-0 py-3 list-none ' },
      filterRowItem: ({ context }: any) => ({
        className: classNames(
          'm-0 py-3 px-5 bg-transparent',
          'transition duration-200',
          context?.highlighted
            ? 'text-blue-700 bg-blue-100 dark:text-white/80 dark:bg-blue-300'
            : 'text-gray-600 bg-transparent dark:text-white/80 dark:bg-transparent'
        ),
      }),
      filterOperator: {
        className: classNames(
          'px-5 py-3 border-b border-solid border-gray-300 text-slate-700 bg-slate-50 rounded-t-md',
          'dark:border-blue-900/40 dark:text-white/80 dark:bg-gray-900' // Dark Mode
        ),
      },
      filterOperatorDropdown: {
        root: { className: 'min-[0px]:flex' },
      },
      filterConstraint: { className: 'p-5 border-b border-solid border-gray-300 dark:border-blue-900/40' },
      filterAddRule: { className: 'py-3 px-5' },
      filterAddRuleButton: {
        root: { className: 'justify-center w-full min-[0px]:text-sm' },
        // label: {className: 'flex-auto grow-0'},
        // icon: 'mr-2',
      },
      filterRemoveButton: {
        root: { className: 'ml-2' },
        // label: {className:'grow-0'},
      },
      filterButtonbar: { className: 'flex items-center justify-between p-5' },
      filterClearButton: {
        root: { className: 'w-auto min-[0px]:text-sm border-blue-500 text-blue-500 px-4 py-3' },
      },
      filterApplyButton: {
        root: { className: 'w-auto min-[0px]:text-sm px-4 py-3' },
      },
      filterMenuButton: ({ context }: any) => ({
        className: classNames(
          'inline-flex justify-center items-center cursor-pointer no-underline overflow-hidden relative ml-2',
          'w-8 h-8 rounded-[50%]',
          'transition duration-200',
          'hover:text-slate-700 hover:bg-gray-300/20', // Hover
          'focus:outline-0 focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]', // Focus
          'dark:text-white/70 dark:hover:text-white/80 dark:bg-gray-900', // Dark Mode
          {
            'bg-blue-50 text-blue-700': context.active,
          }
        ),
      }),
      headerFilterClearButton: ({ context }: any) => ({
        className: classNames(
          'inline-flex justify-center items-center cursor-pointer no-underline overflow-hidden relative',
          'text-left bg-transparent m-0 p-0 border-none select-none ml-2',
          {
            invisible: !context.hidden,
          }
        ),
      }),
    },

    footerCell: ({ context }: any) => ({
      className: classNames(
        'text-left border-0 border-b border-solid border-gray-300 font-bold',
        'bg-slate-50 text-slate-700',
        'transition duration-200',
        context?.size === 'small' ? 'p-2' : context?.size === 'large' ? 'p-5' : 'p-4', // Size
        'dark:text-white/80 dark:bg-gray-900 dark:border-blue-900/40', // Dark Mode
        {
          'border-x border-y': context.showGridlines,
        }
      ),
    }),

    // columnresizer: 'block absolute top-0 right-0 m-0 w-2 h-full p-0 cursor-col-resize border border-transparent',
    // rowreordericon: 'cursor-move',
    // roweditorinitbutton: {
    //   className: classNames(
    //     'inline-flex items-center justify-center overflow-hidden relative',
    //     'text-left cursor-pointer select-none',
    //     'w-8 h-8 border-0 rounded-[50%]',
    //     'transition duration-200',
    //     'text-slate-700 border-transparent',
    //     'focus:outline-0 focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]', //Focus
    //     'hover:text-slate-700 hover:bg-gray-300/20', //Hover
    //     'dark:text-white/70' // Dark Mode
    //   ),
    // },
    // roweditorsavebutton: {
    //   className: classNames(
    //     'inline-flex items-center justify-center overflow-hidden relative',
    //     'text-left cursor-pointer select-none',
    //     'w-8 h-8 border-0 rounded-[50%]',
    //     'transition duration-200',
    //     'text-slate-700 border-transparent',
    //     'focus:outline-0 focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]', //Focus
    //     'hover:text-slate-700 hover:bg-gray-300/20', //Hover
    //     'dark:text-white/70' // Dark Mode
    //   ),
    // },
    // roweditorcancelbutton: {
    //   className: classNames(
    //     'inline-flex items-center justify-center overflow-hidden relative',
    //     'text-left cursor-pointer select-none',
    //     'w-8 h-8 border-0 rounded-[50%]',
    //     'transition duration-200',
    //     'text-slate-700 border-transparent',
    //     'focus:outline-0 focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]', //Focus
    //     'hover:text-slate-700 hover:bg-gray-300/20', //Hover
    //     'dark:text-white/70' // Dark Mode
    //   ),
    // // },
    // radiobuttonwrapper: {
    //   className: classNames('relative inline-flex cursor-pointer select-none align-bottom', 'w-6 h-6'),
    // },
    // radiobutton: ({ context }: any) => ({
    //   className: classNames(
    //     'flex justify-center items-center',
    //     'border-2 w-6 h-6 text-gray-700 rounded-full transition duration-200 ease-in-out',
    //     context.checked
    //       ? 'border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-400'
    //       : 'border-gray-300 bg-white dark:border-blue-900/40 dark:bg-gray-900',
    //     {
    //       'hover:border-blue-500 dark:hover:border-blue-400 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]':
    //         !context.disabled,
    //       'cursor-default opacity-60': context.disabled,
    //     }
    //   ),
    // }),
    // radiobuttonicon: ({ context }: any) => ({
    //   className: classNames('transform rounded-full', 'block w-3 h-3 transition duration-200 bg-white dark:bg-gray-900', {
    //     'backface-hidden scale-10 invisible': context.checked === false,
    //     'transform scale-100 visible': context.checked === true,
    //   }),
    // }),
    // headercheckboxwrapper: {
    //   className: classNames('cursor-pointer inline-flex relative select-none align-bottom', 'w-6 h-6'),
    // },
    // headercheckbox: ({ context }: any) => ({
    //   className: classNames(
    //     'flex items-center justify-center',
    //     'border-2 w-6 h-6 text-gray-600 rounded-lg transition-colors duration-200',
    //     context.checked
    //       ? 'border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-400'
    //       : 'border-gray-300 bg-white dark:border-blue-900/40 dark:bg-gray-900',
    //     {
    //       'hover:border-blue-500 dark:hover:border-blue-400 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]':
    //         !context.disabled,
    //       'cursor-default opacity-60': context.disabled,
    //     }
    //   ),
    // }),
    // headercheckboxicon: 'w-4 h-4 transition-all duration-200 text-white text-base dark:text-gray-900',
    // checkboxwrapper: {
    //   className: classNames('cursor-pointer inline-flex relative select-none align-bottom', 'w-6 h-6'),
    // },
    // checkbox: ({ context }: any) => ({
    //   className: classNames(
    //     'flex items-center justify-center',
    //     'border-2 w-6 h-6 text-gray-600 rounded-lg transition-colors duration-200',
    //     context.checked
    //       ? 'border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-400'
    //       : 'border-gray-300 bg-white dark:border-blue-900/40 dark:bg-gray-900',
    //     {
    //       'hover:border-blue-500 dark:hover:border-blue-400 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]':
    //         !context.disabled,
    //       'cursor-default opacity-60': context.disabled,
    //     }
    //   ),
    // }),
    // checkboxicon: 'w-4 h-4 transition-all duration-200 text-white text-base dark:text-gray-900',
    // transition: TRANSITIONS.overlay,

    bodyRow: ({ context }: any) => ({
      className: classNames(
        context.selected ? 'bg-blue-50 text-blue-700 dark:bg-blue-300' : 'bg-white text-gray-600 dark:bg-gray-900',
        context.stripedRows
          ? context.index % 2 === 0
            ? 'bg-white text-gray-600 dark:bg-gray-900'
            : 'bg-blue-50/50 text-gray-600 dark:bg-gray-950'
          : '',
        'transition duration-200',
        'focus:outline focus:outline-[0.15rem] focus:outline-blue-200 focus:outline-offset-[-0.15rem]', // Focus
        'dark:text-white/80 dark:focus:outline dark:focus:outline-[0.15rem] dark:focus:outline-blue-300 dark:focus:outline-offset-[-0.15rem]', // Dark Mode
        {
          'cursor-pointer': context.selectable,
          'hover:bg-gray-300/20 hover:text-gray-600': context.selectable && !context.selected, // Hover
        }
      ),
    }),
    // rowexpansion: 'bg-white text-gray-600 dark:bg-gray-900 dark:text-white/80',
    // rowgroupheader: {
    //   className: classNames('sticky z-[1]', 'bg-white text-gray-600', 'transition duration-200'),
    // },
    // rowgroupfooter: {
    //   className: classNames('sticky z-[1]', 'bg-white text-gray-600', 'transition duration-200'),
    // },
    // rowgrouptoggler: {
    //   className: classNames(
    //     'text-left m-0 p-0 cursor-pointer select-none',
    //     'inline-flex items-center justify-center overflow-hidden relative',
    //     'w-8 h-8 text-gray-500 border-0 bg-transparent rounded-[50%]',
    //     'transition duration-200',
    //     'dark:text-white/70' // Dark Mode
    //   ),
    // },
    // rowgrouptogglericon: 'inline-block w-4 h-4',
    // resizehelper: 'absolute hidden w-px z-10 bg-blue-500 dark:bg-blue-300',
  },
  multiselect: {
    root: function root(_ref73) {
      var props = _ref73.props;
      return {
        className: classNames(
          'inline-flex cursor-pointer select-none',
          'bg-white dark:bg-gray-900 border border-gray-400 dark:border-blue-900/40  transition-colors duration-200 ease-in-out rounded-md',
          'w-full md:w-80',
          {
            'opacity-60 select-none pointer-events-none cursor-default': props === null || props === void 0 ? void 0 : props.disabled,
          }
        ),
      };
    },
    labelContainer: { className: 'overflow-hidden flex flex-auto cursor-pointer' },
    label: function label(_ref74) {
      var props = _ref74.props;
      return {
        className: classNames(
          'block overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis',
          'text-gray-800 dark:text-white/80',
          'p-3 transition duration-200',
          {
            '!p-3': props.display !== 'chip' && (props.value == null || props.value == undefined),
            '!py-1.5 px-3': props.display === 'chip' && props.value !== null,
          }
        ),
      };
    },
    token: {
      className: classNames(
        'py-1 px-2 mr-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white/80 rounded-full',
        'cursor-default inline-flex items-center'
      ),
    },
    removeTokenIcon: { className: 'ml-2' },
    trigger: {
      className: classNames(
        'flex items-center justify-center shrink-0',
        'bg-transparent text-gray-600 dark:text-white/70 w-12 rounded-tr-lg rounded-br-lg'
      ),
    },
    panel: {
      className: classNames('bg-white dark:bg-gray-900 text-gray-700 dark:text-white/80 border-0 rounded-md shadow-lg'),
    },
    header: {
      className: classNames(
        'p-3 border-b border-gray-300 dark:border-blue-900/40 text-gray-700 dark:text-white/80 bg-gray-100 dark:bg-gray-800 rounded-t-lg',
        'flex items-center justify-between'
      ),
    },
    headerCheckboxContainer: {
      className: classNames('inline-flex cursor-pointer select-none align-bottom relative', 'mr-2', 'w-6 h-6'),
    },
    headerCheckbox: {
      root: function root(_ref75) {
        var props = _ref75.props;
        return {
          className: classNames(
            'flex items-center justify-center',
            'border-2 w-6 h-6 text-gray-600 dark:text-white/70 rounded-lg transition-colors duration-200',
            'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]',
            {
              'border-gray-300 dark:border-blue-900/40 bg-white dark:bg-gray-900': !(props !== null && props !== void 0 && props.checked),
              'border-blue-500 bg-blue-500': props === null || props === void 0 ? void 0 : props.checked,
            }
          ),
        };
      },
    },
    headerCheckboxIcon: { className: 'w-4 h-4 transition-all duration-200 text-white text-base' },
    closeButton: {
      className: classNames(
        'flex items-center justify-center overflow-hidden relative',
        'w-8 h-8 text-gray-500 dark:text-white/70 border-0 bg-transparent rounded-full transition duration-200 ease-in-out mr-2 last:mr-0',
        'hover:text-gray-700 dark:hover:text-white/80 hover:border-transparent hover:bg-gray-200 dark:hover:bg-gray-800/80 ',
        'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]'
      ),
    },
    // closeButtonIcon: {className: 'w-4 h-4 inline-block'},
    wrapper: {
      className: classNames(
        'max-h-[200px] overflow-auto',
        'bg-white text-gray-700 border-0 rounded-md shadow-lg',
        'dark:bg-gray-900 dark:text-white/80'
      ),
    },
    list: { className: 'py-3 list-none m-0' },
    item: function item(_ref76) {
      var context = _ref76.context;
      return {
        className: classNames(
          'cursor-pointer font-normal overflow-hidden relative whitespace-nowrap',
          'm-0 p-3 border-0  transition-shadow duration-200 rounded-none',
          {
            'text-gray-700 hover:text-gray-700 hover:bg-gray-200 dark:text-white/80 dark:hover:bg-gray-800': !context.focused && !context.selected,
            'bg-gray-300 text-gray-700 dark:text-white/80 dark:bg-gray-800/90 hover:text-gray-700 hover:bg-gray-200 dark:text-white/80 dark:hover:bg-gray-800':
              context.focused && !context.selected,
            'bg-blue-100 text-blue-700 dark:bg-blue-400 dark:text-white/80': context.focused && context.selected,
            'bg-blue-50 text-blue-700 dark:bg-blue-300 dark:text-white/80': !context.focused && context.selected,
          }
        ),
      };
    },
    checkboxContainer: {
      className: classNames('inline-flex cursor-pointer select-none align-bottom relative', 'mr-2', 'w-6 h-6'),
    },
    checkbox: function checkbox(_ref77) {
      var context = _ref77.context;
      return {
        className: classNames(
          'flex items-center justify-center',
          'border-2 w-6 h-6 text-gray-600 dark:text-white/80 rounded-lg transition-colors duration-200',
          'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]',
          {
            'border-gray-300 dark:border-blue-900/40  bg-white dark:bg-gray-900': !(context !== null && context !== void 0 && context.selected),
            'border-blue-500 bg-blue-500': context === null || context === void 0 ? void 0 : context.selected,
          }
        ),
      };
    },
    checkboxIcon: { className: 'w-4 h-4 transition-all duration-200 text-white text-base' },
    itemGroup: {
      className: classNames('m-0 p-3 text-gray-800 bg-white font-bold', 'dark:bg-gray-900 dark:text-white/80', 'cursor-auto'),
    },
    filterContainer: { className: 'relative' },
    filterInput: {
      root: {
        className: classNames(
          'pr-7 -mr-7',
          'w-full',
          'font-sans text-base text-gray-700 bg-white py-3 px-3 border border-gray-300 transition duration-200 rounded-lg appearance-none',
          'dark:bg-gray-900 dark:border-blue-900/40 dark:hover:border-blue-300 dark:text-white/80',
          'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]'
        ),
      },
    },
    filterIcon: { className: '-mt-2 absolute top-1/2' },
    clearIcon: { className: 'text-gray-500 right-12 -mt-2 absolute top-1/2' },
    // transition: TRANSITIONS.overlay,
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
        sm:shadow-none sm:w-auto flex-col top-full left-0 absolute py-1 shadow-md w-full
        ${state?.mobileActive ? 'flex border-b border-zinc-700' : 'hidden border-none'}`,
    }),
    action: {
      className: 'flex flex-row justify-center items-center gap-1 cursor-pointer p-2',
    },
    menuitem: {
      className: 'hover:bg-zinc-400/10 hover:text-zinc-400',
    },
    button: {
      className: 'sm:hidden',
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
