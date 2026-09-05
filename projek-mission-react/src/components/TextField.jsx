import React from 'react';

export default function TextField({ label, type = 'text', placeholder, required, ...props }) {
    return (
        <div className="flex flex-col mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1.5">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3CC953] focus:border-[#3CC953] text-sm"
                {...props}
            />
        </div>
    );
}