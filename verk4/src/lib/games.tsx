'use server'

import moment from "moment";
import { fetchWithToken } from "./fetch";
import { getTeams } from "./teams";
import { Game, Team } from "./types";
import { revalidateTag } from "next/cache";

export async function getGames(mapTeamNames = false): Promise<Array<Game> | null> {
  const res = await fetchWithToken(`${process.env.API_URL}/games`, { next: { tags: ["games"] } });
  let json = await res.json();
  if (json.hasOwnProperty("error")) {
    return null;
  }

  if (mapTeamNames && !json.hasOwnProperty("error")) {
    json = await gamesTeamNameMapper(json);
  }
  return json;
}

export async function getGame(id: number, mapTeamNames = false): Promise<Game | null> {
  const res = await fetchWithToken(`${process.env.API_URL}/games/${id}`, { next: { tags: ["games"] } });
  let json = await res.json();
  if (json.hasOwnProperty("error")) {
    return null;
  }

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

  game.homeName = homeTeam!.name;
  game.awayName = awayTeam!.name;

  return game;
}

export async function gamesTeamNameMapper(games: Array<Game>) {
  const teams = await getTeams();

  return games.map((game: Game) => {
    const homeTeam = teams.find((team: Team) => team.id === game.home);
    const awayTeam = teams.find((team: Team) => team.id === game.away);

    game.homeName = homeTeam!.name;
    game.awayName = awayTeam!.name;

    return game;
  });
}

export async function getAllGameDates(sorted = false) {
  const games = await getGames();
  const dates: string[] = []
  games!.forEach((game: Game) => {
    const date = moment(game.date).format("YYYY-MM-DD");
    if (!dates.includes(date.toString())) {
      dates.push(date.toString());
    }
  });
  if (sorted) {
    dates.sort((a, b) => {
      return a > b ? 1 : -1;
    });
  }
  return dates;
}

export async function updateGame(game: Game) {
  const res = await fetchWithToken(`${process.env.API_URL}/games/${game.id}`, {
    next: { tags: ["games"] },
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  });
  revalidateTag("games");

  return res.json();
}

export async function deleteGame(id: number) {
  console.log(id);
  const res = await fetchWithToken(`${process.env.API_URL}/games/${id}`, {
    next: { tags: ["games"] },
    method: "DELETE",
  });
  revalidateTag("games");
  return res.json();
}