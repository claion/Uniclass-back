import passportJWT from 'passport-jwt';
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
import User from '../models/user'

export default passport => {
        passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET
    }, async (jwtPayload, done) => {
        try {
            const user = User.findOne({_id:jwtPayload.id});
            return done(null, user);
        } catch (e) {
            console.error(e);
            return done(e);
        }

    }))
}