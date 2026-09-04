const express = require('express');
const router = express.Router();
const upload = require('../services/uploadService');
const verifyToken = require('../middleware/authMiddleware'); // Opsional: jika ingin upload harus login dulu

// Endpoint POST /upload (menggunakan upload.single('image') karena hanya 1 file)
router.post('/', verifyToken, upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Tidak ada file gambar yang diunggah' });
        }

        res.status(200).json({
            success: true,
            message: "Upload gambar berhasil!",
            data: {
                filename: req.file.filename,
                path: req.file.path,
                size: req.file.size
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat upload', error: error.message });
    }
});

module.exports = router;