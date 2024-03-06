import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function generateToken(req: Request, res: Response, next: NextFunction) {
  dotenv.config();

  const secret = getSecretAssert();

  const username = req.body.username;
  if (username === undefined) {
    return res.status(400).json({ error: 'Username is required' });
  }

  const token = jwt.sign( { username: username }, secret, { expiresIn: '30m' });
  return res.json(token);
}

export function getSecretAssert(): string {
  const secret = process.env.TOKEN_SECRET;
  if (secret === undefined) {
    console.error('Token secret is not defined');
    process.exit(1);
  }
  return secret;
}