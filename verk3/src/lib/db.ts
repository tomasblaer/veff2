import { PrismaClient, Prisma, teams, games } from "@prisma/client";

const prisma = new PrismaClient({
  errorFormat: "minimal",
});

/* Teams */

export async function getTeams(): Promise<teams[] | null> {
  const teams = await prisma.teams.findMany();
  return teams ?? null;
}

export async function getTeamBySlug(slug: string): Promise<teams | null> {
  const team = await prisma.teams.findUnique({
    where: { slug },
  });
  return team ?? null;
}

export async function insertTeam(
  data: Prisma.teamsCreateInput
): Promise<teams> {
  const team = await prisma.teams.create({ data });

  return team ?? null;
}

export async function updateTeamBySlug(
  slug: string,
  data: Prisma.teamsUpdateInput
): Promise<teams | null> {
  const team = await prisma.teams.update({
    where: { slug },
    data,
  });

  return team ?? null;
}

export async function deleteTeamBySlug(slug: string): Promise<teams | null> {
  const team = await prisma.teams.delete({
    where: { slug },
  });

  return team ?? null;
}

/* Games */

export async function getGames(): Promise<games[] | null> {
  const games = await prisma.games.findMany();
  return games ?? null;
}

export async function insertGame(
  data: Prisma.gamesUncheckedCreateInput
): Promise<games | null> {
  const game = await prisma.games.create({ data });

  return game ?? null;
}

export async function getGameById(id: number): Promise<games | null> {
  const game = await prisma.games.findUnique({
    where: { id },
  });

  return game ?? null;
}

export async function updateGameById(
  id: number,
  data: Prisma.gamesUpdateInput
): Promise<games | null> {
  const game = await prisma.games.update({
    where: { id },
    data,
  });

  return game ?? null;
}

export async function deleteGameById(id: number): Promise<games | null> {
  const game = await prisma.games.delete({
    where: { id },
  });

  return game ?? null;
}
