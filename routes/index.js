import express from 'express';
const router = express.Router();
import userRouter from './users'
/* GET home page. */
router.post('/users', userRouter);

export default router;