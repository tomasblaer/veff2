import GameCell from "@/app/components/gamecell/gamecell";
import { Team, Game } from "@/app/lib/types";

async function getTeams() {
  const res = await fetch(`${process.env.API_URL}/teams`);
  const json = await res.json();
  return json;
}

async function getGame(id: number) {
  const res = await fetch(`${process.env.API_URL}/games/${id}`);
  const json = await res.json();
  return json;
}

async function getGameWithTeamName(id: number) {
  const gameData = getGame(id);
  const teamsData = getTeams();
  
  const [game, teams] = await Promise.all([gameData, teamsData]);

  const homeTeam = teams.find((team: Team) => team.id === game.home);
  const awayTeam = teams.find((team: Team) => team.id === game.away);

  game.home = homeTeam.name;
  game.away = awayTeam.name;

  console.log(game);
  return game;
}

export async function generateStaticParams() {
  const games = await fetch(`${process.env.API_URL}/games`).then((res) => res.json());
  return games.map((game: Game) => ({
    id: game.id.toString(),
  }))
}

export default async function Page({ params }: { params: { id: number } }) {
  const game = await getGameWithTeamName(params.id);

  return (
    <main className="items-center w-screen h-screen flex justify-center">
      <GameCell data={game} expandable={false} />
    </main>
  );
}
