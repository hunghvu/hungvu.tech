/**
 * Author: Hung Vu
 *
 * Header component
 */

import Link from 'next/link';
import { Menubar } from 'primereact/menubar';
import { geist } from 'app/_components/fonts';

const Header: React.FunctionComponent = () => {
  const items = [
    {
      label: 'Blog',
      icon: 'pi pi-book',
      url: '/',
    },
    // {
    //   label: 'Homelab',
    //   icon: 'pi pi-server',
    //   url: '/homelab',
    // },
  ];
  return (
    // Based on the documentation, there should be a way to directly access hamburger button in mobile .
    // Still not sure what it is. If we useRef and call getMenuButton, this becomes a client component, which is not desired.
    // For now, just leave the hamburger button as is (no aria-label = fail accessibility Lighthouse test).
    <Menubar
      aria-label='Navigation menu'
      end={
        <nav className='flex flex-row gap-4'>
          <Link aria-label='LinkedIn' className='flex flex-row items-center' href='https://www.linkedin.com/in/hunghvu/' prefetch={false}>
            <span className='pi pi-linkedin text-2xl' />
          </Link>
          <Link aria-label='GitHub' className='flex flex-row items-center' href='https://github.com/hunghvu/hungvu.tech' prefetch={false}>
            <span className='pi pi-github text-2xl' />
          </Link>
        </nav>
      }
      model={items}
      pt={{
        root: {
          className: `${geist.className} flex flex-row justify-around font-bold sticky py-1
                      top-0 z-30 bg-gradient-to-b from-[#00001a] to-[#00002f]
                      text-xl md:text-2xl border-x-0 border-t-0 border-b-1`,
        },
        start: {
          className: 'text-[#8c8c8c]',
        },
        menu: {
          className: 'lg:gap-4 bg-transparent backdrop-blur border-x-0 border-t-0 border-b-1',
        },
        label: {
          className: 'text-[#8c8c8c]',
        },
        icon: {
          className: 'text-2xl text-[#8c8c8c]',
        },
        popupIcon: {
          className: 'w-[1.5rem] h-[1.5rem]',
        },
        action: {
          className: 'flex flex-row justify-center items-center',
        },
        end: {
          className: 'ml-0 text-[#8c8c8c]',
        },
      }}
      start={<Link href='/'>Hung Vu</Link>}
    />
  );
};

export default Header;
