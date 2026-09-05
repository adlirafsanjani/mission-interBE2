import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getData, addData, editData, deleteData } from '../services/api';
import { setCourses } from '../store/redux/courseSlice';
import { Link } from 'react-router-dom';

export default function AdminPage() {
    const dispatch = useDispatch();
    const courses = useSelector((state) => state.courses.data);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        avatar: '',
        instructor: '',
        role: '',
        price: '',
        rating: '',
        reviews: ''
    });
    const [editId, setEditId] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // STATE BARU: Untuk menyimpan ID data yang dicentang & File yang diupload
    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null); // Menampung file gambar fisik

    const showAlert = (message) => {
        setAlertMessage(message);
        setTimeout(() => setAlertMessage(''), 3000);
    };

    const fetchCourses = async () => {
        setIsLoading(true);
        const dataAPI = await getData();
        dispatch(setCourses(dataAPI));
        setIsLoading(false);
    };

    useEffect(() => {
        fetchCourses();
    }, [dispatch]);

    // FUNGSI CHECKBOX: Pilih satu data
    const handleCheckboxChange = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(item => item !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    // FUNGSI CHECKBOX: Pilih semua data di tabel
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = courses.map(course => course.id);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

    const handleBulkDelete = async () => {
        if (window.confirm(`Apakah Anda yakin ingin menghapus ${selectedIds.length} data terpilih?`)) {
            setIsLoading(true);
            try {
                await Promise.all(selectedIds.map(id => deleteData(id)));
                await fetchCourses();
                setSelectedIds([]);
                showAlert('🗑️ Data terpilih berhasil dihapus!');
            } catch (error) {
                console.error("Gagal menghapus data masal:", error);
                showAlert('❌ Gagal menghapus beberapa data.');
            }
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        let finalImageUrl = formData.image; // Gunakan URL lama secara default (berguna saat edit)

        // 1. PROSES UPLOAD GAMBAR JIKA ADA FILE YANG DIPILIH
        if (selectedFile) {
            const uploadData = new FormData();
            // PENTING: Ubah 'image' menjadi 'file' jika di Postman Anda menggunakan key 'file'
            uploadData.append('image', selectedFile);

            try {
                // 👈 PENAMBAHAN TOKEN DIMULAI DI SINI
                const token = localStorage.getItem('token');

                const uploadRes = await fetch('http://localhost:3000/upload', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: uploadData
                });
                // 👈 PENAMBAHAN TOKEN SELESAI DI SINI

                const resData = await uploadRes.json();

                if (uploadRes.ok) {
                    // Sesuaikan ini dengan struktur response backend Anda. 
                    // Biasanya backend mengembalikan nama file (misal: resData.filename atau resData.data.filename)
                    const filename = resData.filename || resData.data?.filename || resData.file;
                    finalImageUrl = `http://localhost:3000/upload/${filename}`;
                } else {
                    showAlert('❌ Gagal mengunggah gambar cover!');
                    setIsLoading(false);
                    return; // Hentikan proses simpan jika upload gagal
                }
            } catch (error) {
                console.error("Error upload:", error);
                showAlert('❌ Terjadi kesalahan koneksi saat unggah gambar!');
                setIsLoading(false);
                return;
            }
        }

        // 2. PROSES SIMPAN DATA KELAS KE DATABASE
        const randomImgId = Math.floor(Math.random() * 70) + 1;
        const payload = {
            ...formData,
            price: Number(formData.price),
            rating: formData.rating || "0.0",
            reviews: formData.reviews || "0",
            image: finalImageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
            avatar: formData.avatar || `https://i.pravatar.cc/150?img=${randomImgId}`
        };

        if (editId) {
            await editData(editId, payload);
            showAlert('✅ Data diperbarui!');
        } else {
            await addData(payload);
            showAlert('✅ Data ditambahkan!');
        }

        // 3. RESET FORM
        await fetchCourses();
        setEditId(null);
        setIsFormOpen(false);
        setSelectedFile(null); // Bersihkan file yang dipilih
        setFormData({ title: '', description: '', image: '', avatar: '', instructor: '', role: '', price: '', rating: '', reviews: '' });
        setIsLoading(false);
    };

    const handleEdit = (course) => {
        setFormData({
            title: course.title,
            description: course.description || '',
            instructor: course.instructor,
            role: course.role || '',
            price: course.price,
            image: course.image || '',
            avatar: course.avatar || '',
            rating: course.rating || '',
            reviews: course.reviews || ''
        });
        setEditId(course.id);
        setSelectedFile(null); // Pastikan input file kosong saat mulai edit
        setIsFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Hapus kelas ini?')) {
            setIsLoading(true);
            await deleteData(id);
            await fetchCourses();
            showAlert('🗑️ Data dihapus!');
            setIsLoading(false);
        }
    };

    // Fungsi tambahan untuk membersihkan state form saat dibatalkan
    const handleCloseForm = () => {
        setIsFormOpen(false);
        setSelectedFile(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            {alertMessage && (
                <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg z-50 text-sm font-bold">
                    {alertMessage}
                </div>
            )}

            <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-900 text-white">
                    <h1 className="text-xl font-bold">Admin Dashboard - Kelola Kelas</h1>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/"
                            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-sm font-medium transition shadow-sm flex items-center gap-2 border border-gray-500"
                        >
                            🏠 Lihat Beranda
                        </Link>

                        {selectedIds.length > 0 && (
                            <button
                                onClick={handleBulkDelete}
                                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition shadow-sm flex items-center gap-2"
                                disabled={isLoading}
                            >
                                🗑️ Hapus ({selectedIds.length}) Terpilih
                            </button>
                        )}

                        <button
                            onClick={() => { setEditId(null); setFormData({ title: '', description: '', image: '', avatar: '', instructor: '', role: '', price: '', rating: '', reviews: '' }); setSelectedFile(null); setIsFormOpen(true); }}
                            className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md text-sm font-medium transition"
                        >
                            + Tambah Kelas Baru
                        </button>
                    </div>
                </div>

                <div className="p-6 overflow-x-auto">
                    {isLoading ? <p className="text-center py-10">Loading data...</p> : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b-2 border-gray-200 text-gray-600">
                                    <th className="py-3 px-4 w-10 text-center">
                                        <input
                                            type="checkbox"
                                            onChange={handleSelectAll}
                                            checked={courses && courses.length > 0 && selectedIds.length === courses.length}
                                            className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500 cursor-pointer"
                                        />
                                    </th>
                                    <th className="py-3 px-4">Gambar</th>
                                    <th className="py-3 px-4">Judul Kelas</th>
                                    <th className="py-3 px-4">Instruktur & Role</th>
                                    <th className="py-3 px-4 text-center">Rating</th>
                                    <th className="py-3 px-4">Harga</th>
                                    <th className="py-3 px-4 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses?.map(course => (
                                    <tr key={course.id} className={`border-b border-gray-100 hover:bg-gray-50 ${selectedIds.includes(course.id) ? 'bg-orange-50/50' : ''}`}>
                                        <td className="py-3 px-4 text-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(course.id)}
                                                onChange={() => handleCheckboxChange(course.id)}
                                                className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500 cursor-pointer"
                                            />
                                        </td>
                                        <td className="py-3 px-4">
                                            <img src={course.image} alt="cover" className="w-16 h-10 object-cover rounded" />
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="font-medium text-gray-800 line-clamp-1">{course.title}</div>
                                            <div className="text-xs text-gray-500 line-clamp-1">{course.description || '-'}</div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="text-gray-800 font-medium">{course.instructor}</div>
                                            <div className="text-xs text-gray-500">{course.role || '-'}</div>
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <div className="text-sm font-medium text-yellow-500">⭐ {course.rating || '0.0'}</div>
                                            <div className="text-xs text-gray-400">({course.reviews || '0'} ulasan)</div>
                                        </td>
                                        <td className="py-3 px-4 text-green-600 font-medium">
                                            Rp {Number(course.price || 0).toLocaleString('id-ID')}
                                        </td>
                                        <td className="py-3 px-4 flex justify-center gap-2">
                                            <button onClick={() => handleEdit(course)} className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs font-bold hover:bg-blue-200">Edit</button>
                                            <button onClick={() => handleDelete(course.id)} className="bg-red-100 text-red-700 px-3 py-1 rounded text-xs font-bold hover:bg-red-200">Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* MODAL FORM OVERLAY */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm overflow-y-auto">
                    <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8 my-auto">
                        <h2 className="text-xl font-bold mb-6">{editId ? 'Edit Kelas' : 'Tambah Kelas Baru'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Judul Kelas</label>
                                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-orange-500" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Deskripsi Kelas</label>
                                <textarea rows="3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-orange-500" placeholder="Tuliskan deskripsi singkat kelas..."></textarea>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* INPUT FILE GAMBAR */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Gambar Cover (Upload)</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setSelectedFile(e.target.files[0])}
                                        className="w-full mt-1 p-1.5 border rounded-md focus:ring-2 focus:ring-orange-500 text-sm"
                                    />
                                    {editId && formData.image && !selectedFile && (
                                        <p className="text-xs text-gray-500 mt-1">Biarkan kosong jika tidak ingin mengubah gambar saat ini.</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">URL Avatar Instruktur</label>
                                    <input type="text" value={formData.avatar} onChange={(e) => setFormData({ ...formData, avatar: e.target.value })} className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-orange-500" placeholder="https://i.pravatar.cc/..." />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Nama Instruktur</label>
                                    <input type="text" required value={formData.instructor} onChange={(e) => setFormData({ ...formData, instructor: e.target.value })} className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-orange-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Peran/Jabatan Instruktur (Role)</label>
                                    <input type="text" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-orange-500" placeholder="Contoh: Senior Accountant di Gojek" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Rating (Cth: 3.5)</label>
                                    <input type="text" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-orange-500" placeholder="3.5" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Jumlah Review (Cth: 86)</label>
                                    <input type="text" value={formData.reviews} onChange={(e) => setFormData({ ...formData, reviews: e.target.value })} className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-orange-500" placeholder="86" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Harga (Rp)</label>
                                <input type="number" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-orange-500" />
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button type="button" onClick={handleCloseForm} className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium">Batal</button>
                                <button type="submit" disabled={isLoading} className="px-6 py-2 bg-orange-500 text-white rounded-md font-bold hover:bg-orange-600">{isLoading ? 'Loading...' : 'Simpan Data'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}