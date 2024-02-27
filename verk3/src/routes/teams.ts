import { Request, Response, NextFunction } from "express";
import { getTeams, getTeamBySlug, insertTeam } from "../lib/db2.js";
import { Prisma, teams } from "@prisma/client";

export async function listTeams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const teams = await getTeams();

  if (!teams) {
    return next(new Error("unable to get teams"));
  }

  return res.json(teams);
}

export async function createTeam(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(req);
  let team: teams | null = null;

  try {
    team = await insertTeam(req.body);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return res
          .status(400)
          .json({ error: 'A team with that name already exists' });
      }
    }
  }

  return res.json(team);
}

export async function getTeam(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const { slug } = req.params;
  console.log(slug);
  const team = await getTeamBySlug(slug);

  if (!team) {
    return next(new Error(`unable to get team ${slug}`));
  }

  return res.json(team);
}
