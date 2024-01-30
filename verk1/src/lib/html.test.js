import { describe, expect, it } from '@jest/globals';
import moment from 'moment';
import { readFilesFromDir } from './file';
import {
  generateBoilerplate, generateIndex, generateLeikir, generateStada, getGameForDate
} from './html';
import { parseGamedays } from './json';

const OUTPUT_FILES =
  {
    'index.html': generateIndex,
    'leikir.html': generateLeikir,
    'stada.html': generateStada
  };

describe('html', () => {
  describe('generateBoilerplate', () => {
    it('returns generified html structure', async () => {
      let result = true;
      const gamedayData = await readFilesFromDir('./data');
      for (let i = 0 ; i < Object.keys(OUTPUT_FILES).length ; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const res = await generateBoilerplate(
          Object.keys(OUTPUT_FILES)[i], Object.values(OUTPUT_FILES)[i], gamedayData
          );
        if (!(res.includes('<!DOCTYPE html>') && res.includes(Object.keys(OUTPUT_FILES)[i]))) {
          result = false;
        }
      }
      expect(result).toBe(true);
    });
  });

  describe('getGameForDate', () => {
    it('returns gameday info for corresponding momentjs date', async () => {
      const gamedayData = await readFilesFromDir('./data');
      const gamedaysParsed = await parseGamedays(gamedayData);
      const gameForDate = await getGameForDate(moment('2024-01-23T15:20:53.955Z'), gamedaysParsed);
      expect(gameForDate !== null).toBe(true);
    });

    it('returns null if date does not exist in gameday data', async () => {
      const gamedayData = await readFilesFromDir('./data');
      const gamedaysParsed = await parseGamedays(gamedayData);
      const result = await getGameForDate(moment('2021-04-02'), gamedaysParsed);
      expect(result === null).toBe(true);
    });
  });
});
