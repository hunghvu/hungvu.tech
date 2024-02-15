import { classNames } from "primereact/utils";

const multiselect = {
  root: function root(_ref73: { props: any; }) {
    const props = _ref73.props;
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
  label: function label(_ref74: { props: any; }) {
    const props = _ref74.props;
    return {
      className: classNames(
        'block overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis',
        'text-gray-800 dark:text-white/80',
        'p-3 transition duration-200',
        {
          '!p-3': props.display !== 'chip' && (props.value === null || props.value === undefined),
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
    root: function root(_ref75: { props: any; }) {
      const props = _ref75.props;
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
  item: function item(_ref76: { context: any; }) {
    const context = _ref76.context;
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
  checkbox: function checkbox(_ref77: { context: any; }) {
    const context = _ref77.context;
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
}

export { multiselect };