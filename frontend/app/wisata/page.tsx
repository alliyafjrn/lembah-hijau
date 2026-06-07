"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { getWisata, createWisata, deleteWisata } from "@/services/wisata";
import { getKategori } from "@/services/kategori";

export default function WisataPage() {
  const [wisata, setWisata] = useState<any[]>([]);
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [kategoriId, setKategoriId] = useState("");
  const [kategori, setKategori] = useState<any[]>([]);

  useEffect(() => {
    loadWisata();
    loadKategori();
  }, []);

  async function loadWisata() {
    const response = await getWisata();
    setWisata(Array.isArray(response) ? response : response.data || []);
  }

  async function loadKategori() {
    const response = await getKategori();
    setKategori(Array.isArray(response) ? response : response.data || []);
  }

  async function handleSubmit() {
    if (!nama.trim() || !deskripsi.trim() || !kategoriId) {
      alert("Semua field termasuk kategori harus diisi!");
      return;
    }

    await createWisata(
      nama,
      deskripsi,
      Number(kategoriId)
    );

    setNama("");
    setDeskripsi("");
    setKategoriId("");

    loadWisata();
  }

  async function handleDelete(id: number) {
    const confirmDelete = confirm("Yakin ingin menghapus wisata?");
    if (!confirmDelete) return;

    await deleteWisata(id);
    loadWisata();
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-5">
            Data Wisata
          </h1>

          {/* Form Input Komponen */}
          <div className="mb-5 flex flex-col gap-2 max-w-md">
            <input
              type="text"
              placeholder="Nama Wisata"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="border p-2 rounded text-black"
            />

            <textarea
              placeholder="Deskripsi Wisata"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="border p-2 rounded text-black"
              rows={2}
            />

            <select
              value={kategoriId}
              onChange={(e) => setKategoriId(e.target.value)}
              className="border p-2 rounded text-black"
            >
              <option value="">Pilih Kategori</option>
              {kategori.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nama}
                </option>
              ))}
            </select>

            <button
              onClick={handleSubmit}
              className="bg-green-700 text-white px-4 py-2 rounded font-semibold mt-1"
            >
              Tambah
            </button>
          </div>

          {/* Tabel Komponen */}
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100 text-black">
                <th className="border p-2 text-left w-16">ID</th>
                <th className="border p-2 text-left w-1/3">Nama</th>
                <th className="border p-2 text-left">Deskripsi</th>
                <th className="border p-2 text-left w-24">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {wisata && wisata.length > 0 ? (
                wisata.map((item) => (
                  <tr key={item.id}>
                    <td className="border p-2">{item.id}</td>
                    <td className="border p-2">{item.nama}</td>
                    <td className="border p-2">{item.deskripsi}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="border p-4 text-center text-gray-500">
                    Belum ada data wisata.
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