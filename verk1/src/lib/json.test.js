import { describe, expect, it } from '@jest/globals';
import _ from 'lodash';
import { readFile, readFilesFromDir } from './file';
import { isValid, parseGamedays, teamsIsValid } from './json';

describe('json', () => {
  describe('parseGamedays', () => {
    it('returns object with sortedDates and multiple game objects from valid JSON', async () => {
      const gamedayData = await readFilesFromDir('./data');
      const gamedaysParsed = await parseGamedays(gamedayData);
      expect(gamedaysParsed).toHaveProperty('sortedDates');
    });
  });

  describe('isValid', () => {
    it('returns true for gameday-esque structured data', async () => {
      // Valid gameday
      const gamedayData = await readFile('./data/gameday-nxl3.json');
      const gamedayValidity = await isValid(JSON.parse(gamedayData));

      expect(gamedayValidity).toBe(true);
    });
    it('returns false for invalid data', async () => {
      // Invalid gameday
      const gamedayData = await readFile('./data/gameday-b8kx.json');
      const gamedayValidity = await isValid(JSON.parse(gamedayData));

      expect(gamedayValidity).toBe(false);
    });
  });

  describe('teamsIsValid', () => {
    it('strips object of matches where team name not in teams.json', async () => {
      // Gameday containing match with team not in teams.json
      const gamedayData = await readFile('./data/gameday-9xnf.json');
      const validTeams = await readFile('./data/teams.json');
      const res = teamsIsValid(JSON.parse(validTeams), JSON.parse(gamedayData));
      expect(_.isEqual(res,JSON.parse(gamedayData))).toBe(false);
    });
  });
});
