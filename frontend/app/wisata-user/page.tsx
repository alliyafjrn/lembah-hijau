"use client";

import { useEffect, useState } from "react";
import { getWisata } from "@/services/wisata";

export default function WisataUserPage() {
  const [wisata, setWisata] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWisata();
  }, []);

  async function loadWisata() {
    try {
      const response = await getWisata();
      console.log("Response API Wisata:", response); // Untuk ngecek strukturnya di console log browser
      
      // Mengantisipasi jika response berupa { data: [...] } atau langsung [...]
      if (response && response.data) {
        setWisata(response.data);
      } else if (Array.isArray(response)) {
        setWisata(response);
      }
    } catch (error) {
      console.error("Gagal memuat data wisata:", error);
    } finally {
      setLoading(false);
    }
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
      
      {wisata && wisata.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-5">
          {wisata.map((item: any) => (
            <div key={item.id} className="bg-white p-5 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition">
              <h2 className="text-xl font-bold mb-2 text-green-800">{item.nama}</h2>
              <p className="text-gray-600 line-clamp-3">{item.deskripsi || "Tidak ada deskripsi."}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow">
          <p className="text-gray-500 text-lg">Belum ada data wisata yang tersedia.</p>
        </div>
      )}
    </div>
  );
}