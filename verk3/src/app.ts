import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import { router } from "./routes/api.js";
import { handle404, handleError } from "./lib/handlers.js";
import { cors } from "./lib/cors.js";
import { expressjwt } from "express-jwt";

const app = express();

dotenv.config();

app.use(express.json());
app.use(router);
app.use(cors)

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

app.use(handle404);

app.use(handleError);
