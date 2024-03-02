import { NextFunction, Request, Response } from "express";
import { Schema, check, checkSchema, validationResult } from "express-validator";

const createTeamSchema: Schema = {
  name: {
    in: ['body'],
    optional: false,
    isLength: {
      options: { min: 1 },
      errorMessage: 'Name is required',
      bail: true
    },
    isString: {
      errorMessage: 'Name must be a string',
      bail: true
    },
    escape: true,
  },
  description: {
    in: ['body'],
    optional: true,
    escape: true,
  }
};

const updateTeamSchema: Schema = {
  name: {
    in: ['body'],
    optional: true,
    isLength: {
      options: { min: 1 },
      errorMessage: 'Name cannot be empty',
      bail: true
    },
    isString: {
      errorMessage: 'Name must be a string',
      bail: true
    },
    escape: true,
  },
  description: {
    in: ['body'],
    optional: true,
    escape: true,
  }
};

export async function validateTeam(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>> {
  const reqType = req.method;
  if (reqType === 'POST') {
    await checkSchema(createTeamSchema).run(req);
  } else if (reqType === 'PATCH') {
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