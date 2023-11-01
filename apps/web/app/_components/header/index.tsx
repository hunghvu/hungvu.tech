/**
 * @author Hung Vu
 * 
 * Header component
 */

import Link from "next/link";
import { Menubar } from "primereact/menubar"

import { intelOneMono } from "../fonts";

const Header: React.FunctionComponent = () => {
  const items = [
    {
      label: "Blog",
      icon: "pi pi-home text-2xl",
      url: "/",
    },
    {
      label: "Homelab",
      icon: "pi pi-server text-2xl",
      url: "/homelab"
    }
  ]
  return <Menubar model={items}
    start={<Link href="/">Hung Vu</Link>}
    end={
      <nav className="flex flex-row gap-4">
        <Link href="https://www.linkedin.com/in/hunghvu/">
          <span className="pi pi-linkedin text-2xl"></span>
        </Link>
        <Link href="https://github.com/hunghvu">
          <span className="pi pi-github text-2xl"></span>
        </Link>
      </nav>
    }
    pt={{
      root: {
        className: `${intelOneMono.className} flex flex-row justify-around text-2xl font-bold`
      },
      start: {
        className: "pb-1"
      },
      end: {
        className: "ml-0"
      }
    }} />
}

export default Header