'use client'

import Icon from "./icon";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Pen } from "lucide-react";
import NavMenu from "./navmenu";

export default function Header() {
  return (
    <header className="flex border-b-slate-100 border-b-2 p-4 bg-slate-50">
      <div className="flex flex-1">
        <Icon />
        <h2 className="font-bold cursor-default my-auto pl-2 select-none">
          ritdeildin.
        </h2>
      </div>
      <div className="pr-20">
        <NavMenu />  
      </div>
      <div className="flex-1" />
    </header>
  );
}
