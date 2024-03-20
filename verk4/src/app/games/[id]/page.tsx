import GameCard from "@/components/cards/game-card";
import { getGame, getGames } from "@/lib/games";
import { Game } from "@/lib/types";

export async function generateStaticParams() {
  const games = await getGames();
  return games.map((game: Game) => ({
    id: game.id.toString(),
  }));
}

export default async function Page({ params }: { params: { id: number } }) {
  const game = await getGame(params.id, true);

  return (
    <main className="items-center w-screen h-screen flex justify-center">
      <GameCard data={game} />
    </main>
  );
}
