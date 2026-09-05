import React from 'react';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
    const baseStyle = "w-full py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center";

    const variants = {
        primary: "bg-[#3CC953] hover:bg-green-500 text-white",
        secondary: "bg-[#EAFAEB] hover:bg-[#d6f5d8] text-[#3CC953]",
        outline: "bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium"
    };

    return (
        <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
}