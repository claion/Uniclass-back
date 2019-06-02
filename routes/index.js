import express from 'express';
const router = express.Router();
import userRouter from './users';
import timeTableRouter from './timeTables';

/* GET home page. */
router.use('/users', userRouter);
router.use('/tables', timeTableRouter);
// to do : internal router, external router, profile? router  

export default router;