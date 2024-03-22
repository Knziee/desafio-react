import React from "react";
import Image from "next/image";
import { FaEye, FaEdit, FaTrash, FaSpinner } from "react-icons/fa";

interface Product {
    _id: string;
    code: string;
    description: string;
}

interface ProductTableProps {
    isLoading: boolean;
    products: Product[];
    handleProduct: (product: Product) => void;
    setAction: (action: string) => void;
    handleDeleteProduct: (productId: string) => void;
}
const ProductTable: React.FC<ProductTableProps> = ({
    isLoading,
    products,
    handleProduct,
    setAction,
    handleDeleteProduct,
}) => {
    return (
        <table className="min-w-full bg-white rounded-lg overflow-hidden mt-4">
            <thead className="bg-gray-100 text-gray-800 uppercase text-sm font-semibold">
                <tr>
                    <th className="py-3 px-6 text-left h-[56px]">Photo</th>
                    <th className="py-3 px-6 text-left">Code</th>
                    <th className="py-3 px-6 text-left">Description</th>
                    <th className="py-3 px-6 text-center">Action</th>
                </tr>
            </thead>
            <tbody className="text-gray-700">
                {isLoading ? (
                    <tr>
                        <td colSpan={4} className="text-center py-6">
                            <div className="flex justify-center items-center h-full">
                                <FaSpinner className="animate-spin text-blue-500" />
                            </div>
                        </td>
                    </tr>
                ) : products.length === 0 ? (
                    <tr>
                        <td colSpan={4} className="text-center py-6">
                            No products registered yet
                        </td>
                    </tr>
                ) : (
                    products.map((product, index) => (
                        <tr
                            key={index}
                            className={`${
                                index % 2 === 0 ? "bg-gray-50" : "bg-white"
                            } hover:bg-gray-100`}
                        >
                            <td className="py-3 px-6">
                                <div className="flex items-center ">
                                    <div className="w-10 h-14 rounded-full overflow-hidden">
                                        <Image
                                            src="/images/testImage.jpg" 
                                            alt={`Product ${index + 1}`}
                                            width={40} 
                                            height={40}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </td>
                            <td className="py-3 px-6">{product.code}</td>
                            <td className="py-3 px-6">{product.description}</td>
                            <td className="py-6 px-6 text-center flex justify-center">
                                <button
                                    className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded-md mr-2"
                                    onClick={() => {
                                        handleProduct(product);
                                        setAction("view");
                                    }}
                                >
                                    <FaEye className="mr-1" />
                                    View
                                </button>
                                <button
                                    className="flex items-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-1 px-2 rounded-md mr-2"
                                    onClick={() => {
                                        setAction("edit");
                                        handleProduct(product);
                                    }}
                                >
                                    <FaEdit className="mr-1" />
                                    Edit
                                </button>
                                <button
                                    className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-md"
                                    onClick={() =>
                                        handleDeleteProduct(product._id)
                                    }
                                >
                                    <FaTrash className="mr-1" />
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default ProductTable;
