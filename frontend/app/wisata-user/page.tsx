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
    <div style={{ 
      backgroundColor: "#f8fafc", 
      minHeight: "100vh", 
      fontFamily: "sans-serif", 
      display: "flex", 
      flexDirection: "column" 
    }}>
      <UserNavbar />
      
      {/* Konten utama dengan flexGrow: 1 agar mendorong footer ke bawah */}
      <div style={{ flexGrow: 1, maxWidth: "1000px", margin: "0 auto", width: "100%", padding: "40px 20px" }}>
        
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#15803d", margin: "0 0 6px 0" }}>
            Daftar Wisata Lembah Hijau
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
            Pilih dan jelajahi destinasi liburan terbaik Anda.
          </p>
        </div>

        <div style={{ maxWidth: "400px", margin: "0 auto 24px auto" }}>
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
              backgroundColor: "#ffffff"
            }}
          />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px", marginBottom: "35px" }}>
          <button
            onClick={() => setSelectedKategori(null)}
            style={{
              padding: "8px 18px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              border: selectedKategori === null ? "none" : "1px solid #cbd5e1",
              backgroundColor: selectedKategori === null ? "#15803d" : "#ffffff",
              color: selectedKategori === null ? "#ffffff" : "#475569",
            }}
          >
            Semua
          </button>
          {kategori.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedKategori(item.id)}
              style={{
                padding: "8px 18px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                border: selectedKategori === item.id ? "none" : "1px solid #cbd5e1",
                backgroundColor: selectedKategori === item.id ? "#15803d" : "#ffffff",
                color: selectedKategori === item.id ? "#ffffff" : "#475569",
              }}
            >
              {item.nama}
            </button>
          ))}
        </div>

        {wisata && wisata.length > 0 ? (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(3, 1fr)", 
            gap: "24px",
            width: "100%"
          }}>
            {wisata
              .filter((item) => {
                const cocokNama = (item.nama || "").toLowerCase().includes(search.toLowerCase());
                const cocokKategori = !selectedKategori || item.kategoriId === selectedKategori;
                return cocokNama && cocokKategori;
              })
              .map((item: any) => (
                <Link href={`/wisata-user/${item.id}`} key={item.id} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                  <div style={{ 
                    backgroundColor: "#ffffff", 
                    borderRadius: "16px", 
                    overflow: "hidden", 
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
                    border: "1px solid #f1f5f9",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%"
                  }}>
                    <div style={{ width: "100%", height: "140px", backgroundColor: "#f1f5f9" }}>
                      <img
                        src={item.gambar || "https://placehold.co/600x400"}
                        alt={item.nama}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <div style={{ padding: "16px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                      <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", margin: "0 0 6px 0" }}>
                        {item.nama}
                      </h2>
                      <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 16px 0", lineHeight: "1.5", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", flexGrow: 1 }}>
                        {item.deskripsi || "Tidak ada deskripsi singkat."}
                      </p>
                      <div style={{ paddingTop: "12px", borderTop: "1px solid #f1f5f9", fontSize: "11px", fontWeight: "700", color: "#15803d", textTransform: "uppercase" }}>
                        Lihat Detail ➔
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "40px", backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #f1f5f9", maxWidth: "400px", margin: "0 auto" }}>
            <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>Belum ada data wisata yang tersedia.</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}