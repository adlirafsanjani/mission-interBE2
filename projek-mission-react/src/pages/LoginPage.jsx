import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();

    // State untuk menampung inputan form
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Tambahan state untuk loading

    // Logika Otentikasi Terhubung ke Backend
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // Backend Anda meminta "username", jadi kita kirimkan input email ini sebagai username
                    username: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Berhasil login! Simpan token dari backend
                localStorage.setItem('token', data.token);

                // 👈 TAMBAHAN LOGIKA ROLE DI SINI
                // Jika email adalah admin, set role admin. Jika bukan, set role user.
                if (email === 'admin@gmail.com') {
                    localStorage.setItem('role', 'admin');
                } else {
                    localStorage.setItem('role', 'user');
                }

                // Arahkan ke halaman utama
                navigate('/');
            } else {
                // Gagal login (password salah / tidak terdaftar)
                alert('Akses ditolak: ' + (data.message || 'Email atau password salah!'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Gagal terhubung ke server. Pastikan backend sudah berjalan.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FCFBF5] font-sans">
            {/* Header Navbar */}
            <header className="bg-white border-b border-gray-200 px-8 py-4">
                <div className="text-orange-500 font-bold text-2xl tracking-tight">
                    videobelajar
                </div>
            </header>

            {/* Main Content */}
            <main className="flex justify-center pt-10 pb-20 px-4">
                <div className="bg-white rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.05)] w-full max-w-[480px] p-8 md:p-10 border border-gray-100">

                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Masuk ke Akun</h1>
                        <p className="text-sm text-gray-500">Yuk, lanjut belajarmu di videobelajar.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* E-Mail */}
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">
                                E-Mail <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 text-sm"
                            />
                        </div>

                        {/* Kata Sandi */}
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">
                                Kata Sandi <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 text-sm"
                                />
                                <button type="button" className="absolute right-3 top-2.5 text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                                </button>
                            </div>
                        </div>

                        {/* Lupa Password */}
                        <div className="flex justify-end pt-1">
                            <a href="#" className="text-xs text-gray-500 hover:text-gray-700 font-medium">
                                Lupa Password?
                            </a>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-2 space-y-3">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#3CC953] hover:bg-[#34b048] text-white font-medium py-2.5 rounded-md text-sm transition-colors disabled:bg-gray-400"
                            >
                                {isLoading ? 'Memproses...' : 'Masuk'}
                            </button>

                            <Link
                                to="/register"
                                className="w-full flex justify-center items-center bg-[#E5F9E8] hover:bg-[#d4f2d9] text-[#3CC953] font-medium py-2.5 rounded-md text-sm transition-colors"
                            >
                                Daftar
                            </Link>
                        </div>

                        {/* Divider */}
                        <div className="relative py-4 flex items-center">
                            <div className="flex-grow border-t border-gray-200"></div>
                            <span className="flex-shrink-0 mx-4 text-xs text-gray-400">atau</span>
                            <div className="flex-grow border-t border-gray-200"></div>
                        </div>

                        {/* Google Button */}
                        <button
                            type="button"
                            className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-md text-sm flex items-center justify-center transition-colors"
                        >
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4 mr-2" />
                            Masuk dengan Google
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}