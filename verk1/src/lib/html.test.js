import { describe, expect, it } from '@jest/globals';
import { generateBoilerplate } from './html';

describe('html', () => {
  describe('generateBoilerplate', () => {
    it('returns generified html structure', async () => {
      const result = await generateBoilerplate('index', );
      expect(result).toBe(false);
    });
  });
});
