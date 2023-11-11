/**
 * @author Hung Vu
 * 
 * Header component
 */

import Link from "next/link";
import { Menubar } from "primereact/menubar"

import { geist } from "app/_components/fonts";

const Header: React.FunctionComponent = () => {
  const items = [
    {
      label: "Blog",
      icon: "pi pi-home",
      url: "/",
    },
    {
      label: "Homelab",
      icon: "pi pi-server",
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
        className: `${geist.className} flex flex-row justify-around text-2xl font-bold`
      },
      menu: {
        className: "gap-4"
      },
      icon: {
        className: "text-2xl"
      },
      popupIcon: {
        className: "w-[1.5rem] h-[1.5rem]"
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