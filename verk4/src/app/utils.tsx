import { cache } from 'react';

export const getTeams = cache(async () => {
  console.log(process.env.API_URL);
  const res = await fetch(`${process.env.API_URL}/teams`);
  const json = await res.json();
  return json;
})

export const getGame = cache(async (id: number) => {
  const res = await fetch(`${process.env.API_URL}/games/${id}`);
  const json = await res.json();
  return json;
})