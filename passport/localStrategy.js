import bcrypt from 'bcrypt';
import Local from 'passport-local';
const Strategy = Local.Strategy

import User from '../models/user';


export default passport => {
    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password'
    }, async (username, password, done) => {
        try {
            const exUser = await User.findOne({username})
            if (exUser) {
                const result = await bcrypt.compare(password, exUser.password); 
                if (result) {
                    done(null, exUser);
                } else {
                    done(null, false, {message: '로그인 실패'})
                }
            } else {
                done(null, false, {message: '로그인 실패'})
            }
        } catch (e) {
            console.error(e);
            return done(e);
        }
    }))
}