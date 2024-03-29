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
      icon: (
        <Image
          alt={`Navigate to Hung's blog page.`}
          height={24}
          src='/book.svg'
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
          width={24}
        />
      ),
      url: '/',
    },
    {
      label: 'Lab',
      icon: (
        <Image
          alt={`Navigate to Hung's experimental lab page`}
          height={24}
          src='/flask.svg'
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
          width={24}
        />
      ),
      url: '/lab',
    },
  ];
  return (
    // Based on the documentation, there should be a way to directly access hamburger button in mobile .
    // Still not sure what it is. If we useRef and call getMenuButton, this becomes a client component, which is not desired.
    // For now, just leave the hamburger button as is (no aria-label = fail accessibility Lighthouse test).
    <Menubar
      aria-label='Navigation menu'
      end={
        <nav className='flex flex-row gap-4'>
          <Link
            aria-label='LinkedIn'
            className='flex flex-row items-center'
            href='https://www.linkedin.com/in/hunghvu/'
            prefetch={false}
            rel='nofollow noopener noreferrer'
            target='_blank'
          >
            <Image
              alt={`Navigate to Hung's LinkedIn.`}
              height={24}
              src='/linkedin.svg'
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
              width={24}
            />
          </Link>
          <Link
            aria-label='GitHub'
            className='flex flex-row items-center'
            href='https://github.com/hunghvu/hungvu.tech'
            prefetch={false}
            rel='nofollow noopener noreferrer'
            target='_blank'
          >
            <Image
              alt='Navigate to hungvu.tech GitHub repository.'
              height={24}
              src='/github.svg'
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
              width={24}
            />
          </Link>
        </nav>
      }
      model={items}
      start={<Link href='/'>Hung Vu</Link>}
    />
  );
};

export default Header;
