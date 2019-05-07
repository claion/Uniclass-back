import express from 'express';
const router = express.Router();
import {signup} from '../controllers/userController';

router.post('/signup', signup); // /users/signup

// 로그인 한 상태인지 확인하는 미들웨어 쓸 필요가 있나?

// api 서버 => 세션 없애고, credentials를 매 요청마다 공급받아야 함

export default router;
