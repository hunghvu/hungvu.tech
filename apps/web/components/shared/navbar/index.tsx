/**
 * @author Hung Vu
 *
 * This component is a navigation bar.
 */

import Link from "next/link";

import { LinkedIn, GitHub, Rss, Twitter } from "../svg";

import { fredoka } from "../../fonts";

type NavItem = {
  label: string;
  href: string;
};

type SocialItem = {
  Icon: JSX.Element;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

const socialItems: SocialItem[] = [
  {
    Icon: <LinkedIn alt="LinkedIn profile of Hung Vu" className="sm:w-6 sm:h-6 w-4 h-4 hover:animate-pulse fill-current text-[#0e76a8]" />,
    href: "https://www.linkedin.com/in/hunghvu/",
  },
  {
    Icon: (
      <GitHub
        alt="GitHub profile of Hung Vu"
        className="sm:w-6 sm:h-6 w-4 h-4 hover:animate-pulse fill-current text-light-black-900 dark:text-dark-white-200"
      />
    ),
    href: "https://github.com/hunghvu",
  },
  {
    Icon: <Twitter alt="Twitter profile of Hung Vu" className="sm:w-6 sm:h-6 w-4 h-4 hover:animate-pulse fill-current text-[#1da1f2]" />,
    href: "https://twitter.com/hunghvu_dev",
  },
  { Icon: <Rss alt="RSS feed of hungvu.tech" className="sm:w-6 sm:h-6 w-4 h-4 hover:animate-pulse fill-current text-[#ee802f]" />, href: "/rss.xml" },
];

const Navbar: React.FC = () => {
  return (
    <nav
      className={`sm:py-12 py-6 lg:px-32 md:px-16 sm:px-8 px-4 grid sm:grid-cols-3 grid-cols-2 gap-2 ${fredoka.className} text-2xl font-bold text-light-black-900 dark:text-dark-white-200`}
    >
      <div className="flex flex-row items-center pl-2">
        <Link href="/">Hung Vu</Link>
      </div>

      {/* TODO: After finishing core functionalities of the page. Come back here and create hover animation for navitems (e.g., colored border run clockwise) */}
      {/* TODO: After page are long enough to scroll, add the following navbar effect: sticky navbar, but at certain point when will hide when idle, and reappear when scrolling */}
      <div className="flex flex-row sm:justify-center justify-end items-center lg:gap-32 md:gap-16 gap-4 ">
        {navItems.map(({ label, href }, index) => (
          // Static values for navbar, index as key is fine
          <Link
            href={href}
            key={index}
            className="px-2 border-2 rounded-3xl border-transparent hover:border-light-orange-300 dark:hover:border-dark-cyan-700 hover:transition-colors hover:duration-1000"
          >
            {label}
          </Link>
        ))}
      </div>
      <div className="flex flex-row sm:justify-end items-center pl-2 md:gap-6 sm:gap-4 gap-2 ">
        {socialItems.map(({ Icon, href }, index) => (
          // Static values for navbar, index as key is fine
          <Link href={href} key={index}>
            {Icon}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
