import express from 'express';
const router = express.Router();
import authRouter from './auth';
import userRouter from './user';
import passport from 'passport';

/* GET home page. */
router.use('/auth', authRouter);
router.use('/users', passport.authenticate('jwt', {session: false}), userRouter)

export default router;
