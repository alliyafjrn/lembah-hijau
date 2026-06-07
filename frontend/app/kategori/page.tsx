"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import {
  getKategori,
  createKategori,
  deleteKategori,
} from "@/services/kategori";

export default function KategoriPage() {
    const [kategori, setKategori] = useState<any[]>([]);

    useEffect(() => {
        loadKategori();
    }, []);

    async function loadKategori() {
        const response = await getKategori();
        console.log(response);
        setKategori(response.data);
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

                    <table className="w-full border">
                        <thead>
                            <tr>
                                <th className="border p-2">ID</th>
                                <th className="border p-2">Nama</th>
                                <th className="border p-2">Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {kategori.map((item) => (
                                <tr key={item.id}>
                                    <td className="border p-2">
                                        {item.id}
                                    </td>

                                    <td className="border p-2">
                                        {item.nama}
                                    </td>

                                    <td className="border p-2">
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}