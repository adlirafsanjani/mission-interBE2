const express = require('express');
const cors = require('cors'); // 👈 TAMBAHKAN INI UNTUK CORS
require('dotenv').config();
const db = require('./config/database');
const courseRoutes = require('./routes/courseRoutes');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes'); // 👈 TAMBAHKAN INI UNTUK UPLOAD

const app = express();
const PORT = process.env.PORT || 3000; // 👈 Otomatis mendukung port dari environment (Render/Railway)

app.use(cors()); // 👈 TAMBAHKAN INI AGAR FRONTEND BISA AKSES API
app.use(express.json());

// Membuat folder 'upload' bisa diakses publik (agar gambar bisa dilihat/ditampilkan)
app.use('/upload', express.static('upload')); // 👈 TAMBAHKAN INI

app.use('/course', courseRoutes);
app.use('/auth', authRoutes);
app.use('/upload', uploadRoutes); // 👈 TAMBAHKAN INI UNTUK RUTE UPLOAD

db.getConnection()
    .then(() => {
        console.log('✅ Database berhasil terhubung!');
        app.listen(PORT, () => {
            console.log(`🚀 Server berjalan di port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Gagal terhubung ke database:', err.message);
    });