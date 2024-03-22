import React, { useState, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import axiosInstance from "../../../services/axiosInstance"; // Importa a instância do Axios
import wipImage from "../../../public/images/testImage.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProductFormProps {
    action?: string;
    codeValue: string;
    priceValue: number;
    descriptionValue: string;
    dateValue: string;
    productId: string;
    fetchProducts: (name: string) => Promise<void>;
}

const View: React.FC<ProductFormProps> = ({
    action,
    codeValue,
    priceValue,
    descriptionValue,
    dateValue,
    productId,
    fetchProducts,
}) => {
    const [code, setCode] = useState<string>(codeValue);
    const [price, setPrice] = useState<number>(priceValue);
    const [description, setDescription] = useState<string>(descriptionValue);
    const [date, setDate] = useState<string>(dateValue);

    useEffect(() => {
        if (action === "edit") {
            setCode(codeValue);
            setPrice(priceValue);
            setDescription(descriptionValue);
            setDate(dateValue);
        } else if (action === "create") {
            setCode("");
            setPrice(0);
            setDescription("");
            setDate("");
        }
    }, [action, codeValue, priceValue, descriptionValue, dateValue]);

    // console.log(code, description, price, imageData, contentType);
    const handleCreateProduct = async () => {
        try {
            if (!code || !description || !price || !date) {
                console.error("Preencha todos os campos");
                toast.error("Preencha todos os campos", {
                    position: "bottom-right",
                    autoClose: 5000,
                });
                return;
            }

            const productData = {
                code,
                description,
                price,
                date,
            };

            let response;
            if (action === "create") {
                response = await axiosInstance.post(
                    "/products/create",
                    productData
                );
            } else if (action === "edit") {
                response = await axiosInstance.put(
                    `/products/update/${productId}`,
                    productData
                );
            }

            console.log("Response:", response?.data);
            if (action === "create") {
                toast.success("Produto criado com sucesso!", {
                    position: "bottom-right",
                    autoClose: 5000,
                });
            } else if (action === "edit") {
                toast.success("Produto editado com sucesso!", {
                    position: "bottom-right",
                    autoClose: 5000,
                });
            }

            fetchProducts("");
            setCode("");
            setDescription("");
            setPrice(0);
            setDate("");
        } catch (error: any) {
            console.error("Erro ao criar/editar o produto:", error);

            // Tratamento de erros e mensagens amigáveis
            if (error.response) {
                // Erro de resposta da API
                const errorMessage =
                    error.response.data.message ||
                    "Erro ao processar a requisição.";
                toast.error(errorMessage, {
                    position: "bottom-right",
                    autoClose: 5000,
                });
            } else if (error.message) {
                // Erro de validação ou outro erro interno
                toast.error(error.message, {
                    position: "bottom-right",
                    autoClose: 5000,
                });
            } else {
                // Erro desconhecido
                toast.error(
                    "Ocorreu um erro desconhecido. Por favor, tente novamente mais tarde.",
                    {
                        position: "bottom-right",
                        autoClose: 5000,
                    }
                );
            }
        }
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Verifica se o valor é um número válido antes de converter
        if (!isNaN(parseFloat(value))) {
            setPrice(parseFloat(value));
        } else {
            console.error("Valor inválido ");
            toast.error("Valor inválido ", {
                position: "bottom-right",
                autoClose: 5000,
            });
        }
    };

    return (
        <div className="p-5 rounded-md shadow-md bg-white w-[40%] mx-auto flex flex-col justify-center">
            <div className="text-2xl font-semibold mb-4 mt-2">
                Product Photo
            </div>
            <div className="relative flex-grow w-full max-w-[180px] mx-auto h-[180px]">
                <Image
                    src={wipImage}
                    alt="Selected Product"
                    layout="fill"
                    objectFit="contain"
                    className="w-full h-full"
                />
            </div>
            <div className="border-b border-gray-400 mb-6 pt-6"></div>
            <div className="text-2xl font-semibold mb-8">Product details</div>
            <div className="flex mb-4 gap-6">
                <div className="w-full">
                    <label
                        htmlFor="code"
                        className="block mb-1 font-semibold text-gray-600"
                    >
                        Code:
                    </label>
                    {action === "view" ? (
                        <p>{codeValue}</p>
                    ) : (
                        <input
                            type="text"
                            id="code"
                            placeholder="Enter code"
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    )}
                </div>
                <div className="w-full">
                    <label
                        htmlFor="price"
                        className="block mb-1 font-semibold text-gray-600"
                    >
                        Price:
                    </label>
                    {action === "view" ? (
                        <p>{priceValue}</p>
                    ) : (
                        <input
                            type="text"
                            id="price"
                            placeholder="Enter price"
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                            value={price === 0 ? "" : price}
                            onChange={handlePriceChange}
                        />
                    )}
                </div>
            </div>
            <div className="mb-4 w-full">
                <label
                    htmlFor="description"
                    className="block mb-1 font-semibold text-gray-600"
                >
                    Description:
                </label>
                {action === "view" ? (
                    <p>{descriptionValue}</p>
                ) : (
                    <textarea
                        id="description"
                        placeholder="Enter description"
                        rows={4}
                        className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                )}
            </div>
            <div className="flex mb-4 justify-between items-center">
                <div className="mb-4">
                    <label htmlFor="date" className="block mb-1">
                        Date:
                    </label>
                    {action === "view" ? (
                        <p>{dateValue}</p>
                    ) : (
                        <input
                            type="date"
                            id="date"
                            placeholder="Select date"
                            className="border border-gray-300 rounded-md px-4 py-2"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    )}
                </div>
                {action !== "view" && (
                    <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-24 rounded-md"
                        onClick={handleCreateProduct}
                    >
                        {action === "create" ? "Create" : "Save"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default View;
