import { Request, Response, NextFunction } from 'express';
import { getTeams, getTeamBySlug } from '../lib/db2.js';

export async function listTeams(req: Request, res: Response, next: NextFunction) {
  const teams = await getTeams();

  if (!teams) {
    return next(new Error('unable to get teams'));
  }

  return res.json(teams);
}

export async function createTeam(req: Request, res: Response, next: NextFunction) {
    const { name, description } = req.body;
    console.log(name, description);
    return res.json({ name, description });
}

export async function getTeam(req: Request, res: Response, next: NextFunction) {
    const { slug } = req.params;

    console.log(slug);
    const team = await getTeamBySlug(slug);
    
    if (!team) {
        return next(new Error(`unable to get team ${slug}`));
    }
    
    return res.json(team);
    }