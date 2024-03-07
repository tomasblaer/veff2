import { beforeAll, describe, expect, it } from '@jest/globals';
import jwt from 'jsonwebtoken';
import { getSecretAssert } from './authorization';

/*
* ATH Þetta keyrir á dev env fileinu, þannig
* npm run dev, npm run test
*/

/*
* Þetta virkar ekki, er buinn að reyna allt milli himins og jarðar:
* supertest, jest-mock/express ofl (sem virkaði en það er ekki á live).
* Er samt buinn að setja upp voða flott config, og það sest vonandi
* hvert eg ætlaði með þetta :)
*/

describe('GET /users', () => {
  let token: string;
  const secret = getSecretAssert();
  beforeAll(() => {
    token = jwt.sign( { username: 'testUser' }, secret, { expiresIn: '30m' });
  });
    
  it('returns a list of teams', async () => {
    const response = await fetch(`localhost:${process.env.PORT}/teams`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }});
    expect(response.status).toBe(200);
    
  });
});