/**
 * Author: Hung Vu
 *
 * Header component
 */

import Link from 'next/link';
import Image from 'next/image';
import { Menubar } from 'primereact/menubar';

const Header: React.FunctionComponent = () => {
  const items = [
    {
      label: 'Blog',
      icon: <Image alt={`Navigate to Hung's blog page.`} height={24} src='/book.svg' width={24} />,
      url: '/',
    },
    // {
    //   label: 'Homelab',
    //   icon: <Image alt={`Navigate to Hung's blog page`} height={24} src='/book.svg' width={24} />,
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
            <Image alt={`Navigate to Hung's LinkedIn.`} height={24} src='/linkedin.svg' width={24} />
          </Link>
          <Link aria-label='GitHub' className='flex flex-row items-center' href='https://github.com/hunghvu/hungvu.tech' prefetch={false}>
            <Image alt='Navigate to hungvu.tech GitHub repository.' height={24} src='/github.svg' width={24} />
          </Link>
        </nav>
      }
      model={items}
      start={<Link href='/'>Hung Vu</Link>}
    />
  );
};

export default Header;
