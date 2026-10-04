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

module.exports = { 
    tripList,
    tripsFindByCode

};
