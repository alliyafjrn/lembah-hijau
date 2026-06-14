"use client";

import { useEffect, useState, use } from "react";
import { getWisataById } from "@/services/wisata";
import Link from "next/link";
import UserNavbar from "@/components/UserNavbar";

export default function DetailWisataPage({ params }: { params: Promise<{ id: string }> }) {
  const [wisata, setWisata] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [namaPemesan, setNamaPemesan] = useState("");
  const [email, setEmail] = useState("");
  const [jenisTiket, setJenisTiket] = useState("waterboom");
  const [harga, setHarga] = useState(25000);
  const [jumlahTiket, setJumlahTiket] = useState(1);

  const resolvedParams = use(params);
  const id = resolvedParams.id;

  useEffect(() => {
    if (id) {
      loadWisata(Number(id));
    }
  }, [id]);

  async function loadWisata(wisataId: number) {
    try {
      const response = await getWisataById(wisataId);
      if (response && response.data) {
        setWisata(response.data);
      } else {
        setWisata(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f4f7f5", fontFamily: "sans-serif", fontSize: "14px", color: "#4a554e" }}>
        Memuat detail wisata...
      </div>
    );
  }

  if (!wisata) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f4f7f5", color: "#2d3732", fontFamily: "sans-serif" }}>
        <UserNavbar />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <p style={{ fontSize: "14px", color: "#607466", marginBottom: "12px" }}>Data wisata tidak ditemukan.</p>
          <Link href="/wisata-user" style={{ fontSize: "12px", fontWeight: 600, color: "#166534", backgroundColor: "#edf5f0", padding: "8px 16px", borderRadius: "8px", textDecoration: "none" }}>
            ← Kembali ke Daftar Wisata
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#eff3f0", color: "#2d3732", fontFamily: "sans-serif", display: "flex", flexDirection: "column" }}>
      <UserNavbar />
      
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 16px", boxSizing: "border-box" }}>
        <div style={{ width: "100%", maxWidth: "480px", marginBottom: "12px", textAlign: "left" }}>
          <Link href="/wisata-user" style={{ fontSize: "12px", fontWeight: 500, color: "#607466", textDecoration: "none" }}>
            ← Kembali ke Daftar Wisata
          </Link>
        </div>

        <div style={{ width: "100%", maxWidth: "480px", backgroundColor: "#ffffff", border: "1px solid #e1e8e3", borderRadius: "16px", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.04)", overflow: "hidden" }}>
          
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "16px", backgroundColor: "#ffffff" }}>
            <div style={{ position: "relative", width: "100%", height: "240px", borderRadius: "12px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
              <img
                src={wisata.gambar || "https://placehold.co/600x400"}
                alt={wisata.nama}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <span style={{ position: "absolute", top: "12px", left: "12px", backgroundColor: "rgba(237, 245, 240, 0.95)", backdropFilter: "blur(4px)", color: "#1b4332", fontSize: "10px", fontWeight: 700, padding: "4px 8px", borderRadius: "6px", textTransform: "uppercase", border: "1px solid #d1e4d7" }}>
                {wisata.kategori?.nama || wisata.kategoriNama || "Wisata"}
              </span>
            </div>
          </div>

          <div style={{ padding: "0 20px 20px 20px", borderBottom: "1px solid #f0f4f1" }}>
            <h1 style={{ margin: "0 0 8px 0", fontSize: "20px", fontWeight: 700, color: "#1b4332" }}>
              {wisata.nama}
            </h1>
            <p style={{ margin: 0, fontSize: "13px", color: "#4d5951", lineHeight: "1.6" }}>
              {wisata.deskripsi || "Tidak ada deskripsi lengkap mengenai tempat wisata ini."}
            </p>
          </div>

          <div style={{ padding: "20px", backgroundColor: "#fcfdfe", display: "flex", flexDirection: "column", gap: "14px" }}>
            <h2 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#1b4332", display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ display: "inline-block", width: "4px", height: "14px", backgroundColor: "#15803d", borderRadius: "2px" }}></span>
              Pesan Tiket Masuk
            </h2>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div>
                <input
                  type="text"
                  placeholder="Nama Pemesan"
                  value={namaPemesan}
                  onChange={(e) => setNamaPemesan(e.target.value)}
                  style={{ width: "100%", boxSizing: "border-box", border: "1px solid #cbd5e1", padding: "10px 12px", borderRadius: "8px", fontSize: "13px", outline: "none", fontFamily: "sans-serif" }}
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Alamat Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: "100%", boxSizing: "border-box", border: "1px solid #cbd5e1", padding: "10px 12px", borderRadius: "8px", fontSize: "13px", outline: "none", fontFamily: "sans-serif" }}
                />
              </div>

              <div>
                <select
                  value={jenisTiket}
                  onChange={(e) => handleJenisTiket(e.target.value)}
                  style={{ width: "100%", boxSizing: "border-box", border: "1px solid #cbd5e1", padding: "10px 12px", borderRadius: "8px", fontSize: "13px", backgroundColor: "#ffffff", outline: "none", color: "#334155", fontFamily: "sans-serif" }}
                >
                  <option value="waterboom">Tiket Masuk + Waterboom (Rp25.000)</option>
                  <option value="satwa">Tiket Masuk + Taman Satwa (Rp50.000)</option>
                  <option value="terusan">Tiket Terusan (Rp60.000)</option>
                </select>
              </div>

              <div>
                <input
                  type="number"
                  min={1}
                  value={jumlahTiket}
                  onChange={(e) => setJumlahTiket(Math.max(1, Number(e.target.value)))}
                  style={{ width: "100%", boxSizing: "border-box", border: "1px solid #cbd5e1", padding: "10px 12px", borderRadius: "8px", fontSize: "13px", outline: "none", fontFamily: "sans-serif" }}
                />
              </div>

              <div style={{ backgroundColor: "#edf5f0", border: "1px solid #d1e4d7", borderRadius: "10px", padding: "12px", fontSize: "12px", color: "#4d5951", display: "flex", flexDirection: "column", gap: "6px", marginTop: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Harga Satuan</span>
                  <span style={{ fontWeight: 600, color: "#2d3732" }}>Rp {harga.toLocaleString('id-ID')}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Kuantitas</span>
                  <span style={{ fontWeight: 600, color: "#2d3732" }}>{jumlahTiket} Pcs</span>
                </div>
                <div style={{ borderTop: "1px solid #d1e4d7", margin: "4px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", fontWeight: 700 }}>
                  <span style={{ color: "#2d3732" }}>Total Tagihan</span>
                  <span style={{ color: "#15803d", fontSize: "15px" }}>Rp {(harga * jumlahTiket).toLocaleString('id-ID')}</span>
                </div>
              </div>

              <button
                onClick={handlePesan}
                style={{ width: "100%", marginTop: "6px", padding: "11px", backgroundColor: "#166534", color: "#ffffff", fontWeight: 600, fontSize: "13px", borderRadius: "8px", border: "none", cursor: "pointer", boxShadow: "0 2px 4px rgba(22, 101, 52, 0.1)" }}
              >
                Lanjut ke Pembayaran
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );

  async function handlePesan() {
    if (!namaPemesan.trim() || !email.trim()) {
      alert("Silakan lengkapi nama dan email Anda.");
      return;
    }

    localStorage.setItem(
      "checkout",
      JSON.stringify({
        namaPemesan,
        email,
        jenisTiket,
        harga,
        jumlahTiket,
        totalHarga: harga * jumlahTiket,
        wisataId: wisata.id,
        namaWisata: wisata.nama,
      })
    );

    window.location.href = "/checkout";
  }

  function handleJenisTiket(value: string) {
    setJenisTiket(value);
    if (value === "waterboom") setHarga(25000);
    if (value === "satwa") setHarga(50000);
    if (value === "terusan") setHarga(60000);
  }
}