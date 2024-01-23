import moment from 'moment';
import { readFile } from './file.js';

function teamsIsValid(validTeams, gameday) {

  Object.keys(gameday.games).forEach((gameKey) => {
    if (!validTeams.includes(gameday.games[gameKey].home.name) ||
     !validTeams.includes(gameday.games[gameKey].away.name)) {
      delete gameday.games[gameKey];
    }
  });

  return gameday;
}

function isValid(data) {
  return data !== null && Object.prototype.hasOwnProperty.call(data, 'date') &&
   Object.prototype.hasOwnProperty.call(data, 'games') && Array.isArray(data.games) &&
   data.games.length > 0 && moment(data.date).isValid();
}

export async function parseGamedays(data) {
  const gamedayData = [];
  let legalTeams = await readFile('./data/teams.json');
  legalTeams = JSON.parse(legalTeams);

  for (const path of data) {
    if (path.includes('gameday')) {
      // Sorry en u gotta do what u gotta do :S
      // eslint-disable-next-line no-await-in-loop
      const res = await readFile(path);
      const gameday = JSON.parse(res);
      if (isValid(gameday)) {
        gamedayData.push(teamsIsValid(legalTeams ,gameday));
      }
    }
  }

  const dateArray = [];
  gamedayData.forEach((gameday) => {
    dateArray.push(moment(gameday.date));
  });

  const sortedArray = dateArray.sort((a,b) => a.diff(b));

  gamedayData.sortedDates = sortedArray

  return gamedayData;
}
