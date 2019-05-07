import bcrypt from 'bcrypt';
import User from '../models/user';
import createError from 'http-errors';
import http from 'http-status-codes'

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