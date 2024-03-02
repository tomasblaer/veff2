import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export function handle404(req: Request, res: Response, next: NextFunction): void {
  res.status(404).json({ error: "Not found" });
}

export function handleError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response {

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const postType: string = req.originalUrl.includes('team') ? 'team' : 'game';
    if (err.code === "P2002") {
      return res.status(400).json({ error: `error executing, ${postType} already exists` });
    } else if (err.code === "P2025") {
      return res.status(400).json({ error: `error executing, ${postType} not found` });
    }
  }

  if (
    err instanceof SyntaxError &&
    "status" in err &&
    err.status === 400 &&
    "body" in err
  ) {
    return res.status(400).json({ error: "invalid json" });
  }

  if (err.message.includes("no data")) {
    return res.status(400).json({ error: err.message });
  }

  console.error("error handling route", err);
  return res
    .status(500)
    .json({ error: err.message ?? "internal server error" });
}
