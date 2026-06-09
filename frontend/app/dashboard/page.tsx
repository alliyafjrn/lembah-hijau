"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getKategori } from "@/services/kategori";
import { getWisata } from "@/services/wisata";


export default function DashboardPage() {
  const [totalKategori, setTotalKategori] = useState(0);
  const [totalWisata, setTotalWisata] = useState(0);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    loadStatistik();
  }, []);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const kategoriResponse =
      await getKategori();

    const wisataResponse =
      await getWisata();

    setTotalKategori(
      kategoriResponse.data.length
    );

    setTotalWisata(
      wisataResponse.data.length
    );
  }

  async function loadStatistik() {
    try {
      setLoading(true);
      const kategori = await getKategori();
      const wisata = await getWisata();

      const listKategori = kategori && (Array.isArray(kategori) ? kategori : kategori.data) || [];
      const listWisata = wisata && (Array.isArray(wisata) ? wisata : wisata.data) || [];

      setTotalKategori(listKategori.length);
      setTotalWisata(listWisata.length);
    } catch (error) {
      console.error("Gagal memuat data statistik dashboard:", error);
      setTotalKategori(0);
      setTotalWisata(0);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProtectedRoute>
      <div style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        fontFamily: "sans-serif",
        flexDirection: "row" // Default desktop
      }}>

        {/* Sidebar - Menggunakan media query via CSS atau class Tailwind jika memungkinkan, 
            namun di sini kita gunakan inline flex agar fleksibel */}
        <div style={{ display: "flex" }}>
          <Sidebar />
        </div>

        {/* Konten Utama */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0 // Penting agar konten tidak meluap
        }}>

          <Navbar />

          <div style={{ padding: "40px 32px", boxSizing: "border-box" }}>

            <div style={{ marginBottom: "32px" }}>
              <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1f2937", margin: "0 0 6px 0" }}>
                Dashboard Ringkasan
              </h1>
              <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
                Selamat datang kembali, Admin! Berikut adalah data statistik terbaru kawasan Lembah Hijau.
              </p>
            </div>

            {/* Grid Card Statistik - Responsif dengan flex-wrap */}
            <div className="grid md:grid-cols-2 gap-5 mb-10">
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-gray-500">Total Kategori</h2>
                <p className="text-4xl font-bold text-green-700">
                  {loading ? "..." : totalKategori}
                  
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-gray-500">Total Wisata</h2>
                <p className="text-4xl font-bold text-blue-700">
                  {loading ? "..." : totalWisata}
                </p>
              </div>
            </div>

            {/* Quick Menu */}
            <div style={{ marginBottom: "16px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#374151", margin: "0 0 16px 0" }}>
                Akses Cepat Menu Navigasi
              </h3>
            </div>

            <div style={{
              display: "flex",
              gap: "24px",
              flexWrap: "wrap"
            }}>
              <Link href="/kategori" style={quickLinkStyle}>
                <span>Kelola Data Kategori</span>
              </Link>

              <Link href="/wisata" style={quickLinkStyle}>
                <span>Kelola Data Wisata</span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

const quickLinkStyle: React.CSSProperties = {
  flex: "1 1 250px",
  backgroundColor: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  padding: "20px 24px",
  fontSize: "15px",
  fontWeight: "600",
  color: "#1f2937",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
};