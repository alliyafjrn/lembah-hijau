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
      setTotalKategori(0);
      setTotalWisata(0);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProtectedRoute>
      <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "sans-serif", flexDirection: "row" }}>
        <div style={{ display: "flex" }}>
          <Sidebar />
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <Navbar />

          <div style={{ padding: "40px 32px", boxSizing: "border-box" }}>
            <div style={{ marginBottom: "32px" }}>
              <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#0f172a", margin: "0 0 6px 0", letterSpacing: "-0.5px" }}>
                Dashboard Ringkasan
              </h1>
              <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
                Selamat datang kembali, Admin! Berikut adalah data statistik terbaru kawasan Lembah Hijau.
              </p>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", marginBottom: "40px" }}>
              <div style={{ flex: "1 1 240px", backgroundColor: "#ffffff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "#64748b" }}>Total Kategori</span>
                  <span style={{ fontSize: "20px" }}>🗂️</span>
                </div>
                <p style={{ margin: 0, fontSize: "36px", fontWeight: "800", color: "#166534" }}>
                  {loading ? "..." : totalKategori}
                </p>
              </div>

              <div style={{ flex: "1 1 240px", backgroundColor: "#ffffff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "#64748b" }}>Total Wisata</span>
                  <span style={{ fontSize: "20px" }}>🌴</span>
                </div>
                <p style={{ margin: 0, fontSize: "36px", fontWeight: "800", color: "#166534" }}>
                  {loading ? "..." : totalWisata}
                </p>
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                Akses Cepat Menu Navigasi
              </h3>
            </div>

            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <Link href="/kategori" style={quickLinkStyle}>
                <span>Kelola Data Kategori</span>
                <span>➔</span>
              </Link>

              <Link href="/wisata" style={quickLinkStyle}>
                <span>Kelola Data Wisata</span>
                <span>➔</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

const quickLinkStyle: React.CSSProperties = {
  flex: "1 1 240px",
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "14px",
  padding: "20px 24px",
  fontSize: "14px",
  fontWeight: "600",
  color: "#0f172a",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
};