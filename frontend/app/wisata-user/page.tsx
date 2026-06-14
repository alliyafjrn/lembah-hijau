"use client";

import { useEffect, useState } from "react";
import { getWisata } from "@/services/wisata";
import { getKategori } from "@/services/kategori";
import Link from "next/link";
import UserNavbar from "@/components/UserNavbar";
import Footer from "@/components/Footer";

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
    try {
      const response = await getKategori();
      setKategori(response.data || []);
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh", fontFamily: "sans-serif" }}>
        <p style={{ fontSize: "16px", color: "#475569", fontWeight: "600" }}>Memuat data wisata...</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f4f7f5", minHeight: "100vh", fontFamily: "sans-serif", display: "flex", flexDirection: "column" }}>
      <UserNavbar />

      <main style={{ flexGrow: 1, maxWidth: "1152px", margin: "0 auto", width: "100%", padding: "40px 24px", boxSizing: "border-box" }}>
        
        {/* Banner - Gradasi Hijau Selaras dengan Navbar */}
        <div style={{ background: "linear-gradient(135deg, #166534, #15803d)", color: "white", borderRadius: "24px", padding: "60px 32px", marginBottom: "48px", textAlign: "center", boxShadow: "0 10px 25px -5px rgba(22, 101, 52, 0.15)" }}>
          <h1 style={{ fontSize: "42px", fontWeight: "800", marginBottom: "16px", letterSpacing: "-1px" }}>
            Eksplorasi Destinasi Terbaik
          </h1>
          <p style={{ fontSize: "16px", maxWidth: "540px", margin: "0 auto", lineHeight: "1.6", color: "#dcfce7" }}>
            Temukan keindahan alam, keseruan wahana, dan berbagai pengalaman baru yang tak terlupakan bersama keluarga di Lembah Hijau.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "20px", marginBottom: "32px", borderBottom: "1px solid #e2e8f0", paddingBottom: "24px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            <button
              onClick={() => setSelectedKategori(null)}
              style={{
                padding: "8px 20px",
                borderRadius: "30px",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.15s ease",
                border: selectedKategori === null ? "none" : "1px solid #cbd5e1",
                backgroundColor: selectedKategori === null ? "#166534" : "#ffffff",
                color: selectedKategori === null ? "#ffffff" : "#475569",
              }}
            >
              Semua Destinasi
            </button>
            {kategori.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedKategori(item.id)}
                style={{
                  padding: "8px 20px",
                  borderRadius: "30px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  border: selectedKategori === item.id ? "none" : "1px solid #cbd5e1",
                  backgroundColor: selectedKategori === item.id ? "#166534" : "#ffffff",
                  color: selectedKategori === item.id ? "#ffffff" : "#475569",
                }}
              >
                {item.nama}
              </button>
            ))}
          </div>

          <div style={{ width: "100%", maxWidth: "300px" }}>
            <input
              type="text"
              placeholder="Cari destinasi wisata..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 16px",
                border: "1px solid #cbd5e1",
                borderRadius: "12px",
                fontSize: "14px",
                boxSizing: "border-box",
                outline: "none",
                backgroundColor: "#ffffff",
                boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
              }}
            />
          </div>
        </div>

        {wisata && wisata.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "32px", width: "100%" }}>
            {wisata
              .filter((item) => {
                const cocokNama = (item.nama || "").toLowerCase().includes(search.toLowerCase());
                const cocokKategori = !selectedKategori || item.kategoriId === selectedKategori;
                return cocokNama && cocokKategori;
              })
              .map((item: any) => (
                <Link href={`/wisata-user/${item.id}`} key={item.id} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                  <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.03), 0 2px 4px -1px rgba(0,0,0,0.02)", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", height: "100%" }}>
                    
                    <div style={{ width: "100%", height: "180px", backgroundColor: "#f1f5f9", overflow: "hidden" }}>
                      <img
                        src={item.gambar || "https://placehold.co/600x400"}
                        alt={item.nama}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>

                    <div style={{ padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                      <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", margin: "0 0 8px 0", letterSpacing: "-0.3px" }}>
                        {item.nama}
                      </h2>
                      <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 20px 0", lineHeight: "1.6", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", flexGrow: 1 }}>
                        {item.deskripsi || "Tidak ada deskripsi singkat untuk destinasi ini."}
                      </p>

                      <div style={{ paddingTop: "14px", borderTop: "1px solid #f1f5f9", fontSize: "12px", fontWeight: "700", color: "#166534", display: "flex", alignItems: "center", gap: "4px" }}>
                        Lihat Detail Destinasi →
                      </div>
                    </div>

                  </div>
                </Link>
              ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "48px 24px", backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", maxWidth: "400px", margin: "0 auto" }}>
            <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>Belum ada data wisata yang tersedia.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}