import express from 'express';
const router = express.Router();

import { users } from './routes';
import { verifyEmailToken } from './middlewares';
import {
  getProfile,
  sendToken,
  certificateUser
} from '../controllers/userController';

router.get(users.PROFILE, getProfile);
router.post(users.SEND_TOKEN, sendToken);
router.post(users.CERTIFICATION, verifyEmailToken, certificateUser);

export default router;
