// Bring in the DB connection and the Trip schema
const Mongoose = require('./db');
const Trip = require('./travlr');

//Read the seed data from the JSON file
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// delete any existing records, then insert the seed data
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
    console.log("Database seeded successfully");
};

// Close the MongoDB connection and exit
seedDB().then(async () => {
    await Mongoose.connection.close();
    console.log("MongoDB connection closed");
    process.exit(0);
});