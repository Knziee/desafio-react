// server.js
const express = require("express");
const db = require("./db");
const fs = require("fs").promises; // Importando fs com métodos assíncronos
const mime = require("mime-types");
const Product = require("./models/Product");

const app = express();
const port = 3030;

app.use(express.json());

// Rota para listar todos os produtos com imagem (ArrayBuffer)
app.get("/api/products", async (req, res) => {
    try {
        const { nome } = req.query; // Obtém o parâmetro de consulta 'nome'

        let query = {}; // Objeto de consulta para buscar todos os produtos por padrão

        // Se o parâmetro 'nome' estiver presente, adiciona a busca por nome na consulta
        if (nome) {
            query.descricao = { $regex: new RegExp(nome, "i") }; // Busca por nome (case insensitive)
        }

        // Busca todos os produtos no banco de dados com base na consulta
        const products = await Product.find(query);

        // Mapeia os produtos para incluir a imagem como ArrayBuffer se ela existir
        const productsWithImage = products.map((product) => {
            const productData = product.toJSON();
            // Verifica se o produto possui imagem
            if (product.imagem && product.imagem.data) {
                // Converte o Buffer da imagem em ArrayBuffer para enviar na resposta
                productData.imageData = Uint8Array.from(
                    product.imagem.data
                ).buffer;
            }
            return productData;
        });

        res.json(productsWithImage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar produtos" });
    }
});

// Rota para criar um novo produto com imagem (ArrayBuffer)
app.post("/api/products/create", async (req, res) => {
    const { codigo, descricao, preco } = req.body;
    const imageData = req.body.imageData; // Array de bytes da imagem (ArrayBuffer)

    // Verifica se os dados da imagem estão presentes no corpo da requisição
    if (!imageData || !imageData.byteLength) {
        return res
            .status(400)
            .json({ message: "Dados da imagem não fornecidos" });
    }

    try {
        // Criando o objeto do produto com a imagem como Buffer
        const newProduct = new Product({
            codigo: codigo,
            descricao: descricao,
            imagem: {
                data: Buffer.from(imageData), // Converte o ArrayBuffer em um Buffer
                contentType: req.body.contentType, // Tipo de conteúdo da imagem (ex: image/jpeg)
            },
            preco: preco,
        });

        // Salvando o produto no banco de dados
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Erro ao salvar o produto com imagem:", error);
        res.status(500).json({ message: "Erro ao criar produto com imagem" });
    }
});

// Rota para atualizar um produto existente com imagem (ArrayBuffer)
app.put("/api/products/update/:id", async (req, res) => {
    const { id } = req.params;
    const { codigo, descricao, preco } = req.body;
    const imageData = req.body.imageData; // Array de bytes da nova imagem (ArrayBuffer)

    // Verifica se os dados da imagem estão presentes no corpo da requisição
    let updatedImage;
    if (imageData && imageData.byteLength) {
        try {
            // Cria o objeto da nova imagem como Buffer
            updatedImage = {
                data: Buffer.from(imageData), // Converte o ArrayBuffer em um Buffer
                contentType: req.body.contentType, // Tipo de conteúdo da nova imagem (ex: image/jpeg)
            };
        } catch (error) {
            console.error("Erro ao criar a nova imagem:", error);
            return res
                .status(500)
                .json({ message: "Erro ao atualizar produto com imagem" });
        }
    }

    try {
        // Encontra e atualiza o produto no banco de dados
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                codigo: codigo,
                descricao: descricao,
                preco: preco,
                // Se houver uma nova imagem, atualiza a imagem também
                ...(updatedImage && { imagem: updatedImage }),
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
