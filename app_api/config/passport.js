const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/user');
const User = mongoose.model('User');

passport.use(
    new LocalStrategy(
    {
    usernameField: 'email',
    },
    async (email, password, done) => {
        try {
            const q = await User.findOne({ email: email }).exec();
            if (!q) {
                return done(null, false, {
                    message: 'Incorrect username.',
                });
            }
            if (!q.validatePassword(password)) {
                return done(null, false, {
                    message: 'Incorrect password.',
                });
            }
            return done(null, q);
        } catch (err) {
            // Database error - pass it to passport instead of crashing the server
            return done(err);
        }
    }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id).exec();
    done(null, user);
});

module.exports = passport;