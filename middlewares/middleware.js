const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const dotenv = require('dotenv');

dotenv.config();

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(
    new JwtStrategy(jwtOptions, async (payload, done) => {
        try {
            const user = { id: payload.userId, email: payload.email };
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    })
);

const authMiddleware = passport.authenticate('jwt', { session: false });

module.exports = authMiddleware;
