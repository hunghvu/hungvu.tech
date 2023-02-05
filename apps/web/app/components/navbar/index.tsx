/**
 * @author Hung Vu
 *
 * This component is a navigation bar.
 */
import React from "react";

import Image from "next/image";
import Link from "next/link";

import github from "../../../public/images/github.svg";
import linkedin from "../../../public/images/linkedin.svg";
import rss from "../../../public/images/rss.svg";
import twitter from "../../../public/images/twitter.svg";

import { fredoka } from "../../fonts";

type NavItem = {
  label: string;
  href: string;
};

type SocialItem = {
  icon: any;
  href: string;
  alt: string;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

const socialItems: SocialItem[] = [
  { icon: linkedin, href: "https://www.linkedin.com/in/hunghvu/", alt: "LinkedIn profile of Hung Vu" },
  { icon: github, href: "https://github.com/hunghvu", alt: "GitHub profile of Hung Vu" },
  { icon: twitter, href: "https://twitter.com/hunghvu_dev", alt: "Twitter profile of Hung Vu" },
  { icon: rss, href: "/rss.xml", alt: "RSS feed of hungvu.tech" },
];

const Navbar: React.FC = () => {
  return (
    <nav className={`sm:py-12 py-6 lg:px-32 md:px-16 sm:px-8 px-4 grid sm:grid-cols-3 grid-cols-2 gap-2 ${fredoka.className} text-2xl font-bold`}>
      <Link href="/">Hung Vu</Link>
      <div className="flex flex-row justify-center lg:gap-32 md:gap-16 sm:gap-8 gap-4">
        {navItems.map(({ label, href }, index) => (
          // Static values for navbar, index as key is fine
          <Link href={href} key={index}>
            {label}
          </Link>
        ))}
      </div>
      <div className="flex flex-row sm:justify-end md:gap-6 sm:gap-4 gap-2">
        {socialItems.map(({ icon, href, alt }, index) => (
          // Static values for navbar, index as key is fine
          <Link href={href} key={index}>
            <Image src={icon} alt={alt} className="sm:w-6 sm:h-6 w-4 h-4" />
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
