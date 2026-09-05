import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getData } from '../services/api';
import { setCourses } from '../store/redux/courseSlice';
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CourseCard from '../components/CourseCard';
import newsletterBg from '../assets/newsletter-bg.jpg'; // <-- Diambil dari folder assets

export default function Homepage() {
    const dispatch = useDispatch();
    const courses = useSelector((state) => state.courses.data);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // 👈 TAMBAHAN: Ambil data role dari penyimpanan browser
    const userRole = localStorage.getItem('role');

    useEffect(() => {
        const fetchCourses = async () => {
            setIsLoading(true);
            const dataAPI = await getData();
            dispatch(setCourses(dataAPI));
            setIsLoading(false);
        };
        fetchCourses();
    }, [dispatch]);

    const filteredCourses = (courses || []).filter(course =>
        course.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#FAFAFA] font-sans relative">
            <Navbar />

            {/* Hero Section Atas */}
            <div className="px-6 md:px-12 py-8">
                <div className="relative rounded-2xl overflow-hidden bg-gray-900 text-white text-center py-24 px-4">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center"></div>

                    <div className="relative z-10 max-w-4xl mx-auto">
                        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                            Revolusi Pembelajaran: Temukan<br />Ilmu Baru melalui Platform Video<br />Interaktif!
                        </h1>
                        <p className="text-gray-200 mb-8 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
                            Temukan ilmu baru yang menarik dan mendalam melalui koleksi video pembelajaran berkualitas tinggi. Tidak hanya itu, Anda juga dapat berpartisipasi dalam latihan interaktif yang akan meningkatkan pemahaman Anda.
                        </p>
                        <button className="bg-[#3CC953] hover:bg-[#34b348] text-white font-bold py-3 px-8 rounded-md transition-colors shadow-lg">
                            Temukan Video Course untuk Dipelajari!
                        </button>
                    </div>
                </div>
            </div>

            {/* Course Collection Section */}
            <div className="px-6 md:px-12 py-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-1">Koleksi Video Pembelajaran</h2>
                        <p className="text-sm text-gray-500">Jelajahi pilihan kursus terbaik untuk meningkatkan skill-mu.</p>
                    </div>
                    <div className="w-full md:w-auto">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Cari judul kelas..."
                            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                        />
                    </div>
                </div>

                {/* Grid of Courses */}
                {isLoading ? (
                    <div className="text-center py-12 text-gray-500">⏳ Sedang mengambil data dari Server...</div>
                ) : filteredCourses.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">Data kelas tidak ditemukan.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map((course) => (
                            <CourseCard
                                key={course.id}
                                {...course}
                                price={`Rp ${Number(course.price || 0).toLocaleString('id-ID')}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Newsletter Banner dengan Foto Baru di atas Footer */}
            <div className="px-6 md:px-12 py-12">
                <div className="relative rounded-2xl overflow-hidden bg-gray-900 text-white text-center py-20 px-4 shadow-md">
                    <div
                        className="absolute inset-0 opacity-40 bg-cover bg-center"
                        style={{ backgroundImage: `url(${newsletterBg})` }}
                    ></div>

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <span className="text-xs uppercase tracking-widest text-gray-200 font-semibold mb-2 block">NEWSLETTER</span>
                        <h2 className="text-2xl md:text-4xl font-bold mb-3">Mau Belajar Lebih Banyak?</h2>
                        <p className="text-gray-200 mb-8 text-xs md:text-sm max-w-lg mx-auto">
                            Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran spesial dari program-program terbaik hariesok.id
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 max-w-md mx-auto bg-white p-2 rounded-xl shadow-lg">
                            <input
                                type="email"
                                placeholder="Masukkan Emailmu"
                                className="w-full px-4 py-2 text-gray-800 text-sm focus:outline-none"
                            />
                            <button className="w-full sm:w-auto bg-[#FFC727] hover:bg-[#e0b022] text-gray-900 font-bold px-6 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            {/* 👈 TAMBAHAN: Kondisi agar tombol hanya muncul untuk admin */}
            {userRole === 'admin' && (
                <Link
                    to="/admin"
                    className="fixed bottom-6 right-6 bg-gray-800 text-white px-4 py-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors flex items-center gap-2 text-sm font-bold z-50 border-2 border-white/20"
                >
                    ⚙️ Admin
                </Link>
            )}
        </div>
    );
}