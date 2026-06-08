"use client";

import { useEffect, useState } from "react";
import { getWisata } from "@/services/wisata";
import Link from "next/link";

export default function WisataUserPage() {
  const [wisata, setWisata] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWisata();
  }, []);

  async function loadWisata() {
    try {
      const response = await getWisata();
      console.log("Cek struktur data API Wisata:", response);

      // Antisipasi segala jenis bentuk pembungkusan array dari backend
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
      console.error("Gagal memuat data wisata:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-600 font-semibold animate-pulse">
          Memuat data wisata...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">
      <h1 className="text-4xl font-bold text-green-700 mb-8">
        Daftar Wisata Lembah Hijau
      </h1>

      {wisata && wisata.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-5">
          {wisata.map((item: any) => (
            <Link 
              href={`/wisata-user/${item.id}`} 
              key={item.id} 
              className="block"
            >
              <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition h-full border border-gray-200">
                <h2 className="text-xl font-bold mb-2 text-green-800">
                  {item.nama}
                </h2>
                <p className="text-gray-600 line-clamp-3">
                  {item.deskripsi || "Tidak ada deskripsi."}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow border border-gray-200">
          <p className="text-gray-500 text-lg font-medium">
            Belum ada data wisata yang tersedia.
          </p>
        </div>
      )}
    </div>
  );
}