import React, { useState } from "react";
import Image from "next/image";

interface ProductFormProps {
    image?: ArrayBuffer;
    codeValue: string;
    priceValue: string;
    descriptionValue: string;
    dateValue: string;
    onSave: () => void;
}

const View: React.FC<ProductFormProps> = ({
    image,
    codeValue,
    priceValue,
    descriptionValue,
    dateValue,
    onSave,
}) => {
    const [code, setCode] = useState<string>(codeValue);
    const [price, setPrice] = useState<string>(priceValue);
    const [description, setDescription] = useState<string>(descriptionValue);
    const [date, setDate] = useState<string>(dateValue);

    const handleSave = () => {
        // Aqui você pode realizar a lógica de salvamento dos dados
        onSave();
    };

    return (
        <div className="p-5 rounded-md shadow-md bg-white w-[40%] mx-auto flex flex-col justify-center">
            <div className="text-2xl font-semibold mb-4 mt-2">
                Product Photos
            </div>
            <div className="relative flex-grow w-full max-w-[300px] mx-auto h-[300px]">
                {/* <Image
                    src={image}
                    alt="Selected Product"
                    layout="fill"
                    objectFit="contain"
                    className="w-full h-full"
                /> */}
            </div>
            <div className="border-b border-gray-400 mb-6 pt-6"></div>
            <div className="text-[26px] font-semibold mb-8">
                Product details
            </div>
            <div className="flex mb-4 gap-6">
                <div className="w-full">
                    <label
                        htmlFor="code"
                        className="block mb-1 font-semibold text-gray-600"
                    >
                        Code:
                    </label>
                    <input
                        type="text"
                        id="code"
                        placeholder="Enter code"
                        className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>
                <div className="w-full">
                    <label
                        htmlFor="price"
                        className="block mb-1 font-semibold text-gray-600"
                    >
                        Price:
                    </label>
                    <input
                        type="text"
                        id="price"
                        placeholder="Enter price"
                        className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
            </div>
            <div className="mb-4 w-full">
                <label
                    htmlFor="description"
                    className="block mb-1 font-semibold text-gray-600"
                >
                    Description:
                </label>
                <textarea
                    id="description"
                    placeholder="Enter description"
                    rows={4}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="flex mb-4 justify-between items-center">
                <div className="mb-4">
                    <label htmlFor="date" className="block mb-1">
                        Date:
                    </label>
                    <input
                        type="date"
                        id="date"
                        placeholder="Select date"
                        className="border border-gray-300 rounded-md px-4 py-2"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-24 rounded-md"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default View;
