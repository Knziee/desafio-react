const mongoose = require("mongoose");

const dbURI = "mongodb://mongodb:27017/seu-banco-de-dados";

mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conexão com o MongoDB estabelecida"))
    .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "Error connecting to MongoDB:"));
// db.once("open", () => {
//     console.log("Successful connection to MongoDB!");
// });

// module.exports = db;
