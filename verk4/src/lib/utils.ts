import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Game } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sortGamesByDate(games: Game[]) {
  return games.sort((a, b) => {
    return a.date > b.date ? 1 : -1;
  });
}
