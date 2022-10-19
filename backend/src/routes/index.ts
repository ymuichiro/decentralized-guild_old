import { Router } from 'express';
import userRouter from './user_router';
import authRouter from './auth-router';

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/users', userRouter);
baseRouter.use('/auth', authRouter);

// Export default.
export default baseRouter;
