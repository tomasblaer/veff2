import { Game } from "@/lib/types";
import Link from "next/link";

type GameViewProps = {
  data: Game;
};

export function GameView({ data }: GameViewProps) {
  const { id, home, away, homeScore, awayScore } = data;
  const href  = `/games/${id}`;
  return (
    <Link href={href} className="grid grid-cols-3 hover:bg-gray-300 hover:rounded-md">
      <div className="col-span-1 text-right">
        {home}
      </div>
      <div className="col-span-1 text-center">
        {homeScore} : {awayScore}     
      </div>
      <div className="col-span-1 text-left">
        {away}
      </div>
    </Link>
  );
}
