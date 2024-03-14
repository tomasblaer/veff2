import { ViewList } from "@/components/list/list";
import { getGames } from "../lib/games";
import { GameView } from "@/components/view/gameView";
import { Game } from "@/lib/types";

export default async function Home() {
  const games = await getGames(true);

  const gameList = games.map((game: Game, index) => {
    const data: Game = {
      id: game.id,
      home: game.home,
      away: game.away,
      homeScore: game.homeScore,
      awayScore: game.awayScore,
      date: game.date,
    };
    return <GameView {...data} key={index} />;
  });    

  return (
    <main>
    </main>
  );
}
