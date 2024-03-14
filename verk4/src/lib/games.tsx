import { fetchWithToken } from "./fetch";
import { getTeams } from "./teams";
import { Game, Team } from "./types";

export async function getGames(mapTeamNames = false): Promise<Array<Game>> {
  const res = await fetchWithToken(`${process.env.API_URL}/games`, { next: { tags: ["games"] } });
  let json = await res.json();
  if (mapTeamNames) {
    json = await gamesTeamNameMapper(json);
  }
  return json;
}

export async function getGame(id: number, mapTeamNames = false) {
  const res = await fetchWithToken(`${process.env.API_URL}/games/${id}`, { next: { tags: ["games"] } });
  let json = await res.json();
  if (mapTeamNames) {
    json = await gameTeamNameMapper(json);
  }
  return json;
}

export async function gameTeamNameMapper(gameData: Game) {
  const teamsData = getTeams();

  const [game, teams] = await Promise.all([gameData, teamsData]);

  const homeTeam = teams.find((team: Team) => team.id === game.home);
  const awayTeam = teams.find((team: Team) => team.id === game.away);

  game.home = homeTeam.name;
  game.away = awayTeam.name;

  return game;
}

export async function gamesTeamNameMapper(games: Array<Game>) {
  const teams = await getTeams();

  return games.map((game: Game) => {
    const homeTeam = teams.find((team: Team) => team.id === game.home);
    const awayTeam = teams.find((team: Team) => team.id === game.away);

    game.home = homeTeam.name;
    game.away = awayTeam.name;

    return game;
  });
}