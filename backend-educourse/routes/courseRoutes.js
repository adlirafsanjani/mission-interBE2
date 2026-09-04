const express = require('express');
const router = express.Router();
const courseService = require('../services/courseService');
const verifyToken = require('../middleware/authMiddleware'); // 👈 IMPORT MIDDLEWARE JWT

// 1. GET /course : Mengambil semua data (Read All + Query Params)
// 👉 Tambahkan verifyToken untuk proteksi
router.get('/', verifyToken, async (req, res) => {
    try {
        // 👉 Kirim req.query untuk menangani search, filter, dan sort
        const courses = await courseService.getAllCourses(req.query);
        res.status(200).json({
            message: "Sukses mengambil data",
            total: courses.length,
            data: courses
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. GET /course/:id : Mengambil satu data berdasarkan ID
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const course = await courseService.getCourseById(req.params.id);
        if (!course) return res.status(404).json({ message: "Data tidak ditemukan" });
        res.status(200).json({ message: "Sukses", data: course });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. POST /course : Menambahkan data baru
router.post('/', verifyToken, async (req, res) => {
    try {
        await courseService.addCourse(req.body);
        res.status(201).json({ message: "Sukses menambahkan data kelas" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. PATCH /course/:id : Mengubah data berdasarkan ID
router.patch('/:id', verifyToken, async (req, res) => {
    try {
        await courseService.updateCourse(req.params.id, req.body);
        res.status(200).json({ message: "Sukses mengubah data kelas" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. DELETE /course/:id : Menghapus data berdasarkan ID
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await courseService.deleteCourse(req.params.id);
        res.status(200).json({ message: "Sukses menghapus data kelas" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;