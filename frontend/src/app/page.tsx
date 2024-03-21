"use client";
import Image from "next/image";
import Header from "./components/Header";
import "tailwindcss/tailwind.css";
import React, { useState, ChangeEvent, useEffect } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import SearchBar from "./components/SearchBar";
import TestImage from "../../public/images/testImage.jpg";
import View from "./components/View";
import axiosInstance from "../../services/axiosInstance"; // Importa a instância do Axios

export default function Home() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [products, setProducts] = useState<any[]>([]); // Estado para armazenar os produtos
    const [CRUDMode, setCRUDMode] = useState<string>("none");

    // Função para buscar produtos com base no nome
    const fetchProductsByName = async (name: string) => {
        try {
            const response = await axiosInstance.get("/products", {
                params: { nome: name }, // Envia o parâmetro 'nome' na consulta
            });
            setProducts(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };
    useEffect(() => {
        if (searchTerm.trim() !== "") {
            fetchProductsByName(searchTerm);
        }
    }, [searchTerm]);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Função para fazer o POST e criar um novo produto com imagem
    const createProductWithImage = async () => {
        try {
            const codigo = "123456"; // Código do produto
            const descricao = "Descrição do produto"; // Descrição do produto
            const preco = 99.99; // Preço do produto

            // Carregar a imagem como ArrayBuffer (substitua 'caminho/da/imagem.jpg' pelo caminho correto)
            const imageResponse = await fetch("caminho/da/imagem.jpg");
            const imageData = await imageResponse.arrayBuffer();

            // Tipo de conteúdo da imagem
            const contentType = "image/jpeg"; // Altere conforme o tipo de imagem que você está enviando

            // Dados do novo produto com imagem
            const newProductData = {
                codigo,
                descricao,
                preco,
                imageData,
                contentType,
            };

            // Fazendo a requisição POST para criar o novo produto com imagem
            const response = await axiosInstance.post(
                "/products/create",
                newProductData
            );
            console.log("Novo produto criado com imagem:", response.data);
        } catch (error) {
            console.error("Erro ao criar o produto com imagem:", error);
        }
    };

    const handleSave = () => {
        // Lógica de salvamento dos dados
        console.log("Dados salvos!");
    };

    // let products = [
    //     {
    //         photo: TestImage,
    //         code: "214123",
    //         description: "blalbalba",
    //     },
    //     {
    //         photo: TestImage,
    //         code: "214123",
    //         description: "blalbalba",
    //     },
    //     {
    //         photo: TestImage,
    //         code: "214123",
    //         description: "blalbalba",
    //     },
    // ];

    return (
        <div className="bg-blueGray-100 min-h-screen">
            {" "}
            <Header />
            <div className="p-12 gap-5 flex justify-center ">
                <div className="p-6 rounded-md shadow-md bg-white w-[60%]">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-[26px] font-semibold">Products</h2>
                        <SearchBar onSearch={handleSearch} />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg overflow-hidden mt-4">
                            <thead className="bg-gray-100 text-gray-800 uppercase text-sm font-semibold ">
                                <tr>
                                    <th className="py-3 px-6 text-left h-[56px]">
                                        Photo
                                    </th>
                                    <th className="py-3 px-6 text-left">
                                        Code
                                    </th>
                                    <th className="py-3 px-6 text-left">
                                        Description
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {products.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="text-center py-6"
                                        >
                                            No products registered yet
                                        </td>
                                    </tr>
                                ) : (
                                    products.map((product, index) => (
                                        <tr
                                            key={index}
                                            className={`${
                                                index % 2 === 0
                                                    ? "bg-gray-50"
                                                    : "bg-white"
                                            } hover:bg-gray-100`}
                                        >
                                            <td className="py-3 px-6">
                                                <div className="flex items-center ">
                                                    <div className="w-10 h-14 rounded-full overflow-hidden">
                                                        <Image
                                                            src={product.photo}
                                                            alt={`Product ${
                                                                index + 1
                                                            }`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6">
                                                {product.code}
                                            </td>
                                            <td className="py-3 px-6">
                                                {product.description}
                                            </td>
                                            <td className="py-6 px-6 text-center flex justify-center ">
                                                <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded-md mr-2">
                                                    <FaEye className="mr-1" />{" "}
                                                    View
                                                </button>
                                                <button
                                                    className="flex items-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-1 px-2 rounded-md mr-2"
                                                    onClick={() =>
                                                        setCRUDMode("edit")
                                                    }
                                                >
                                                    <FaEdit className="mr-1" />{" "}
                                                    Edit
                                                </button>
                                                <button
                                                    className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-md"
                                                    onClick={() =>
                                                        setCRUDMode("create")
                                                    }
                                                >
                                                    <FaTrash className="mr-1" />{" "}
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>{" "}
                {/* <div className="p-6 rounded-md shadow-md bg-white w-[40%] flex justify-center items-center">
                    <div className="text-[26px] font-semibold">
                        {" "}
                        Select a product or Create a new one
                    </div>
                </div> */}
                <View
                    image="caminho/da/imagem.jpg"
                    codeValue=""
                    priceValue=""
                    descriptionValue=""
                    dateValue=""
                    onSave={handleSave}
                />{" "}
            </div>
        </div>
    );
}
