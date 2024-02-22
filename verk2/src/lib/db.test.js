import { describe, expect, it, jest, afterEach, beforeEach }
from '@jest/globals';
import pg from 'pg';
import { insertGame } from './db.js';

jest.mock('pg', () => {
  const mdb = {
    query: jest.fn(),
    connect: jest.fn(),
    release: jest.fn(),
  };
  return { Client: jest.fn(() => mdb) };
});

/*
Þetta er eitthvað super böggað, en vonandi sést að ég viti hvað á að gera
Planið var að mocka clientin og checka köllin á honum en það fer í eitthvað ESM fokk
*/

describe('db', () => {
  let db;
  beforeEach( () => {
    db = new pg.Client();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('allows for insertion of a game', async () => {
    db.query.mockResolvedValueOnce({ rows: [], rowCount: 0 });
    await insertGame([new Date(), 1, 2, 3, 4]);
    expect(db.query).toHaveBeenCalledTimes(1);
    expect(db.query).toHaveBeenCalledWith([expect.any(Date), 1, 2, 3, 4]);
  });
});
