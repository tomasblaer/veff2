'use client'
import Link from "next/link";
import { Switch } from "../ui/switch";

export default function Header() {

  

  // const handleThemeChange(() => {
  //   console.log("Theme change")
  
  // }, []);

  return (
    <header className="flex justify-between items-center p-4 border-b-gray-200 border">
      <h1 className="text-2xl font-bold">Leikjavefurinn</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Switch />
          </li>
          <li>
            <Link href="/">Leikir</Link>
          </li>
          <li>
            <Link href="/teams">Lið</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}