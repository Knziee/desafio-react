// server.js
const express = require("express");
const db = require("./db");
const Product = require("./models/Product");

const app = express();
const port = 3030;

app.use(express.json());

// Rota para listar todos os produtos
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar produtos" });
    }
});

// Rota para criar um novo produto
app.post("/api/products/create", async (req, res) => {
    const { codigo, descricao, preco } = req.body;
    try {
        const newProduct = await Product.create({ codigo, descricao, preco });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao criar produto" });
    }
});

// Rota para atualizar um produto existente
app.put("/api/products/update/:id", async (req, res) => {
    const { id } = req.params;
    const { codigo, descricao, preco } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { codigo, descricao, preco },
            { new: true }
        );
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar produto" });
    }
});

// Rota para excluir um produto
app.delete("/api/products/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.json({ message: "Produto excluído com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao excluir produto" });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
