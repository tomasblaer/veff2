import express from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { getGames, getTeams, insertGame, deleteGame, insertUser } from '../lib/db.js';
import { validateGame, validateUser } from '../lib/validation.js';

export const adminRouter = express.Router();

async function indexRoute(req, res) {
  return res.render('login', {
    title: 'Innskráning',
    time: new Date().toISOString(),
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
  const gameIsValid = await validateGame(req.body);
  if (gameIsValid.length > 0) {
    return res.status(400).send(gameIsValid.join(', '));
  }

  try {
    /* eslint-disable camelcase */
    const { date, home, away, home_score, away_score } = req.body;
    await insertGame([date, home, away, home_score, away_score]);

  } catch (error) {
    return res.status(500).send('Villa við að skrá leik');
  }

  return res.redirect('/admin');
}

/*
  Ekki delete mapping þvi eg notaði
  venjulegt HTML form í kallið
*/
async function removeGame(req, res) {
  const { id } = req.query;
  try {
    await deleteGame(id);
    return res.redirect('/admin');
  } catch (error) {
    return res.status(500).send('Villa við að eyða leik');
  }
}

/*
  Gef mér að allir users séu admins þvi að
  schemainu er lyst með engu isAdmin columni
*/
async function createUser(req, res) {
  const { username, password } = req.body;
  const userIsValid = await validateUser(username, password);
  if (userIsValid.length > 0) {
    return res.status(400).send(userIsValid.join(', '));
  }

  try {
    const encryptedPassword = await bcrypt.hash(password, 12);
    await insertUser(username, encryptedPassword);
  } catch (error) {
    return res.status(500).send('Villa við að búa til notanda');
  }
  return res.status(201).send('Notandi vistaður');
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
adminRouter.post('/remove', ensureLoggedIn, removeGame);
adminRouter.post('/user', ensureLoggedIn, createUser);
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

adminRouter.get('/logout', (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
});
