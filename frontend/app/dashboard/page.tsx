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
        maxHeight: "100vh",
        overflow: "hidden",
        backgroundColor: "#f9fafb", 
        fontFamily: "sans-serif" 
      }}>
        
        <div style={{ display: "flex", minHeight: "100vh", zIndex: 10 }}>
          <Sidebar />
        </div>

        <div style={{ 
          flex: 1, 
          display: "flex", 
          flexDirection: "column",
          height: "100vh",
          overflowY: "auto"
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
            
            {/* STEP 8: Grid Card Statistik */}
            <div style={{
              display: "flex",
              gap: "24px",
              flexWrap: "wrap",
              maxWidth: "900px",
              marginBottom: "40px"
            }}>
              
              <div style={{
                flex: "1 1 280px",
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
                <div>
                  <h2 style={{ fontSize: "13px", fontWeight: "600", color: "#9ca3af", margin: "0 0 6px 0", textTransform: "uppercase", tracking: "1px" }}>
                    Total Kategori
                  </h2>
                  <p style={{ fontSize: "36px", fontWeight: "800", color: "#15803d", margin: 0 }}>
                    {loading ? "..." : totalKategori}
                  </p>
                </div>
                <div style={{ backgroundColor: "#f0fdf4", padding: "12px", borderRadius: "12px", color: "#16a34a" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: "28px", height: "28px" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.008 1.24l.885 1.77a2.25 2.25 0 002.007 1.24h1.98a2.25 2.25 0 002.007-1.24l.885-1.77a2.25 2.25 0 012.007-1.24h3.86m-18 0h18a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v4.5A2.25 2.25 0 002.25 13.5zm0 0V16.5A2.25 2.25 0 004.5 18.75h15A2.25 2.25 0 0021.75 16.5v-3m-19.5 0l-.25-2.25" />
                  </svg>
                </div>
              </div>

              <div style={{
                flex: "1 1 280px",
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
                <div>
                  <h2 style={{ fontSize: "13px", fontWeight: "600", color: "#9ca3af", margin: "0 0 6px 0", textTransform: "uppercase", tracking: "1px" }}>
                    Total Wisata
                  </h2>
                  <p style={{ fontSize: "36px", fontWeight: "800", color: "#15803d", margin: 0 }}>
                    {loading ? "..." : totalWisata}
                  </p>
                </div>
                <div style={{ backgroundColor: "#f0fdf4", padding: "12px", borderRadius: "12px", color: "#16a34a" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: "28px", height: "28px" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.684A1.125 1.125 0 003 6.71v12.064c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                  </svg>
                </div>
              </div>

            </div>

            {/* STEP 9: Dashboard Quick Menu */}
            <div style={{ marginBottom: "16px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#374151", margin: "0 0 16px 0" }}>
                Akses Cepat Menu Navigasi
              </h3>
            </div>

            <div style={{
              display: "flex",
              gap: "24px",
              flexWrap: "wrap",
              maxWidth: "900px"
            }}>
              <Link
                href="/kategori"
                style={{
                  flex: "1 1 280px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "20px 24px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#1f2937",
                  textDecoration: "none",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#15803d";
                  e.currentTarget.style.color = "#15803d";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.color = "#1f2937";
                }}
              >
                <span>Kelola Data Kategori</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" style={{ width: "18px", height: "18px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>

              <Link
                href="/wisata"
                style={{
                  flex: "1 1 280px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "20px 24px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#1f2937",
                  textDecoration: "none",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#15803d";
                  e.currentTarget.style.color = "#15803d";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.color = "#1f2937";
                }}
              >
                <span>Kelola Data Wisata</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" style={{ width: "18px", height: "18px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}