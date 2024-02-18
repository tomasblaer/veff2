"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const refs = [
  { name: "Home", path: "/" },
  { name: "Playground", path: "/playground" },
];

export default function Navbar() {
  const [selected, setSelected] = useState(0);

  return (
    <nav className="hidden w-screen fixed bg-opacity-0 backdrop-blur z-10 lg:flex h-10">
      <ul className="flex justify-end pl-4 gap-8 ">
        <li className="m-auto">
          <Link href="/" className="font-bold text-center">
            Home
          </Link>
        </li>
        <li className="m-auto">
          <Link href="/playground" className="font-bold vert">
            Playground
          </Link>
        </li>
      </ul>
    </nav>
  );
}
