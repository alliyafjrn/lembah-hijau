"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getKategori } from "@/services/kategori";
import { getWisata } from "@/services/wisata";

export default function DashboardPage() {
  const [totalKategori, setTotalKategori] = useState(0);
  const [totalWisata, setTotalWisata] = useState(0);

  useEffect(() => {
    loadStatistik();
  }, []);

  async function loadStatistik() {
    try {
      const kategori = await getKategori();
      const wisata = await getWisata();

      // Validasi pengaman agar tidak crash jika respon API null/undefined
      const listKategori = kategori && (Array.isArray(kategori) ? kategori : kategori.data) || [];
      const listWisata = wisata && (Array.isArray(wisata) ? wisata : wisata.data) || [];

      setTotalKategori(listKategori.length);
      setTotalWisata(listWisata.length);
    } catch (error) {
      console.error("Gagal memuat data statistik dashboard:", error);
      // Jika API gagal, set angka ke 0 saja agar dashboard tidak crash/menendang ke login
      setTotalKategori(0);
      setTotalWisata(0);
    }
  }

  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Navbar />
          
          <div className="p-6">
            <h1 className="text-3xl font-bold text-black mb-6">
              Dashboard
            </h1>
            
            {/* Grid Card Statistik */}
            <div className="grid grid-cols-2 gap-5 max-w-2xl">
              <div className="border p-5 rounded shadow-sm bg-white text-black">
                <h2 className="text-gray-500 font-medium mb-1">
                  Total Kategori
                </h2>
                <p className="text-3xl font-bold text-green-700">
                  {totalKategori}
                </p>
              </div>

              <div className="border p-5 rounded shadow-sm bg-white text-black">
                <h2 className="text-gray-500 font-medium mb-1">
                  Total Wisata
                </h2>
                <p className="text-3xl font-bold text-green-700">
                  {totalWisata}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}