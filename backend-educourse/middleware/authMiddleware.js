const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Mengambil token dari Bearer Token

    if (!token) {
        return res.status(401).json({ message: 'Akses ditolak, token tidak ditemukan' });
    }

    try {
        const verified = jwt.verify(token, 'RAHASIA_KODE_SUPAYA_AMAN'); // Sesuaikan kunci rahasia dengan yang di login
        req.user = verified;
        next(); // Lanjut ke controller/endpoint berikutnya
    } catch (error) {
        res.status(403).json({ message: 'Token tidak valid atau sudah kedaluwarsa' });
    }
};

module.exports = verifyToken;