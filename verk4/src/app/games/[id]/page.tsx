import GameCard from "@/components/cards/gamecard/game-card";
import { getGame, getGames } from "@/lib/games";
import { getTeams } from "@/lib/teams";
import { Game } from "@/lib/types";

export async function generateStaticParams() {
  const games = await getGames();
  return games.map((game: Game) => ({
    id: game.id.toString(),
  }));
}

export default async function Page({ params }: { params: { id: number } }) {
  const game = await getGame(params.id, true);
  const teams = await getTeams();

  return (
    <main className="items-center w-screen h-screen flex justify-center">
      <GameCard data={game} teams={teams} />
    </main>
  );
}
