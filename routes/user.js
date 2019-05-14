import express from 'express';
const router = express.Router();

import {isNotCertificate} from './middlewares';
import {getProfile, certificate} from '../controllers/userController'

router.get('/profile', getProfile);
router.post('/cerification', isNotCertificate, certificate);
export default router;