const express = require("express");
const cors = require("cors");
const db = require("./db");
const Product = require("./models/Product");

const app = express();
const port = 3030;

app.use(express.json());
app.use(cors());

app.get("/api/products", async (req, res) => {
    try {
        const { descriptionParam } = req.query;

        let query = {};

        if (descriptionParam) {
            query.description = { $regex: new RegExp(descriptionParam, "i") };
        }

        const products = await Product.find(query);

        const productsData = products.map((product) => {
            return product.toJSON();
        });

        res.json(productsData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching products" });
    }
});

app.post("/api/products/create", async (req, res) => {
    const { code, description, price, date } = req.body;

    try {
        console.log("Data received in the request body:", req.body);

        const newProduct = new Product({
            code: code,
            description: description,
            price: price,
            date: date,
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ message: "Error creating product" });
    }
});

app.put("/api/products/update/:id", async (req, res) => {
    const { id } = req.params;
    const { code, description, price, date } = req.body;

    try {
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

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Error updating product" });
    }
});

app.delete("/api/products/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting product" });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
