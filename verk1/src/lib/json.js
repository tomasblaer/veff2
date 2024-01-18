import moment from 'moment';
import { readFile } from './file.js';

function isValid(data) {
  return data !== null && Object.prototype.hasOwnProperty.call(data, 'date') &&
   Object.prototype.hasOwnProperty.call(data, 'games') && Array.isArray(data.games) &&
   data.games.length > 0 && moment(data.date).isValid();
}

export async function parseGamedays(data) {
  const gamedayData = [];
  for (const path of data) {
    if (path.includes('gameday')) {
      // Sorry en u gotta do what u gotta do :S
      // eslint-disable-next-line no-await-in-loop
      const res = await readFile(path);
      const gameday = JSON.parse(res);
      if (isValid(gameday)) {
        gamedayData.push(gameday);
      }
    }
  }

  console.log(gamedayData);

  return gamedayData;
}
