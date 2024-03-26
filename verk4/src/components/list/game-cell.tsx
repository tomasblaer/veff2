import { Game } from "@/lib/types";
import Link from "next/link";

type GameCellProps = {
  data: Game;
};

export function GameCell({ data }: GameCellProps) {
  const { id, homeName, awayName, homeScore, awayScore } = data;
  const href = `/games/${id}`;
  return (
    <Link
      href={href}
      className="grid grid-cols-3 hover:bg-gray-300 dark:hover:bg-slate-900 hover:rounded-md"
    >
      <div className="col-span-1 text-right">{homeName}</div>
      <div className="col-span-1 text-center">
        {homeScore} : {awayScore}
      </div>
      <div className="col-span-1 text-left">{awayName}</div>
    </Link>
  );
}
