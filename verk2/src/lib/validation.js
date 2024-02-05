import moment from 'moment';
import { getTeams } from './db.js';
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
    errors.push('Home team does not exist');
  }

  if (!teams.find((team) => team.id === parseInt(away,10))) {
    errors.push('Away team does not exist');
  }

  if (!moment(date).isValid()) {
    errors.push('Date is not valid');
  } else if (moment(date).isBefore(moment().subtract(2,'months'))) {
    errors.push('Date cannot be more than two months in the past');
  } else if (moment(date).isAfter(moment())) {
    errors.push('Date cannot be in the future');
  }

  if (home === away) {
    errors.push('Home and away teams cannot be the same');
  }
  if (home_score < 0 || away_score < 0) {
    errors.push('Scores cannot be negative');
  }
  return errors;
}
