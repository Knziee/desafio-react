// db.js
const mongoose = require("mongoose");

// Para:
mongoose.connect('mongodb://localhost:27017/loja');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Erro na conexão com o MongoDB:"));
db.once("open", () => {
    console.log("Conexão bem-sucedida com o MongoDB!");
});

module.exports = db;
