import express from 'express';
import { getGames, getStanding } from '../lib/db.js';

export const indexRouter = express.Router();

async function indexRoute(req, res) {
  return res.render('index', {
    title: 'Forsíða',
    time: new Date().toISOString(),
  });
}

async function leikirRoute(req, res) {
  const games = await getGames(true);
  return res.render('leikir', {
    title: 'Leikir',
    time: new Date().toISOString(),
    games,
  });
}

async function stadaRoute(req, res) {
  const standing = await getStanding();
  return res.render('stada', {
    title: 'Staðan',
    time: new Date().toISOString(),
    standing,
  });
}

indexRouter.get('/', indexRoute);
indexRouter.get('/leikir', leikirRoute);
indexRouter.get('/stada', stadaRoute);
