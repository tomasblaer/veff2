import { Request, Response, NextFunction } from 'express';
import { getTeams } from '../lib/db.js';

export async function listTeams(req: Request, res: Response, next: NextFunction) {
  const teams = await getTeams();

  if (!teams) {
    return next(new Error('unable to get teams'));
  }

  return res.json(teams);
}