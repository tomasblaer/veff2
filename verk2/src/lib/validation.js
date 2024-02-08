import moment from 'moment';
import { getTeams } from './db.js';
import { findByUsername } from './users.js'
/* eslint-disable camelcase */

export async function validateGame(game) {
  const gameKeys = ['date', 'home', 'away', 'home_score', 'away_score'];
  const errors = [];

  const bodyIsValid = gameKeys.every((key) => Object.prototype.hasOwnProperty.call(game, key));

  if (!bodyIsValid) {
    errors.push('Payload body not valid');
    return errors;
  }

  const { date, home, away, home_score, away_score } = game;
  const teams = await getTeams();

  if (!teams.find((team) => team.id === parseInt(home,10))) {
    errors.push('Heimalið er ekki til');
  }

  if (!teams.find((team) => team.id === parseInt(away,10))) {
    errors.push('Útilið er ekki til');
  }

  if (!moment(date).isValid()) {
    errors.push('Dagsetning er ekki á réttu formi');
  } else if (moment(date).isBefore(moment().subtract(2,'months'))) {
    errors.push('Dagsetning má ekki vera meira en 2 mánuði aftur í tímann');
  } else if (moment(date).isAfter(moment())) {
    errors.push('Dagsetning má ekki vera í framtíðinni');
  }

  if (home === away) {
    errors.push('Heimalið og útilið mega ekki vera sama lið');
  }
  if (home_score < 0 || away_score < 0) {
    errors.push('Stig mega ekki vera neikvæð');
  }
  if (home_score.includes('.') || away_score.includes('.')) {
    errors.push('Stig mega ekki vera kommutölur');
  }
  return errors;
}

export async function validateUser(username, password) {
  const errors = [];
  const found = await findByUsername(username);
  if (found) {
    errors.push('Notendanafn er í notkun');
  }
  if (username.length < 3) {
    errors.push('Notendanafn verður að vera að minnsta kosti 3 stafir');
  }
  if (password.length < 6) {
    errors.push('Lykilorð verður að vera að minnsta kosti 6 stafir');
  }
  return errors;
}
