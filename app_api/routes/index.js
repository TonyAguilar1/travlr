const express = require("express"); // Express app
const router = express.Router();    // Router logic
const jwt = require('jsonwebtoken'); // Enable JSON Web Tokens (JWT) for authentication

// This is where we import the controllers we will route
const tripsController = require("../controllers/trips");
const authController = require("../controllers/authentications");

// Middleware to authenticate the JWT sent in the Authorization header
function authenticateJWT(req, res, next) {
    // console.log('In Middleware');

    const authHeader = req.headers['authorization'];
    // console.log('Auth Header: ' + authHeader);

    if (authHeader == null) {
        console.log('Auth Header Required but NOT PRESENT!');
        return res.sendStatus(401);
    }

    // Header format is "Bearer <token>"
    const headers = authHeader.split(' ');
    if (headers.length < 2) {
        console.log('Not enough tokens in Auth Header: ' + headers.length);
        return res.sendStatus(501);
    }

    const token = headers[1];
    // console.log('Token: ' + token);

    if (token == null) {
        console.log('Null Bearer Token');
        return res.sendStatus(401);
    }

    // console.log(jwt.decode(token));
    jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
        if (err) {
            return res.status(401).json('Token Validation Error!');
        }
        req.auth = verified; // Set the auth parameter to the decoded object
        next();              // Continue on to the controller
    });
}

// define routes for our authentication endpoints
router
    .route('/register')
    .post(authController.register);   // POST Method routes register

router
    .route('/login')
    .post(authController.login);      // POST Method routes login

// define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripList)                         // GET Method routes tripList
    .post(authenticateJWT, tripsController.tripsAddTrip);  // POST Method Adds a Trip (protected)

// GET Method routes tripsFindByCode - requires parameter
// PUT Method routes tripsUpdateTrip - requires parameter (protected)
// DELETE Method routes tripsDeleteTrip - requires parameter (protected)
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(authenticateJWT, tripsController.tripsUpdateTrip)
    .delete(authenticateJWT, tripsController.tripsDeleteTrip);

module.exports = router;
