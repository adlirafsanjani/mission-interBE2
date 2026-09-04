const multer = require('multer');
const path = require('path');

// Konfigurasi tempat penyimpanan dan penamaan file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/'); // 👈 Pastikan folder 'upload' sudah ada di root backend Anda
    },
    filename: function (req, file, cb) {
        // Membuat nama file unik dengan menambahkan timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Filter hanya menerima file gambar
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Hanya file gambar yang diperbolehkan!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Maksimal ukuran 5MB
});

module.exports = upload;