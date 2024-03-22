import React from "react";
import Image from "next/image";

interface HeaderProps {
    onCreateNewProduct: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCreateNewProduct }) => {
    return (
        <div className="bg-[#ffff] text-black h-[136px] px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center">
                <Image
                    src="https://serverinfo.com.br/templates/img/logo-server-software.svg"
                    width={140}
                    height={140}
                    alt="Logo"
                />
                <div className="ml-6">
                    <h1 className="text-[22px] font-bold">Admin Panel</h1>
                    <p className="text-[18px]">
                        View, create, read, update, or delete (CRUD) products
                        below
                    </p>
                </div>
            </div>

            <div>
                <div
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg mr-4 cursor-pointer"
                    onClick={onCreateNewProduct}
                >
                    Create New Product
                </div>
            </div>
        </div>
    );
};

export default Header;
