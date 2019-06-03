import http from 'http-status-codes';
import nodemailer from 'nodemailer';

import User from '../models/user';

import EmailToken from '../models/emailToken';
import { makeEmailToken, makeEmailContent } from '../utils';

export const getProfile = (req, res, next) => {
  res.status(http.ACCEPTED).json({ success: true, data: { user: req.user } });
};

export const sendToken = async (req, res, next) => {
  const {
    body: { email, token }
  } = req;
  try {
    let token;
    let emailToken = await EmailToken.findOne({ email, type: 'verify' });
    if (!emailToken) {
      emailToken = await EmailToken.create({
        email,
        token: makeEmailToken(),
        type: 'verify'
      });
    }
    token = emailToken.token;

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
      html: makeEmailContent('verify', email, token)
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

    res
      .status(http.OK)
      .json({ success: true, message: '메일이 성공적으로 보내졌습니다.' });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const certificateUser = async (req, res, next) => {
  try {
    await User.findOneAndUpdate(
      { username: req.user.username },
      { $set: { isCertificated: true } }
    );

    res
      .status(http.ACCEPTED)
      .json({ success: true, message: '이메일 인증이 완료되었습니다.' });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
