import express from 'express';
const router = express.Router();

import { signup, login, findId, resetPassword, sendEmailToken } from '../controllers/authController';
import { verifyEmailToken } from './middlewares'

/**
 * @body username, password, email, name
 */
router.post('/signup', signup); // /auth/signup

router.post('/login', login); // /auth/login

router.post('/find_id', findId); // /auth/find_id


/**
 * @body name, email, username
 */
router.post('/forgot_pw', sendEmailToken); // /auth/forgot_pw

/**
 * @body email, username, token
 */
router.post('/reset_pw', verifyEmailToken, resetPassword); // /auth/reset_pw

// cors 문제가 생길 수 있음

// 로그인 한 상태인지 확인하는 미들웨어 쓸 필요가 있나?

// api 서버 => 세션 없애고, credentials를 매 요청마다 공급받아야 함

export default router;