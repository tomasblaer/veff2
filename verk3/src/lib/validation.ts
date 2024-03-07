import { NextFunction, Request, Response } from "express";
import { checkSchema, validationResult } from "express-validator";
import { createGameSchema, createTeamSchema, updateGameSchema, updateTeamSchema } from "./schemas.js";

export async function validateTeam(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const reqType = req.method;
  if (reqType === "POST") {
    await checkSchema(createTeamSchema).run(req);
  } else if (reqType === "PATCH") {
    await checkSchema(updateTeamSchema).run(req);
  }
  // Else 404Handler handles else case

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = errors.array().reduce((acc, cur, index) => {
      acc[index] = cur.msg;
      return acc;
    }, {} as Array<string>);
    return res.status(400).json({ errors: err });
  }

  next();
}

export async function validateGame(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const reqType = req.method;
  if (reqType === "POST") {
    await checkSchema(createGameSchema).run(req);
  } else if (reqType === "PATCH") {
    await checkSchema(updateGameSchema).run(req);
  }
  // Else 404Handler handles else case

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = errors.array().reduce((acc, cur, index) => {
      acc[index] = cur.msg;
      return acc;
    }, {} as Array<string>);
    return res.status(400).json({ errors: err });
  }

  next();
}
