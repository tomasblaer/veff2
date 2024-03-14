import { fetchWithToken } from "./fetch";

export async function getTeams() {
  const res = await fetchWithToken(`${process.env.API_URL}/teams`, { next: { tags: ["teams"] } });
  const json = await res.json();
  return json;
}