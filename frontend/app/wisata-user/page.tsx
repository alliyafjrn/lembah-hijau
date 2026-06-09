"use client";

import { useEffect, useState } from "react";
import { getWisata } from "@/services/wisata";
import { getKategori } from "@/services/kategori";
import Link from "next/link";

export default function WisataUserPage() {
  const [wisata, setWisata] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedKategori, setSelectedKategori] = useState<number | null>(null);
  const [kategori, setKategori] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWisata();
    loadKategori();
  }, []);

  async function loadWisata() {
    try {
      const response = await getWisata();
      if (response && Array.isArray(response.data)) {
        setWisata(response.data);
      } else if (response && Array.isArray(response.result)) {
        setWisata(response.result);
      } else if (Array.isArray(response)) {
        setWisata(response);
      } else {
        setWisata([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function loadKategori() {
    const response = await getKategori();
    setKategori(response.data || []);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-600 font-semibold animate-pulse">Memuat data wisata...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">
      <h1 className="text-4xl font-bold text-green-700 mb-8">Daftar Wisata Lembah Hijau</h1>
      <input
        type="text"
        placeholder="Cari wisata..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 p-3 rounded-xl bg-white mb-6 w-full shadow-sm focus:ring-2 focus:ring-green-500 outline-none"
      />
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setSelectedKategori(null)}
          className={`px-5 py-2.5 rounded-full font-medium transition-all ${
            selectedKategori === null ? "bg-green-700 text-white shadow-lg scale-105" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          Semua
        </button>
        {kategori.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedKategori(item.id)}
            className={`px-5 py-2.5 rounded-full font-medium transition-all ${
              selectedKategori === item.id ? "bg-green-700 text-white shadow-lg scale-105" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {item.nama}
          </button>
        ))}
      </div>
      {wisata && wisata.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-6">
          {wisata
            .filter((item) => {
              const cocokNama = item.nama.toLowerCase().includes(search.toLowerCase());
              const cocokKategori = !selectedKategori || item.kategoriId === selectedKategori;
              return cocokNama && cocokKategori;
            })
            .map((item: any) => (
              <Link href={`/wisata-user/${item.id}`} key={item.id} className="block group">
                <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 h-full border border-gray-100">
                  {/* UKURAN FOTO DIUBAH DI SINI (Dari h-40 ke h-32) */}
                  <img
                    src={item.gambar || "https://placehold.co/600x400"}
                    alt={item.nama}
                    className="w-full h-32 object-cover rounded-lg mb-4 shadow-sm"
                  />
                  <h2 className="text-lg font-bold mb-1 text-green-800 group-hover:text-green-600 transition-colors">{item.nama}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2">{item.deskripsi || "Tidak ada deskripsi."}</p>
                </div>
              </Link>
            ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-lg font-medium">Belum ada data wisata yang tersedia.</p>
        </div>
      )}
    </div>
  );
}