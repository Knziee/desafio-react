import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
    onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    return (
        <div className="flex items-center relative">
            <FaSearch className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500 " />
            <input
                type="text"
                placeholder="Search products..."
                onChange={onSearch}
                className="border border-gray-300 rounded-md px-10 py-2 pl-12"
            />
        </div>
    );
};

export default SearchBar;
