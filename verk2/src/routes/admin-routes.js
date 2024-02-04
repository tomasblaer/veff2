import express from 'express';
import passport from 'passport';
import moment from 'moment';
import { getGames, getTeams } from '../lib/db.js';

export const adminRouter = express.Router();

async function indexRoute(req, res) {
  return res.render('login', {
    title: 'Innskráning',
  });
}

async function adminRoute(req, res) {
  const user = req.user ?? null;
  const loggedIn = req.isAuthenticated();
  const games = await getGames(true);
  const teams = await getTeams();

  return res.render('admin', {
    title: 'Admin upplýsingar, mjög leynilegt',
    user,
    loggedIn,
    time: new Date().toISOString(),
    games,
    teams,
  });
}

async function registerGame(req, res) {
  // eslint-disable-next-line no-unused-vars, camelcase
  const { date, home, away, home_score, away_score } = req.body;
  if (
    !moment(date).isValid() ||
    moment(date).isBefore(moment().subtract(2,'months')) ||
    moment(date).isAfter(moment())) {
    return res.status(400).send('Dagsetning fyrir leik er ekki á réttu sniði');
  }
  return res.send('Leikur skráður');
}

// TODO færa á betri stað
// Hjálpar middleware sem athugar hvort notandi sé innskráður og hleypir okkur
// þá áfram, annars sendir á /login
function ensureLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
}

adminRouter.get('/login', indexRoute);
adminRouter.get('/admin', ensureLoggedIn, adminRoute);
adminRouter.post('/admin', ensureLoggedIn, registerGame);
adminRouter.post(
  '/login',

  // Þetta notar strat að ofan til að skrá notanda inn
  passport.authenticate('local', {
    failureMessage: 'Notandanafn eða lykilorð vitlaust.',
    failureRedirect: '/login',
  }),

  // Ef við komumst hingað var notandi skráður inn, senda á /admin
  (req, res) => {
    res.redirect('/admin');
  },
);
