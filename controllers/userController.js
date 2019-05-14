import http from 'http-status-codes';

import User from '../models/user';
import {makeEmailToken, sendEmailToken} from './authController';

export const getProfile = (req, res, next) => {
    res.status(http.ACCEPTED).json("success");
}

export const certificateMail = async (req, res, next) => {
    try {
        const {body: {username}} = req;
        const user = await User.findOne({username});
        const {email} = user
        
        let token;
        let emailToken = await EmailToken.findOne($and[{email: existUser.email, purpose: 'CERTIFICATE'}])
        if (emailToken) {
            emailToken.createdAt = Date.now();
            token = emailToken.token;
        } else {
            token = makeEmailToken()
            emailToken = await EmailToken.create({email, token, purpose: 'FIND'});
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
            text: `[${token}]을 입력해주세요`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) { console.error(error); next(error)}
            else {console.log("이메일 보내기 성공:" + info.response);}
            transporter.close()
        });

        res.status(http.CREATED).json({success: true, message: "이메일이 보내졌습니다.", data: emailToken})
    
    } catch (e) {
        console.error(e);
        next(e);
    }
}

export const checkToken = async (req, res, next) => {
    try {
        const {body: {token, email}} = req;
        
    } catch (e) {
        console.error(e);
        next(e);
    } 
}