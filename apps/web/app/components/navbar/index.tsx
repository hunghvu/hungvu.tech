import React from "react";

import Link from "next/link";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

const Navbar: React.FC = () => {
  return (
    <nav>
      {navItems.map(({ label, href }, index) => (
        // Static values for navbar, index as key is fine
        <Link href={href} key={index}>
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
