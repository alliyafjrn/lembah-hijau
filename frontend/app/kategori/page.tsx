"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getKategori, createKategori, updateKategori, deleteKategori } from "@/services/kategori";

export default function KategoriPage() {
    const [kategori, setKategori] = useState<any[]>([]);
    const [nama, setNama] = useState("");
    const [editId, setEditId] = useState<number | null>(
        null,
    );

    useEffect(() => {
        loadKategori();
    }, []);

    async function handleSubmit() {
        if (editId) {
            await updateKategori(editId, nama);
            setEditId(null);
        } else {
            await createKategori(nama);
        }

        setNama("");
        loadKategori();
    }

    function handleEdit(item: any) {
        setEditId(item.id);
        setNama(item.nama);
    }

    async function handleDelete(id: number) {
        await deleteKategori(id);
        loadKategori();
    }

    async function loadKategori() {
        const response = await getKategori();
        console.log(response);
        setKategori(response.data);
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
                            className="border p-2 rounded"
                        />

                        <button
                            onClick={handleSubmit}
                            className="bg-green-700 text-white px-4 py-2 rounded"
                        >
                            Tambah
                        </button>
                    </div>

                    <table className="w-full border">
                        <thead>
                            <tr>
                                <th className="border p-2">ID</th>
                                <th className="border p-2">Nama</th>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}