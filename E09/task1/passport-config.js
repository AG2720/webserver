//passport-config
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const bcrypt = require('bcrypt');

function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) return done(null, false, { message: 'No user with that email' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) return done(null, user);
            else return done(null, false, { message: 'Password incorrect' });
        } catch (error) {
            return done(error);
        }
    };

    passport.use(new LocalStrategy(
        { 
            usernameField: 'email', 
            passwordField: 'password'
        }, 
        authenticateUser
    ));

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });
}

module.exports = initialize;
