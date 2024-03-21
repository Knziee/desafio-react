// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true,
        unique: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    imagem: {
        data: Buffer,
        contentType: String,
    },
    preco: {
        type: Number,
        required: true,
    },
    data_cadastro: {
        type: Date,
        default: Date.now,
    },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
