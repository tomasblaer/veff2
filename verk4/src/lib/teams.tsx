"use server";

import { fetchWithToken } from "./fetch";
import { Team } from "./types";

export async function getTeams(): Promise<Team[]> {
  const res = await fetchWithToken(`${process.env.API_URL}/teams`, {
    next: { tags: ["teams"] },
  });
  const json = await res.json();
  return json;
}
