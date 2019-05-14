import EmailToken from '../models/user';
import createError from 'http-errors';
import http from 'http-status-codes'
import User from '../models/user';

export const isNotLoggedIn = (req, res, next) => {
}

export const inLoggedIn = (req, res, next) => {

}

export const verifyEmailToken = async (req, res, next) => {
    const {body: {token, email}} = req;
    try {
        const emailToken = EmailToken.findOne({ token, email })
        if (emailToken) {
            next()
        } else {
            res.status(http.NOT_ACCEPTABLE).json({success: false, message: '만료 or 인증되지 않은 토큰'})
        }
    } catch (e) {
        console.error(e);
        next(e);
    }
}

export const isCertificate = async (req, res, next) => {
    try {
        const {body: {username}} = req;
        const user = await User.findOne({username});
        if (user.isCertificated) {
            next();
        } else {
            throw createError(http.UNAUTHORIZED);   
        }
    } catch (e) {
        console.error(e);
        next(e);
    }
}

export const isNotCertificate = async (req, res, next) => {
    try {
        const {body: {username}} = req;
        const user = await User.findOne({username});
        if (!user.isCertificated) {
            next();
        } else {
            throw createError(http.UNAUTHORIZED);   
        }
    } catch (e) {
        console.error(e);
        next(e);
    }
}