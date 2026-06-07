"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import {
  getKategori,
  createKategori,
  deleteKategori,
  updateKategori,
} from "@/services/kategori";

export default function KategoriPage() {
    const [kategori, setKategori] = useState<any[]>([]);
    const [nama, setNama] = useState("");
    const [editId, setEditId] = useState<number | null>(null);

    useEffect(() => {
        loadKategori();
    }, []);

    async function loadKategori() {
        const response = await getKategori();
        console.log(response);
        setKategori(response.data);
    }

    function handleEdit(item: any) {
        setEditId(item.id);
        setNama(item.nama);
    }

    async function handleSubmit() {
        if (editId) {
            await updateKategori(
                editId,
                nama
            );

            setEditId(null);
        } else {
            await createKategori(nama);
        }

        setNama("");

        loadKategori();
    }

    async function handleDelete(id: number) {
        const confirmDelete = confirm(
            "Yakin ingin menghapus kategori?"
        );

        if (!confirmDelete) return;

        await deleteKategori(id);

        loadKategori();
    }

    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1">
                <Navbar />

                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-5">
                        Data Kategori
                    </h1>

                    <div className="mb-5 flex gap-2">
                      <input
                        type="text"
                        placeholder="Nama Kategori"
                        value={nama}
                        onChange={(e) =>
                          setNama(e.target.value)
                        }
                        className="border p-2 rounded text-black"
                      />

                      <button
                        onClick={handleSubmit}
                        className="bg-green-700 text-white px-4 py-2 rounded"
                      >
                        {editId ? "Update" : "Tambah"}
                      </button>
                    </div>

                    <table className="w-full border">
                        <thead>
                            <tr>
                                <th className="border p-2 text-left">ID</th>
                                <th className="border p-2 text-left">Nama</th>
                                <th className="border p-2 text-center w-48">Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {kategori && kategori.length > 0 ? (
                                kategori.map((item) => (
                                    <tr key={item.id}>
                                        <td className="border p-2">
                                            {item.id}
                                        </td>

                                        <td className="border p-2">
                                            {item.nama}
                                        </td>

                                        <td className="border p-2 text-center">
                                            <button
                                                onClick={() =>
                                                    handleEdit(item)
                                                }
                                                className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                                className="bg-red-600 text-white px-3 py-1 rounded"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="border p-4 text-center text-gray-500">
                                        Belum ada data kategori.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}