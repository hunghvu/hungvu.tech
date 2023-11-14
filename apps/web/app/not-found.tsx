/**
 * @author Hung Vu
 *
 * Global 404 page generator: https://nextjs.org/docs/app/api-reference/file-conventions/not-found
 */

import Link from 'next/link';

export default function NotFound() {
  return (
    <section className='flex flex-col justify-center items-center gap-4 w-full md:w-[768px] m-4'>
      <hgroup className='flex flex-col justify-center items-center gap-6 w-full'>
        <h1 className='text-5xl md:text-6xl font-extrabold'>404 🤖</h1>
        <p className='text-2xl md:text-3xl font-bold text-[#ffffffde]/70 italic text-center'>
          The requested content is not available. That's all we know.
        </p>
        <div className='flex flex-row gap-4 justify-center items-center'>
          <Link href='/' className='text-lg md:text-xl hover:font-semibold bg-dark-cyan-700 py-1 w-[10rem] md:w-[12rem] rounded-md text-center'>
            Take me home
          </Link>
          <Link
            href='https://github.com/hunghvu/hungvu.tech/issues'
            className='text-lg md:text-xl hover:font-semibold bg-dark-cyan-800 py-1 w-[10rem] md:w-[12rem] rounded-md text-center'
          >
            Report on GitHub
          </Link>
        </div>
      </hgroup>
    </section>
  );
}
