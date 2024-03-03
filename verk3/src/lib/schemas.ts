import { Schema } from "express-validator";

export const createTeamSchema: Schema = {
  name: {
    in: ["body"],
    optional: false,
    isLength: {
      options: { min: 1 },
      errorMessage: "Name is required",
      bail: true,
    },
    isString: {
      errorMessage: "Name must be a string",
      bail: true,
    },
    escape: true,
  },
  description: {
    in: ["body"],
    optional: true,
    escape: true,
  },
};

export const updateTeamSchema: Schema = {
  name: {
    in: ["body"],
    optional: true,
    isLength: {
      options: { min: 1 },
      errorMessage: "Name cannot be empty",
      bail: true,
    },
    isString: {
      errorMessage: "Name must be a string",
      bail: true,
    },
    escape: true,
  },
  description: {
    in: ["body"],
    optional: true,
    escape: true,
  },
};

export const createGameSchema: Schema = {
  home: {
    in: ["body"],
    optional: false,
    isInt: {
      options: { min: 1 },
      errorMessage: "Home team id is required",
    },
    toInt: true,
  },
  away: {
    in: ["body"],
    optional: false,
    isInt: {
      options: { min: 1 },
      errorMessage: "Away team id is required",
    },
    toInt: true,
  },
  homeScore: {
    in: ["body"],
    optional: false,
    isInt: {
      options: { min: 0 },
      errorMessage: "Home score must be a number",
    },
    toInt: true,
  },
  awayScore: {
    in: ["body"],
    optional: false,
    isInt: {
      options: { min: 0 },
      errorMessage: "Away score must be a number",
    },
    toInt: true,
  },
  date: {
    in: ["body"],
    optional: false,
    isISO8601: {
      errorMessage: "Date must be a valid ISO 8601 date (YYYY-MM-DD HH:MM:SS)",
    },
    toDate: true,
  },
};

export const updateGameSchema: Schema = {
  home: {
    in: ["body"],
    optional: true,
    isInt: {
      options: { min: 1 },
      errorMessage: "Home team id must be a number",
    },
    toInt: true,
  },
  away: {
    in: ["body"],
    optional: true,
    isInt: {
      options: { min: 1 },
      errorMessage: "Away team id must be a number",
    },
    toInt: true,
  },
  homeScore: {
    in: ["body"],
    optional: true,
    isInt: {
      options: { min: 0 },
      errorMessage: "Home score must be a number",
    },
    toInt: true,
  },
  awayScore: {
    in: ["body"],
    optional: true,
    isInt: {
      options: { min: 0 },
      errorMessage: "Away score must be a number",
    },
    toInt: true,
  },
  date: {
    in: ["body"],
    optional: true,
    isISO8601: {
      errorMessage: "Date must be a valid ISO 8601 date (YYYY-MM-DD HH:MM:SS)",
    },
    toDate: true,
  },
};
