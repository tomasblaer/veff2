import { readFile } from './file.js';

export async function parseGamedays(data) {
  const gamedayData = [];
  for (const path of data) {
    if (path.includes('gameday')) {
      const res = await readFile(path);
      const gameday = JSON.parse(res);
      gamedayData.push(gameday);
    }
  }
  return gamedayData;
}
