import express from 'express';
const router = express.Router();
import tableRouter from './tables';
import authRouter from './auth';
import userRouter from './user';
import passport from 'passport';

//internal router, external router, profile router? 추가 예정
/* GET home page. */

router.use('/auth', authRouter);
router.use(
  '/users',
  passport.authenticate('jwt', { session: false }),
  userRouter
);
router.use('/tables', tableRouter);

export default router;
