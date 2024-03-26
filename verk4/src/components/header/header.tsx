"use client";
import Link from "next/link";
import ThemeSwitch from "./theme-switch";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 border-b-gray-200 border">
      <Link href="/">
        <h1 className="text-2xl font-bold">Leikjavefurinn</h1>
      </Link>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/games">Leikir</Link>
          </li>
          <li>
            <ThemeSwitch />
          </li>
        </ul>
      </nav>
    </header>
  );
}
