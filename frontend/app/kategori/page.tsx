"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import {
    getKategori,
    createKategori,
    updateKategori,
    deleteKategori,
} from "@/services/kategori";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function KategoriPage() {
    const [kategori, setKategori] = useState<any[]>([]);
    const [nama, setNama] = useState("");
    const [editId, setEditId] = useState<number | null>(null);

    useEffect(() => {
        loadKategori();
    }, []);

    async function loadKategori() {
        try {
            const response = await getKategori();
            setKategori(response.data || response);
        } catch (error) {
            console.error("Gagal memuat kategori:", error);
        }
    }

    function handleEdit(item: any) {
        setEditId(item.id);
        setNama(item.nama);
    }

    async function handleSubmit() {
        if (!nama.trim()) return alert("Nama kategori tidak boleh kosong");

        try {
            if (editId) {
                await updateKategori(editId, nama);
                setEditId(null);
            } else {
                await createKategori(nama);
            }
            setNama("");
            loadKategori();
        } catch (error) {
            console.error("Gagal menyimpan kategori:", error);
        }
    }

    async function handleDelete(id: number) {
        const confirmDelete = confirm("Yakin ingin menghapus kategori?");
        if (!confirmDelete) return;

        try {
            await deleteKategori(id);
            loadKategori();
        } catch (error) {
            console.error("Gagal menghapus kategori:", error);
        }
    }

    return (
        <ProtectedRoute>
            <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "sans-serif", color: "#334155", width: "100%" }}>
                
                <Sidebar />

                <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, width: "100%" }}>
                    <Navbar />

                    <div style={{ padding: "24px", flexGrow: 1 }}>
                        <h1 style={{ fontSize: "24px", fontWeight: "750", marginBottom: "20px", color: "#15803d" }}>Data Kategori</h1>

                        <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "24px", alignItems: "start", width: "100%" }}>
                            
                            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: "12px" }}>
                                <span style={{ fontSize: "14px", fontWeight: "700", color: "#15803d" }}>
                                    {editId ? "✏️ Edit Kategori" : "➕ Tambah Kategori"}
                                </span>
                                
                                <input
                                    type="text"
                                    placeholder="Nama Kategori"
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
                                    style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px", boxSizing: "border-box", outline: "none", backgroundColor: "#ffffff", color: "#000000" }}
                                />

                                <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                                    <button
                                        onClick={handleSubmit}
                                        style={{ flex: 1, backgroundColor: "#15803d", color: "#ffffff", border: "none", padding: "10px", borderRadius: "8px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
                                    >
                                        {editId ? "Update" : "Tambah"}
                                    </button>

                                    {editId && (
                                        <button
                                            onClick={() => {
                                                setEditId(null);
                                                setNama("");
                                            }}
                                            style={{ backgroundColor: "#94a3b8", color: "#ffffff", border: "none", padding: "10px", borderRadius: "8px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
                                        >
                                            Batal
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", overflow: "hidden" }}>
                                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                                    <thead>
                                        <tr style={{ backgroundColor: "#f1f5f9", borderBottom: "1px solid #e2e8f0", color: "#475569" }}>
                                            <th style={{ padding: "12px 16px", fontWeight: "600", width: "80px" }}>ID</th>
                                            <th style={{ padding: "12px 16px", fontWeight: "600" }}>Nama Kategori</th>
                                            <th style={{ padding: "12px 16px", fontWeight: "600", width: "180px", textAlign: "center" }}>Aksi</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {kategori && kategori.length > 0 ? (
                                            kategori.map((item) => (
                                                <tr key={item.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                                                    <td style={{ padding: "12px 16px", color: "#64748b" }}>{item.id}</td>
                                                    <td style={{ padding: "12px 16px", fontWeight: "600", color: "#0f172a" }}>{item.nama}</td>
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
                                                <td colSpan={3} style={{ padding: "32px", textAlign: "center", color: "#94a3b8" }}>
                                                    Belum ada data kategori.
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