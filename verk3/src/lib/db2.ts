import { PrismaClient, Prisma, teams } from "@prisma/client";

const prisma = new PrismaClient({
  errorFormat: 'minimal',
});

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

export async function insertTeam(data: Prisma.teamsCreateInput): Promise<teams> {

  const team = await prisma.teams.create({ data });
  
  return team ?? null;
}

export async function updateTeamBySlug(slug: string, data: Prisma.teamsUpdateInput): Promise<teams | null> {

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
