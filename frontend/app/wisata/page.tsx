"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { getWisata, createWisata, deleteWisata, updateWisata } from "@/services/wisata";
import { getKategori } from "@/services/kategori";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function WisataPage() {
  const [wisata, setWisata] = useState<any[]>([]);
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [kategoriId, setKategoriId] = useState("");
  const [gambar, setGambar] = useState("");
  const [kategori, setKategori] = useState<any[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    loadWisata();
    loadKategori();
  }, []);

  async function loadWisata() {
    const response = await getWisata();
    setWisata(Array.isArray(response) ? response : response.data || []);
  }

  async function loadKategori() {
    const response = await getKategori();
    setKategori(Array.isArray(response) ? response : response.data || []);
  }

  async function handleSubmit() {
    if (!nama.trim() || !deskripsi.trim() || !kategoriId) {
      alert("Semua field termasuk kategori harus diisi!");
      return;
    }

    const payload = {
      nama,
      deskripsi,
      kategoriId: Number(kategoriId),
      gambar,
    };

    if (editId) {
      await updateWisata(editId, payload);
      setEditId(null);
    } else {
      await createWisata(payload);
    }

    setNama("");
    setDeskripsi("");
    setKategoriId("");
    setGambar("");
    loadWisata();
  }

  function handleEdit(item: any) {
    setEditId(item.id);
    setNama(item.nama);
    setDeskripsi(item.deskripsi);
    setKategoriId(String(item.kategoriId));
    setGambar(item.gambar || "");
  }

  async function handleDelete(id: number) {
    const confirmDelete = confirm("Yakin ingin menghapus wisata?");
    if (!confirmDelete) return;

    await deleteWisata(id);
    loadWisata();
  }

  return (
    <ProtectedRoute>
      <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "sans-serif", color: "#334155", width: "100%" }}>
        
        <Sidebar />
        
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, width: "100%" }}>
          <Navbar />
          
          <div style={{ padding: "24px", flexGrow: 1 }}>
            <h1 style={{ fontSize: "24px", fontWeight: "750", marginBottom: "20px", color: "#1e293b" }}>Data Wisata</h1>
            
            {/* Menggunakan Grid murni: Form di kiri (1 bagian), Tabel di kanan (2 bagian) */}
            <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "24px", alignItems: "start", width: "100%" }}>
              
              {/* SISI KIRI: Form Input */}
              <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: "12px" }}>
                <span style={{ fontSize: "14px", fontWeight: "700", color: "#15803d" }}>
                  {editId ? "✏️ Edit Destinasi" : "➕ Tambah Destinasi"}
                </span>
                
                <input
                  type="text"
                  placeholder="Nama Wisata"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px", boxSizing: "border-box", outline: "none", backgroundColor: "#ffffff", color: "#000000" }}
                />
                
                <textarea
                  placeholder="Deskripsi Wisata"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  rows={3}
                  style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px", boxSizing: "border-box", outline: "none", fontFamily: "sans-serif", backgroundColor: "#ffffff", color: "#000000" }}
                />
                
                <select
                  value={kategoriId}
                  onChange={(e) => setKategoriId(e.target.value)}
                  style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px", boxSizing: "border-box", outline: "none", backgroundColor: "#ffffff", color: "#000000" }}
                >
                  <option value="">Pilih Kategori</option>
                  {kategori.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nama}
                    </option>
                  ))}
                </select>
                
                <input
                  type="text"
                  placeholder="URL Gambar"
                  value={gambar}
                  onChange={(e) => setGambar(e.target.value)}
                  style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px", boxSizing: "border-box", outline: "none", backgroundColor: "#ffffff", color: "#000000" }}
                />
                
                <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                  <button
                    onClick={handleSubmit}
                    style={{ flex: 1, backgroundColor: "#15803d", color: "#ffffff", border: "none", padding: "10px", borderRadius: "8px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
                  >
                    {editId ? "Update" : "Simpan"}
                  </button>
                  {editId && (
                    <button
                      onClick={() => {
                        setEditId(null);
                        setNama("");
                        setDeskripsi("");
                        setKategoriId("");
                        setGambar("");
                      }}
                      style={{ backgroundColor: "#94a3b8", color: "#ffffff", border: "none", padding: "10px", borderRadius: "8px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
                    >
                      Batal
                    </button>
                  )}
                </div>
              </div>

              {/* SISI KANAN: Tabel Data */}
              <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#f1f5f9", borderBottom: "1px solid #e2e8f0", color: "#475569" }}>
                      <th style={{ padding: "12px 16px", fontWeight: "600", width: "60px" }}>ID</th>
                      <th style={{ padding: "12px 16px", fontWeight: "600", width: "200px" }}>Nama</th>
                      <th style={{ padding: "12px 16px", fontWeight: "600" }}>Deskripsi</th>
                      <th style={{ padding: "12px 16px", fontWeight: "600", width: "150px", textAlign: "center" }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wisata && wisata.length > 0 ? (
                      wisata.map((item) => (
                        <tr key={item.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "12px 16px", color: "#64748b" }}>{item.id}</td>
                          <td style={{ padding: "12px 16px", fontWeight: "600", color: "#0f172a" }}>{item.nama}</td>
                          <td style={{ padding: "12px 16px", color: "#475569", lineHeight: "1.5" }}>{item.deskripsi}</td>
                          <td style={{ padding: "12px 16px", textAlign: "center", whiteSpace: "nowrap" }}>
                            <button
                              onClick={() => handleEdit(item)}
                              style={{ backgroundColor: "#3b82f6", color: "#ffffff", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "500", cursor: "pointer", marginRight: "6px" }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              style={{ backgroundColor: "#ef4444", color: "#ffffff", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "500", cursor: "pointer" }}
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} style={{ padding: "32px", textAlign: "center", color: "#94a3b8" }}>
                          Belum ada data wisata yang tersedia.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>

          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}