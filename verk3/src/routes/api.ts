import express, { Request, Response, NextFunction } from 'express';
import { createTeam, getTeam, listTeams } from './teams.js';

export const router = express.Router();

export async function index(req: Request, res: Response) {
  return res.json([
    {
      href: '/teams',
      methods: ['GET', 'POST'],
    },
    {
      href: '/teams/:slug',
      methods: ['GET', 'PATCH', 'DELETE'],
    },
    {
      href: '/games',
      methods: ['GET', 'POST'],
    },
    {
      href: '/games/:id',
      methods: ['GET', 'PATCH', 'DELETE'],
    },
  ]);
}

router.get('/', index);
router.get('/teams', listTeams);
router.post('/teams', createTeam);
router.get('/teams/:slug', getTeam);
