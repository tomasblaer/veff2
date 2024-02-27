import { PrismaClient, Prisma, teams } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

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
  if (!data.slug) {
    data.slug = slugify(data.name, { lower: true });
  }
  const team = await prisma.teams.create({ data });
  
  return team;
}
