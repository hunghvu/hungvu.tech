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
  { icon: github, href: "https://github.com/hunghvu", alt: "GitHub profile of Hung Vu" },
  { icon: linkedin, href: "https://www.linkedin.com/in/hunghvu/", alt: "LinkedIn profile of Hung Vu" },
  { icon: twitter, href: "https://twitter.com/hunghvu_dev", alt: "Twitter profile of Hung Vu" },
  { icon: rss, href: "/rss.xml", alt: "RSS feed of hungvu.tech" },
];

const Navbar: React.FC = () => {
  return (
    <nav className="flex flex-row justify-between">
      <Link href="/">Hung Vu</Link>
      <div className="flex flex-row justify-around">
        {navItems.map(({ label, href }, index) => (
          // Static values for navbar, index as key is fine
          <Link href={href} key={index}>
            {label}
          </Link>
        ))}
      </div>
      <div className="flex flex-row justify-around">
        {socialItems.map(({ icon, href, alt }, index) => (
          // Static values for navbar, index as key is fine
          <Link href={href} key={index}>
            <Image src={icon} alt={alt} width={24} height={24} />
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
