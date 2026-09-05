import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-white pt-16 pb-8 px-6 md:px-12 border-t border-gray-200 mt-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div className="col-span-1 md:col-span-1">
                    <div className="text-2xl font-bold mb-4">
                        <span className="text-orange-500">video</span><span className="text-orange-400">belajar</span>
                    </div>
                    <p className="text-gray-800 font-bold mb-2">Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id!</p>
                    <p className="text-gray-500 text-sm mb-1">Jl. Usman Effendi No. 50 Lowokwaru, Malang</p>
                    <p className="text-gray-500 text-sm">+62-877-7123-1234</p>
                </div>

                <div>
                    <h4 className="font-bold text-gray-800 mb-4">Kategori</h4>
                    <ul className="text-gray-500 text-sm space-y-2">
                        <li><a href="#" className="hover:text-orange-500">Digital & Teknologi</a></li>
                        <li><a href="#" className="hover:text-orange-500">Pemasaran</a></li>
                        <li><a href="#" className="hover:text-orange-500">Manajemen Bisnis</a></li>
                        <li><a href="#" className="hover:text-orange-500">Pengembangan Diri</a></li>
                        <li><a href="#" className="hover:text-orange-500">Desain</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-gray-800 mb-4">Perusahaan</h4>
                    <ul className="text-gray-500 text-sm space-y-2">
                        <li><a href="#" className="hover:text-orange-500">Tentang Kami</a></li>
                        <li><a href="#" className="hover:text-orange-500">FAQ</a></li>
                        <li><a href="#" className="hover:text-orange-500">Kebijakan Privasi</a></li>
                        <li><a href="#" className="hover:text-orange-500">Ketentuan Layanan</a></li>
                        <li><a href="#" className="hover:text-orange-500">Bantuan</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-gray-800 mb-4">Komunitas</h4>
                    <ul className="text-gray-500 text-sm space-y-2">
                        <li><a href="#" className="hover:text-orange-500">Tips Sukses</a></li>
                        <li><a href="#" className="hover:text-orange-500">Blog</a></li>
                    </ul>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
                <p className="text-gray-400 text-sm mb-4 md:mb-0">@2023 Gerobak Sayur All Rights Reserved.</p>
                <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500">in</div>
                    <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500">f</div>
                    <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500">ig</div>
                    <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500">tw</div>
                </div>
            </div>
        </footer>
    );
}