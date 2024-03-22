const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/loja");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB:"));
db.once("open", () => {
    console.log("Successful connection to MongoDB!");
});

module.exports = db;
