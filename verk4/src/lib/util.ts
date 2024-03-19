import { Game } from "./types";

export function sortGamesByDate(games: Game[]) {
    return games.sort((a, b) => {
      return a.date > b.date ? 1 : -1;
    });
}