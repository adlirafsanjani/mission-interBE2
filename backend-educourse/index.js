const express = require('express');
require('dotenv').config();
const db = require('./config/database');
const courseRoutes = require('./routes/courseRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use('/course', courseRoutes);

db.getConnection()
    .then(() => {
        console.log('✅ Database berhasil terhubung!');
        app.listen(PORT, () => {
            console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Gagal terhubung ke database:', err.message);
    });