import Link from 'next/link';
import { geist } from '../fonts';

const Footer: React.FunctionComponent = () => {
  return (
    <footer className='flex flex-col gap-4 z-30'>
      <p
        className={`
        flex flex-row justify-around items-center font-bold z-30 bg-gradient-to-r from-zinc-950/50 from-60% to-emerald-950/30 to-90%
        p-2 ${geist.className} text-lg md:text-xl border-b border-zinc-700 text-zinc-400
      `}
      >
        <Link href='/'>Copyright {new Date().getFullYear()} Hung Vu</Link>
      </p>
    </footer>
  );
};

export default Footer;
