import express from 'express';
import { getGames, getStanding } from '../lib/db.js';

export const indexRouter = express.Router();

async function indexRoute(req, res) {
  const user = req.user ?? null;
  const loggedIn = req.isAuthenticated();

  return res.render('index', {
    title: 'FootyTracker',
    time: new Date().toISOString(),
    user,
    loggedIn,
  });
}

async function leikirRoute(req, res) {
  const games = await getGames(true);
  const user = req.user ?? null;
  const loggedIn = req.isAuthenticated();

  return res.render('leikir', {
    title: 'Leikir',
    time: new Date().toISOString(),
    games,
    user,
    loggedIn,
  });
}

async function stadaRoute(req, res) {
  const standing = await getStanding();
  const user = req.user ?? null;
  const loggedIn = req.isAuthenticated();

  return res.render('stada', {
    title: 'Staðan',
    time: new Date().toISOString(),
    standing,
    user,
    loggedIn,
  });
}

indexRouter.get('/', indexRoute);
indexRouter.get('/leikir', leikirRoute);
indexRouter.get('/stada', stadaRoute);
