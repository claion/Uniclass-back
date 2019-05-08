import bcrypt from 'bcrypt';
import createError from 'http-errors';
import http from 'http-status-codes'
import jwt from 'jsonwebtoken';
import passport from 'passport';
import nodemailer from 'nodemailer';

import User from '../models/user';

require('dotenv').config();

export const signup = async (req, res, next) => {
    const { body: { username, password, email, name }} = req;
    
    try {
        const existUser = await User.findOne({ $or: [{username}, {email}] })
        
        if (existUser) {
            throw createError(http.INTERNAL_SERVER_ERROR, "유저 정보가 이미 등록되어 있습니다.")
        }

        const hash = await bcrypt.hash(password, 12);
        const newUser = await User.create({username, email, name, password: hash});
        res.status(http.ACCEPTED).json({success: true, message: "signup success", data: newUser})
    } catch (e) {
        console.error(e);
        next(e);
    }
}

export const login = async (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info ) => {
        if (err || !user) {
            return res.status(http.FORBIDDEN).json({
                info,
                user
            })
        }

        req.login(user, {session: false}, err => {
            if (err) {
                console.error(err);
                next(err);
            }
            console.log(user.toJSON());
            const token = jwt.sign(user.toJSON(), process.env.SECRET, {expiresIn: '1h'});
            return res.json({user, token});
        })
    })(req, res, next);
}

export const findId = async (req, res, next) => {
    const {body: {name, email}} = req
    try {
        const existUser = await User.findOne({$and: [{name, email}]});
        if (!existUser) {
            res.status(http.NOT_ACCEPTABLE).json({success: false, message: "유저를 찾을 수 없습니다."});
        }
        res.status(http.ACCEPTED).json({success:true, message: "유저를 찾았습니다.", data: existUser.username})
    } catch (e) {
        console.error(e);
        next(e);
    }
}

export const forgotPassword = async (req, res, next) => {
    const {body: {name, email, username}} = req;
    try {
        const existUser = await User.findOne({$and: [{name, email, username}]});
        if (!existUser) {
            res.status(http.NOT_ACCEPTABLE).json({success: false, message: "유저를 찾을 수 없습니다."});
        }

        const token = makeToken();
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
            to: "changhoi0522@gmail.com",
            subject: '이메일 발송 테스트',
            text: token
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) { console.error(error); next(error)}
            else {console.log("이메일 보내기 성공:" + info.response);}
            transporter.close()
        });

    } catch (e) {
        console.error(e);
        next(e);
    }
}

const makeToken = () => {
    let token = '';
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(let i = 0; i < 5; i++ ) {
        token += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return token
}