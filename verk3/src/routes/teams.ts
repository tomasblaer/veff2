import { Request, Response, NextFunction } from "express";
import {
  getTeams,
  getTeamBySlug,
  insertTeam,
  updateTeamBySlug,
  deleteTeamBySlug,
} from "../lib/db.js";
import { Prisma, teams } from "@prisma/client";
import { validateTeam } from "../lib/validation.js";
import slugify from "slugify";

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

export async function createTeamHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, description } = req.body;

  const team: Prisma.teamsCreateInput = {
    name,
    description,
    slug: slugify(name, { lower: true }),
  };

  let teamInserted: teams | null = null;

  try {
    teamInserted = await insertTeam(team);
  } catch (e) {
    return next(e);
  }

  return res.status(201).json(teamInserted);
}

export async function getTeam(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const { slug } = req.params;
  
  const team = await getTeamBySlug(slug);

  if (!team) {
    return next();
  }

  return res.json(team);
}

export async function updateTeamHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { slug } = req.params;
  const { name, description } = req.body;

  if (!name && !description) {
    return next(
      new Error(
        "Bad Request:No data to update team with, name and/or description required"
      )
    );
  }

  const team: Prisma.teamsUpdateInput = {};
  if (name) {
    team.name = name;
    team.slug = slugify(name, { lower: true });
  }
  if (description) {
    team.description = description;
  }

  let updatedTeam: teams | null = null;

  try {
    updatedTeam = await updateTeamBySlug(slug, team);
  } catch (e) {
    return next(e);
  }

  return res.json(updatedTeam);
}

export async function deleteTeam(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { slug } = req.params;

  let deletedTeam: teams | null = null;

  try {
    deletedTeam = await deleteTeamBySlug(slug);
  } catch (e) {
    return next(e);
  }

  return res.json({ deleted_team: deletedTeam });
}

/* Exports w/ middleware */

export const createTeam = [validateTeam, createTeamHandler].flat();

export const updateTeam = [validateTeam, updateTeamHandler].flat();
