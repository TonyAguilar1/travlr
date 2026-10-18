const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require('passport');

const register = async (req, res) => {
    // Validate message to insure all perameters present
    if (!req.body.email || !req.body.name || !req.body.password) {
        return res
        .status(400)
        .json({ message: 'All fields are required' });
    }

    const user = new User(
{
    name: req.body.name,            // set user name
    email: req.body.email,        // set user email
    password: ' '                  // start with empty password, will be set below
});

user.setPassword(req.body.password);    // set user password
const q = await user.save();

    if (!q) 
        {
         // database error, return error message   
        return res
        .status(400)
        .json({ message: 'Error registering user' });
    
    }else {
        // Return new user token
        const token = user.generateJWT();
        res
            .status(200)
            .json({ token });
    }
};

const login = (req, res) => {
    //validate message to ensure all parameters present
    if (!req.body.email || !req.body.password) {
        return res
        .status(400)
        .json({ message: 'All fields are required' });
    }

    //delegate to passport to authenticate user
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return res
            .status(400)
            .json(err);
        }
        if (user) { // valid authentication, return token
            const token = user.generateJWT();
            res
                .status(200)
                .json({ token });
        } else { // auth failed 
            res
                .status(401)
                .json(info);
        }
    })(req, res);
};

// Export the register and login functions
module.exports = {
    register,
    login
};