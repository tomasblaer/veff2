import dotenv from 'dotenv';
import express, { Request, Response, NextFunction} from 'express';
import { router } from './routes/api.js';
import { handle404, handleError } from './lib/handlers.js';

const app = express();

dotenv.config()

app.use(express.json());

app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

app.use(handle404);

app.use(handleError);
