import passportJWT from 'passport-jwt';
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
import User from '../models/user';

export default passport => {
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET
      },
      async (jwtPayload, done) => {
        try {
          const user = await User.findOne({ username: jwtPayload.username });
          return done(null, user);
        } catch (e) {
          console.log('토큰 에러');
          console.error(e);
          return done(e);
        }
      }
    )
  );
};
