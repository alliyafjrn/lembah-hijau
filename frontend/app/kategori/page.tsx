"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import {
    getKategori,
    createKategori,
    updateKategori,
    deleteKategori,
} from "@/services/kategori";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function KategoriPage() {
    const [kategori, setKategori] = useState<any[]>([]);
    const [nama, setNama] = useState("");
    const [editId, setEditId] = useState<number | null>(null);

    useEffect(() => {
        loadKategori();
    }, []);

    async function loadKategori() {
        try {
            const response = await getKategori();
            setKategori(response.data || response);
        } catch (error) {
            console.error("Gagal memuat kategori:", error);
        }
    }

    function handleEdit(item: any) {
        setEditId(item.id);
        setNama(item.nama);
    }

    async function handleSubmit() {
        if (!nama.trim()) return alert("Nama kategori tidak boleh kosong");

        try {
            if (editId) {
                await updateKategori(editId, nama);
                setEditId(null);
            } else {
                await createKategori(nama);
            }
            setNama("");
            loadKategori();
        } catch (error) {
            console.error("Gagal menyimpan kategori:", error);
        }
    }

    async function handleDelete(id: number) {
        const confirmDelete = confirm("Yakin ingin menghapus kategori?");
        if (!confirmDelete) return;

        try {
            await deleteKategori(id);
            loadKategori();
        } catch (error) {
            console.error("Gagal menghapus kategori:", error);
        }
    }

    return (
        <ProtectedRoute>
            <div className="flex min-h-screen bg-gray-100 text-black">
                <Sidebar />

                <div className="flex-1 flex flex-col">
                    <Navbar />

                    <div className="p-8 bg-gray-100 min-h-screen">
                        <h1 className="text-3xl font-bold mb-6 text-green-700">Data Kategori</h1>

                        <div className="mb-5 flex gap-2">
                            <input
                                type="text"
                                placeholder="Nama Kategori"
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                className="border p-3 rounded-lg text-black shadow-sm w-80"
                            />

                            <button
                                onClick={handleSubmit}
                                className="bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-lg"
                            >
                                {editId ? "Update" : "Tambah"}
                            </button>

                            {editId && (
                                <button
                                    onClick={() => {
                                        setEditId(null);
                                        setNama("");
                                    }}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                                >
                                    Batal
                                </button>
                            )}
                        </div>

                        <div className="bg-white rounded shadow overflow-hidden">
                            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="border-b p-3 text-left w-20">ID</th>
                                        <th className="border-b p-3 text-left">Nama Kategori</th>
                                        <th className="border-b p-3 text-center w-48">Aksi</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {kategori && kategori.length > 0 ? (
                                        kategori.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-100">
                                                <td className="p-3 border-b">{item.id}</td>
                                                <td className="p-3 border-b">{item.nama}</td>
                                                <td className="p-3 text-center border-b">
                                                    <button
                                                        onClick={() => handleEdit(item)}
                                                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600 transition"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                                                    >
                                                        Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={3} className="p-8 text-center text-gray-500">
                                                Belum ada data kategori.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}