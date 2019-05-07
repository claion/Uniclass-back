import local from './localStrategy';
import jwt from './jwtStrategy';

export default passport => {
    local(passport);
    jwt(passport);
}