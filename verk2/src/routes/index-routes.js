import express from 'express';

export const indexRouter = express.Router();

// Mock data
const games = [
  {
    'home': {
      'name': 'Sigurliðið',
      'score': 2
    },
    'away': {
      'name': 'Framherjarnir',
      'score': 3
    }
  },
  {
    'home': {
      'name': 'Vinningshópurinn',
      'score': 5
    },
    'away': {
      'name': 'Risaeðlurnar',
      'score': 1
    }
  },
  {
    'home': {
      'name': 'Boltaliðið',
      'score': 5
    },
    'away': {
      'name': 'Dripplararnir',
      'score': 2
    }
  },
  {
    'home': {
      'name': 'Fljótu fæturnir',
      'score': 3
    },
    'away': {
      'name': 'Hraðaliðið',
      'score': 3
    }
  }];

async function indexRoute(req, res) {
  return res.render('index', {
    title: 'Forsíða',
    time: new Date().toISOString(),
  });
}

async function leikirRoute(req, res) {
  // Todo: pgsql get
  return res.render('leikir', {
    title: 'Leikir',
    time: new Date().toISOString(),
    games
  });
}

async function stadaRoute(req, res) {
  return res.render('stada', {
    title: 'Staðan',
    time: new Date().toISOString(),
  });
}

indexRouter.get('/', indexRoute);
indexRouter.get('/leikir', leikirRoute);
indexRouter.get('/stada', stadaRoute);
