import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userEmail');
        navigate('/login');
    };

    return (
        <nav className="flex justify-between items-center py-4 px-6 md:px-12 bg-white relative z-50">
            <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/home')}>
                <span className="text-orange-500">video</span><span className="text-orange-400">belajar</span>
            </div>
            <div className="flex items-center gap-6">
                <a href="#" className="text-gray-600 font-medium hidden md:block">Kategori</a>
                <div className="relative">
                    <div 
                        className="w-10 h-10 rounded-xl bg-gray-200 overflow-hidden cursor-pointer"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        {/* Menggunakan gambar dummy untuk profil */}
                        <img src="https://i.pravatar.cc/150?img=32" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100">
                            <button 
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                            >
                                Keluar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}