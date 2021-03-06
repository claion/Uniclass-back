import bcrypt from 'bcrypt';
import createError from 'http-errors';
import http from 'http-status-codes';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import nodemailer from 'nodemailer';

import User from '../models/user';
import EmailToken from '../models/emailToken';
import { makeEmailToken, makeEmailContent } from '../utils';
require('dotenv').config();

export const resetPassword = async (req, res, next) => {
  try {
    const {
      body: { email, token }
    } = req;
    const hash = await bcrypt.hash(token, 12);
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { password: hash } }
    );
    res.status(http.OK).json({
      success: true,
      message: '비밀번호가 리셋되었습니다.'
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const sendEmailToken = async (req, res, next) => {
  const {
    body: { name, email, username }
  } = req;
  try {
    const existUser = await User.findOne({ $and: [{ name, email, username }] });
    if (!existUser) {
      res
        .status(http.NOT_ACCEPTABLE)
        .json({ success: false, message: '유저를 찾을 수 없습니다.' });
    }

    let token;
    let emailToken = await EmailToken.findOne({
      $and: [{ email: existUser.email, type: 'forgot' }]
    });
    if (emailToken) {
      emailToken.createdAt = Date.now();
      token = emailToken.token;
    } else {
      token = makeEmailToken();
      emailToken = await EmailToken.create({ email, token, type: 'forgot' });
    }

    // 이메일로 랜덤 문자 보내기 => 입력

    const transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PW
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_ID,
      to: email,
      subject: '[Uniclass] 이메일 인증',
      html: makeEmailContent('forgot', email, token)
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        next(error);
      } else {
        console.log('이메일 보내기 성공:' + info.response);
      }
      transporter.close();
    });

    res.status(http.CREATED).json({
      success: true,
      message: '이메일이 보내졌습니다.'
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const signup = async (req, res, next) => {
  const {
    body: { username, password, email, name }
  } = req;

  if (!(username && password && email && name)) {
    next(createError(http.BAD_REQUEST, '필수 항목을 채워주세요.'));
  }
  try {
    const existUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existUser) {
      res.status(http.CONFLICT).json({
        success: false,
        message: {
          username: [
            '같은 아이디, 또는 이메일로 유저 정보가 이미 등록되어 있습니다.'
          ],
          email: [
            '같은 아이디, 또는 이메일로 유저 정보가 이미 등록되어 있습니다.'
          ]
        }
      });
    }

    const hash = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      email,
      name,
      password: hash
    });
    res
      .status(http.ACCEPTED)
      .json({ success: true, message: 'signup success', data: newUser });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const login = async (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(http.FORBIDDEN).json({
        info,
        user
      });
    }

    req.login(user, { session: false }, err => {
      if (err) {
        console.error(err);
        next(err);
      }
      console.log(user.toJSON());
      const token = jwt.sign(user.toJSON(), process.env.SECRET, {
        expiresIn: '1h'
      });
      return res.status(http.OK).json({
        success: true,
        message: '로그인 되었습니다.',
        data: { user, token }
      });
    });
  })(req, res, next);
};

export const findId = async (req, res, next) => {
  const {
    body: { name, email }
  } = req;
  try {
    const existUser = await User.findOne({ $and: [{ name, email }] });
    if (!existUser) {
      res
        .status(http.NOT_ACCEPTABLE)
        .json({ success: false, message: '유저를 찾을 수 없습니다.' });
    }
    res.status(http.ACCEPTED).json({
      success: true,
      message: '유저를 찾았습니다.',
      data: existUser.username
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
