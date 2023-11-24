/**
 * Author: Hung Vu
 * 
 * Header component
 */

import Link from 'next/link';
import { Menubar } from 'primereact/menubar'
import { geist } from 'app/_components/fonts';

const Header: React.FunctionComponent = () => {
  const items = [
    {
      label: 'Blog',
      icon: 'pi pi-home',
      url: '/',
    },
    {
      label: 'Homelab',
      icon: 'pi pi-server',
      url: '/homelab'
    }
  ]
  return (
    <Menubar
      end={
        <nav className='flex flex-row gap-4'>
          <Link className='flex flex-row items-center' href='https://www.linkedin.com/in/hunghvu/'>
            <span className='pi pi-linkedin text-2xl' />
          </Link>
          <Link className='flex flex-row items-center' href='https://github.com/hunghvu'>
            <span className='pi pi-github text-2xl' />
          </Link>
        </nav>
      }
      model={items}
      pt={{
        root: {
          className: `${geist.className} flex flex-row justify-around font-bold sticky py-1
                      top-0 z-10 bg-gradient-to-b from-dark-cyan-800/50 via-[#1e1e1e] to-transparent
                      text-lg md:text-xl lg:text-2xl `
        },
        menu: {
          className: 'lg:gap-4 bg-transparent backdrop-blur'
        },
        icon: {
          className: 'text-2xl'
        },
        popupIcon: {
          className: 'w-[1.5rem] h-[1.5rem]'
        },
        end: {
          className: 'ml-0'
        }
      }}
      start={<Link href='/'>Hung Vu</Link>} />
  )
}

export default Header