"use client";
import Image from "next/image";
import Header from "./components/Header";
import "tailwindcss/tailwind.css";
import React, { useState, ChangeEvent, useEffect } from "react";
import { FaEye, FaEdit, FaTrash, FaSpinner } from "react-icons/fa";
import SearchBar from "./components/SearchBar";
import wipImage from "../../public/images/testImage.jpg";
import View from "./components/View";
import axiosInstance from "../../services/axiosInstance"; // Importa a instância do Axios
import { ToastContainer, toast } from "react-toastify";
import ConfirmationModal from "./components/ConfirmationModal";

export default function Home() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [products, setProducts] = useState<any[]>([]); // Estado para armazenar os produtos
    const [action, setAction] = useState<string>("none");
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null); // Estado para armazenar o produto selecionado
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState<string | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(true);

    console.log(selectedProduct);

    // Função para buscar produtos com base no nome
    const fetchProductsByName = async (name: string) => {
        try {
            // Define isLoading para true ao iniciar a solicitação
            const response = await axiosInstance.get("/products", {
                params: { nome: name }, // Envia o parâmetro 'nome' na consulta
            });
            setProducts(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            toast.error(
                "Erro ao buscar produtos. Por favor, tente novamente mais tarde.",
                {
                    position: "bottom-right",
                    autoClose: 5000,
                }
            );
        } finally {
            setIsLoading(false); // Define isLoading para false após a solicitação
        }
    };
    useEffect(() => {
        fetchProductsByName(searchTerm);
    }, [searchTerm]); // Chama fetchProductsByName sempre que o searchTerm mudar

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        // Atualiza o estado do searchTerm ao digitar no campo de busca
        setSearchTerm(event.target.value);
    };

    const handleProduct = (product: any) => {
        setSelectedProduct(product); // Atualiza o produto selecionado
    };

    const handleConfirmDelete = async () => {
        try {
            if (!productIdToDelete) return; // Verifica se há um ID de produto para excluir
            const response = await axiosInstance.delete(
                `/products/delete/${productIdToDelete}`
            );
            toast.success("Produto excluído com sucesso!", {
                position: "bottom-right",
                autoClose: 5000,
            });
            fetchProductsByName(searchTerm);
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Erro ao excluir o produto:", error);
            toast.error(
                "Erro ao excluir o produto. Por favor, tente novamente mais tarde.",
                {
                    position: "bottom-right",
                    autoClose: 5000,
                }
            );
            setShowDeleteModal(false);
        }
    };
    const handleDeleteProduct = async (productId: string) => {
        setProductIdToDelete(productId);
        setShowDeleteModal(true);
    };
    console.log(action);
    console.log(isLoading);
    return (
        <div className="bg-[#f3f5f8] min-h-screen">
            {" "}
            <Header onCreateNewProduct={() => setAction("create")} />
            <div className="p-12 gap-5 flex justify-center ">
                <div className="p-6 rounded-md shadow-md bg-white w-[60%] min-h-70vh">
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
                                {isLoading ? (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="text-center py-6"
                                        >
                                            <div className="flex justify-center items-center h-full">
                                                <FaSpinner className="animate-spin text-blue-500" />
                                            </div>{" "}
                                        </td>
                                    </tr>
                                ) : products.length === 0 ? (
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
                                                            src={wipImage}
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
                                                <button
                                                    className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded-md mr-2"
                                                    onClick={() => {
                                                        handleProduct(product);
                                                        setAction("view");
                                                    }}
                                                >
                                                    <FaEye className="mr-1" />{" "}
                                                    View
                                                </button>
                                                <button
                                                    className="flex items-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-1 px-2 rounded-md mr-2"
                                                    onClick={() => {
                                                        setAction("edit");
                                                        handleProduct(product);
                                                    }}
                                                >
                                                    <FaEdit className="mr-1" />{" "}
                                                    Edit
                                                </button>
                                                <button
                                                    className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-md"
                                                    onClick={() =>
                                                        handleDeleteProduct(
                                                            product._id
                                                        )
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
                {action === "none" ? (
                    <div className="p-6 rounded-md shadow-md bg-white w-[40%] flex justify-center items-center">
                        <div className="text-[26px] font-semibold">
                            {" "}
                            Select a product or Create a new one
                        </div>
                    </div>
                ) : (
                    <View
                        action={action}
                        codeValue={selectedProduct?.code || ""}
                        priceValue={selectedProduct?.price || 0}
                        descriptionValue={selectedProduct?.description || ""}
                        dateValue={selectedProduct?.date || ""}
                        productId={selectedProduct?._id || ""}
                        fetchProducts={fetchProductsByName}
                    />
                )}
            </div>{" "}
            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                message="Tem certeza que deseja excluir este produto?"
            />
            <ToastContainer />
        </div>
    );
}
