import { getGame, getTeams } from "@/app/utils";
import { use } from 'react';

export default async function Page({ params }: { params: { id: number } }) {
  const game = await getGame(params.id);
  console.log(game);

  return (
    <main>
      <h1>{game.home}</h1>
      <h1>{game.away}</h1>
    </main>
  );
}
