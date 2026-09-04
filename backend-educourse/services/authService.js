const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require('../config/mailer');

const register = async (req, res) => {
    const { fullname, username, email, password } = req.body;

    try {
        // 1. Enkripsi Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 2. Simpan ke database
        const [result] = await pool.query(
            'INSERT INTO users (fullname, username, email, password) VALUES (?, ?, ?, ?)',
            [fullname, username, email, hashedPassword]
        );

        // 3. Kirim Email Otomatis menggunakan Nodemailer
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Selamat Datang di EduCourse!',
            html: `<h3>Halo ${fullname},</h3>
                   <p>Terima kasih telah mendaftar di EduCourse. Akun dengan username <b>${username}</b> berhasil dibuat.</p>
                   <p>Silakan mulai jelajahi kursus menarik yang tersedia!</p>`
        };

        await transporter.sendMail(mailOptions);

        // 4. Kirim respon sukses ke client
        res.status(201).json({
            success: true,
            message: "Registrasi berhasil dan email sambutan telah dikirim!",
            data: {
                id: result.insertId,
                email: email,
                username: username
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
    }
};

// FUNGSI LOGIN
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // 1. Cari user berdasarkan username
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Username atau password salah' });
        }

        const user = rows[0];

        // 2. Cocokkan password yang diinput dengan database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Username atau password salah' });
        }

        // 3. Buat Token JWT (berlaku 1 hari)
        const token = jwt.sign(
            { id: user.id, username: user.username },
            'RAHASIA_KODE_SUPAYA_AMAN',
            { expiresIn: '1d' }
        );

        // 4. Respon sukses login
        res.status(200).json({
            success: true,
            message: "Login berhasil!",
            token: token,
            data: {
                id: user.id,
                fullname: user.fullname,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
    }
};

module.exports = { register, login };