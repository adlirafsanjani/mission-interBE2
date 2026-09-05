import axios from 'axios';

// Mengambil URL dari file .env
const API_URL = import.meta.env.VITE_API_URL;

// 1. Fungsi Get API
export const getData = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Gagal mengambil data:", error);
        return [];
    }
};

// 2. Fungsi Add API
export const addData = async (newData) => {
    try {
        const response = await axios.post(API_URL, newData);
        return response.data;
    } catch (error) {
        console.error("Gagal menambah data:", error);
    }
};

// 3. Fungsi Edit API
export const editData = async (id, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Gagal mengupdate data:", error);
    }
};

// 4. Fungsi Delete API
export const deleteData = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Gagal menghapus data:", error);
    }
};