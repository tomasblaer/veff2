import { Game } from "@/lib/types";
import Link from "next/link";

type GameViewProps = {
  data: Game;
};

export function GameView({ data }: GameViewProps) {
  const { id, date, home, away, homeScore, awayScore } = data;
  const href = `/games/${id}`;
  return (
    <>
      <Link href={href} className="col-span-1 text-right">
        {home}
      </Link>
      <Link href={href} className="col-span-1 text-center">
        {homeScore} : {awayScore}     
      </Link>
      <Link href={href} className="col-span-1 text-left">
        {away}
      </Link>
    </>
  );
}
