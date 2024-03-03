import { NextFunction, Response, Request } from "express";
import { deleteGameById, getGameById, getGames, insertGame, updateGameById } from "../lib/db.js";
import { validateGame } from "../lib/validation.js";
import { Prisma, games } from "@prisma/client";

export async function listGames(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const games = await getGames();

  if (!games) {
    return next(new Error("Unable to get games"));
  }

  return res.json(games);
}

export async function createGameHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const { home, away, homeScore, awayScore, date } = req.body;

  if (home === away) {
    return next(
      new Error("Bad Request:Home and away teams cannot be the same")
    );
  }

  const game: Prisma.gamesUncheckedCreateInput = {
    home,
    away,
    homeScore,
    awayScore,
    date,
  };

  let gameInserted: games | null = null;

  try {
    gameInserted = await insertGame(game);
  } catch (e) {
    return next(e);
  }

  return res.status(201).json(gameInserted);
}

export async function getGame(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const { id } = req.params;

  const game = await getGameById(parseInt(id, 10));

  if (!game) {
    return next();
  }

  return res.json(game);
}

export async function updateGameHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const { id } = req.params;
  const { home, away, homeScore, awayScore, date } = req.body;

  if (!home && !away && !homeScore && !awayScore && !date) {
    return next(
      new Error(
        "Bad Request:No data to update game with at least one of: home, away, homeScore, awayScore, date required"
      )
    );
  } else if (home === away) {
    return next(
      new Error("Bad Request:Home and away teams cannot be the same")
    );
  }

  const game: Prisma.gamesUncheckedUpdateInput = {
    home,
    away,
    homeScore,
    awayScore,
    date,
  };

  let gameUpdated: games | null = null;

  try {
    gameUpdated = await updateGameById(parseInt(id, 10), game);
  } catch (e) {
    return next(e);
  }

  return res.json(gameUpdated);
}

export async function deleteGame(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const { id } = req.params;

  let gameDeleted: games | null = null;

  try {
    gameDeleted = await deleteGameById(parseInt(id, 10));
  } catch (e) {
    return next(e);
  }

  return res.json({ deleted_game: gameDeleted });
}

/* Exports w/ middleware */

export const createGame = [validateGame, createGameHandler].flat();
export const updateGame = [validateGame, updateGameHandler].flat();
