const db = require('../config/database');

// 1. SELECT: Mengambil semua data (Read All)
const getAllCourses = async () => {
    const [rows] = await db.query('SELECT * FROM courses');
    return rows;
};

// 2. SELECT BY ID: Mengambil satu data spesifik (Read One)
const getCourseById = async (id) => {
    const [rows] = await db.query('SELECT * FROM courses WHERE id = ?', [id]);
    return rows[0];
};

// 3. INSERT: Menambahkan data baru (Create)
const addCourse = async (data) => {
    const { title, description, price } = data;
    const [result] = await db.query(
        'INSERT INTO courses (title, description, price) VALUES (?, ?, ?)',
        [title, description, price]
    );
    return result;
};

// 4. UPDATE: Mengubah data spesifik (Update)
const updateCourse = async (id, data) => {
    const { title, description, price } = data;
    const [result] = await db.query(
        'UPDATE courses SET title = ?, description = ?, price = ? WHERE id = ?',
        [title, description, price, id]
    );
    return result;
};

// 5. DELETE: Menghapus data spesifik (Delete)
const deleteCourse = async (id) => {
    const [result] = await db.query('DELETE FROM courses WHERE id = ?', [id]);
    return result;
};

module.exports = {
    getAllCourses,
    getCourseById,
    addCourse,
    updateCourse,
    deleteCourse
};