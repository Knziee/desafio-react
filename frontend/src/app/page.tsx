"use client";
import { ToastContainer, toast } from "react-toastify";
import React, { useState, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import { FaEye, FaEdit, FaTrash, FaSpinner } from "react-icons/fa";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import View from "./components/View";
import ConfirmationModal from "./components/ConfirmationModal";
import axiosInstance from "../../services/axiosInstance";

import "tailwindcss/tailwind.css";
import wipImage from "../../public/images/testImage.jpg";
import ProductTable from "./components/ProductTable";

export default function Home() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [products, setProducts] = useState<any[]>([]);
    const [action, setAction] = useState<string>("none");
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState<string | null>(
        null
    );

    const fetchProductsByName = async (searchValue: string) => {
        try {
            const response = await axiosInstance.get("/products", {
                params: { descriptionParam: searchValue },
            });
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Error fetching products. Please try again later.", {
                position: "bottom-right",
                autoClose: 5000,
            });
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchProductsByName(searchTerm);
    }, [searchTerm]);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleProduct = (product: any) => {
        setSelectedProduct(product);
    };

    const handleConfirmDelete = async () => {
        try {
            if (!productIdToDelete) return;
            const response = await axiosInstance.delete(
                `/products/delete/${productIdToDelete}`
            );
            toast.success("Product deleted successfully!", {
                position: "bottom-right",
                autoClose: 5000,
            });
            fetchProductsByName(searchTerm);
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting product:", error);
            toast.error("Error deleting product. Please try again later.", {
                position: "bottom-right",
                autoClose: 5000,
            });
            setShowDeleteModal(false);
        }
    };
    const handleDeleteProduct = async (productId: string) => {
        setProductIdToDelete(productId);
        setShowDeleteModal(true);
    };

    return (
        <div className="bg-[#f3f5f8] min-h-screen">
            <Header onCreateNewProduct={() => setAction("create")} />
            <div className="p-12 gap-5 flex justify-center ">
                <div className="p-6 rounded-md shadow-md bg-white w-[60%] min-h-70vh">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-[26px] font-semibold">Products</h2>
                        <SearchBar onSearch={handleSearch} />
                    </div>
                    <div className="overflow-x-auto">
                        <ProductTable // Substituir a tabela original pelo componente ProductTable
                            isLoading={isLoading}
                            products={products}
                            handleProduct={handleProduct}
                            setAction={setAction}
                            handleDeleteProduct={handleDeleteProduct}
                        />
                    </div>
                </div>
                {action === "none" ? (
                    <div className="p-6 rounded-md shadow-md bg-white w-[40%] flex justify-center items-center">
                        <div className="text-[26px] font-semibold">
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
            </div>
            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                message="Are you sure you want to delete it?"
            />
            <ToastContainer />
        </div>
    );
}
