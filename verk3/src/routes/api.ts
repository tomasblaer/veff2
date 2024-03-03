import express, { Request, Response } from "express";
import {
  createTeam,
  deleteTeam,
  getTeam,
  listTeams,
  updateTeam,
} from "./teams.js";
import {
  createGame,
  deleteGame,
  getGame,
  listGames,
  updateGame,
} from "./games.js";

export const router = express.Router();

export async function index(req: Request, res: Response) {
  return res.json([
    {
      href: "/teams",
      methods: ["GET", "POST"],
    },
    {
      href: "/teams/:slug",
      methods: ["GET", "PATCH", "DELETE"],
    },
    {
      href: "/games",
      methods: ["GET", "POST"],
    },
    {
      href: "/games/:id",
      methods: ["GET", "PATCH", "DELETE"],
    },
  ]);
}

router.get("/", index);

/* Team routes */

router.get("/teams", listTeams);
router.post("/teams", createTeam);
router.get("/teams/:slug", getTeam);
router.patch("/teams/:slug", updateTeam);
router.delete("/teams/:slug", deleteTeam);

/* Game routes */

router.get("/games", listGames);
router.post("/games", createGame);
router.get("/games/:id", getGame);
router.patch("/games/:id", updateGame);
router.delete("/games/:id", deleteGame);
