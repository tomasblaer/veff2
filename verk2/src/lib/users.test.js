import { describe, jest,it, expect } from "@jest/globals";
import { comparePasswords, findById, findByUsername } from "./users";

describe('users', () => {
  it('checks for passwords', async () => {
    const res1 = await comparePasswords(
      '123', { password: '$2a$12$1IbjgvHLnuez6LonEVJ6quFz9kmHE2H8UrPVftc.Gcl1kJb869oUS'}
      );
    const res2 = await comparePasswords(
      '123', { password: '123'}
      );
    expect(res1).not.toBe(false);
    expect(res2).toBe(false);
  });
  it('checks for users', async () => {
    const findByUsername = jest.fn();
    const res = await findByUsername('admin');
    expect(findByUsername).toHaveBeenCalledTimes(1);
  });
});
