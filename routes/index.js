import express from 'express';
const router = express.Router();
import userRouter from './users';
import tableRouter from './tables';

/* GET home page. */
router.use('/users', userRouter);
router.use('/tables', tableRouter);
//internal router, external router, profile router? 추가 예정


export default router;