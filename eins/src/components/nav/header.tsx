import Link from "next/link";
import Icon from "./icon";

export default function Header() {
  return (
    <header className="flex border-b-slate-100 border-b-2 p-4 justify-between bg-slate-50">
      <div className="flex">
        <Icon />
        <h2 className="font-bold cursor-default my-auto pl-2 select-none">
          ritdeildin.
        </h2>
      </div>
      <ul className="flex gap-4 list-none">
        <li className="my-auto">
          <Link href="#" className="my-auto" >
            1
          </Link>
        </li>
        <li className="my-auto">
          <Link href="#" className="my-auto" >
            2
          </Link>
        </li>
      </ul>
    </header>
  );
}