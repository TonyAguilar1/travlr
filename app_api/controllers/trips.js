const mongoose = require('mongoose');
const Trip = require('../models/travlr'); //Register Model
const Model = mongoose.model('trips');

//GET: /trips - list all the trips
//Regardless of outcome, response must include HTML status code
//and JSON message to the requesting client
const tripList = async (req, res) => {
    const q = await Model
        .find({}) 
        .exec();

        console.log(q);


    if(!q)
    { //Database returned no data
        return res
             .status(404)
             .json({message: "No trips found"});
    } else {
        return res
             .status(200)
             .json(q);
    }

};

// GET: /trips/:tripCode - returns a single trip
const tripsFindByCode = async (req, res) => {
    const q = await Model
        .find({ 'code': req.params.tripCode })
        .exec();

    if (!q) {
        return res.status(404).json({ message: 'Trip not found' });
    } else {
        return res.status(200).json(q);
    }
};

// POST: /trips - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async (req, res) => {
    const newTrip = new Model({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    try {
        const q = await newTrip.save();
        if (!q) { // Database returned no data
            return res.status(400).json({ message: 'Trip could not be added' });
        } else { // Return new trip
            return res.status(201).json(q);
        }
    } catch (err) {
        return res.status(400).json(err);
    }

    // Uncomment the following line to show results of operation
    // on the console
    // console.log(q);
};

// PUT: /trips/:tripCode - Updates a Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {
    // Uncomment for debugging
    console.log(req.params);
    console.log(req.body);

    try {
        const q = await Model
            .findOneAndUpdate(
                { 'code': req.params.tripCode },
                {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                }
            )
            .exec();

        if (!q) { // Database returned no data
            return res.status(400).json({ message: 'Trip not found: ' + req.params.tripCode });
        } else { // Return resulting updated trip
            return res.status(201).json(q);
        }
    } catch (err) {
        return res.status(400).json(err);
    }

    // Uncomment the following line to show results of operation
    // on the console
    // console.log(q);
};

// DELETE: /trips/:tripCode - Deletes a Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsDeleteTrip = async (req, res) => {
    try {
        const q = await Model
            .findOneAndDelete({ 'code': req.params.tripCode })
            .exec();

        if (!q) { // No trip with that code
            return res.status(404).json({ message: 'Trip not found: ' + req.params.tripCode });
        } else { // Return the trip that was deleted
            return res.status(200).json(q);
        }
    } catch (err) {
        return res.status(400).json(err);
    }
};

module.exports = {
    tripList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};
