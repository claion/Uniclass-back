import express from 'express';
const router = express.Router();

import {getProfile} from '../controllers/userController'

router.get('/profile', getProfile);

export default router;