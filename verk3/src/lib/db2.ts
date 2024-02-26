import { PrismaClient, Prisma, teams } from "@prisma/client";

const prisma = new PrismaClient();

export async function getTeams(): Promise<teams[]> {
  const teams = await prisma.teams.findMany();
  return teams ?? null;
}

export async function getTeamBySlug(slug: string) {
  const team = await prisma.teams.findUnique({
    where: { slug },
  });
  return team ?? null;
}
