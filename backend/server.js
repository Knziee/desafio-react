// server.js
const express = require("express");
const cors = require("cors");
const db = require("./db");
const fs = require("fs").promises; // Importando fs com métodos assíncronos
const mime = require("mime-types");
const Product = require("./models/Product");

const app = express();
const port = 3030;

app.use(express.json());

app.use(cors());

// Rota para listar todos os produtos com imagem (ArrayBuffer)
app.get("/api/products", async (req, res) => {
    try {
        const { nome } = req.query; // Obtém o parâmetro de consulta 'nome'

        let query = {}; // Objeto de consulta para buscar todos os produtos por padrão

        // Se o parâmetro 'nome' estiver presente, adiciona a busca por nome na consulta
        if (nome) {
            query.description = { $regex: new RegExp(nome, "i") }; // Busca por nome (case insensitive)
        }

        // Busca todos os produtos no banco de dados com base na consulta
        const products = await Product.find(query);

        // Retorna apenas os dados básicos do produto
        const productsData = products.map((product) => {
            return product.toJSON();
        });

        res.json(productsData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar produtos" });
    }
});

app.post("/api/products/create", async (req, res) => {
    const { code, description, price, date } = req.body;

    try {
        console.log("Dados recebidos no corpo da requisição:", req.body);

        // Criando o objeto do produto
        const newProduct = new Product({
            code: code,
            description: description,
            price: price,
            date: date,
        });

        // Salvando o produto no banco de dados
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Erro ao salvar o produto:", error);
        res.status(500).json({ message: "Erro ao criar produto" });
    }
});

// Rota para atualizar um produto existente
app.put("/api/products/update/:id", async (req, res) => {
    const { id } = req.params;
    const { code, description, price, date } = req.body;

    try {
        // Encontra e atualiza o produto no banco de dados
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                code: code,
                description: description,
                price: price,
                date: date,
            },
            { new: true }
        );

        // Verifica se o produto foi encontrado e atualizado com sucesso
        if (!updatedProduct) {
            return res.status(404).json({ message: "Produto não encontrado" });
        }

        res.json(updatedProduct);
    } catch (error) {
        console.error("Erro ao atualizar o produto:", error);
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
