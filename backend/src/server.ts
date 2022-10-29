import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import StatusCodes from 'http-status-codes';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import baseRouter from './routes/index';
import logger from 'jet-logger';
import cors from 'cors';

import { CustomError } from './services/Errors';

// Constants
const app = express();

/* ******************************************************************************** *
 *                                  Set basic express settings
 * ******************************************************************************** */

// Common middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Security (helmet recommended in express docs)
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

/* ******************************************************************************* *
 *                                  Set Router
 * ******************************************************************************* */

// Add api router
app.use('/api', baseRouter);

// Set static dir
const staticDir = path.join(__dirname, 'views');
app.use(express.static(staticDir));

app.post('*', (_: Request, res: Response) => {
  res.type('application/json').json({ error: '404' });
});

// Serve index.html file
app.get('*', (_: Request, res: Response) => {
  res.sendFile('index.html', { root: staticDir });
});

// Error handling
app.use((err: Error | CustomError, _: Request, res: Response, __: NextFunction) => {
  logger.err(err, true);
  const status = err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST;
  return res.status(status).json({ error: err.message });
});

// Export here and start in a diff file (for testing).
export default app;
