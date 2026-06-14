'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createTiket } from "@/services/tiket";

export default function CheckoutPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const checkoutData = localStorage.getItem("checkout");
    if (checkoutData) {
      setData(JSON.parse(checkoutData));
    }
    setLoading(false);
  }, []);

  async function handleBayar() {
    if (!data) {
      alert("Data pemesanan tidak ditemukan!");
      return;
    }

    try {
      setIsSubmitting(true);
      const dataKirim = {
        namaPemesan: data.namaPemesan || "Anonim",
        email: data.email || "",
        jenisTiket: data.jenisTiket || "waterboom",
        harga: Number(data.harga) || 0,
        jumlahTiket: Number(data.jumlahTiket) || 1,
        totalHarga: Number(data.totalHarga) || Number(data.harga) * Number(data.jumlahTiket),
        wisataId: Number(data.wisataId) || 1,
      };

      const response = await createTiket(dataKirim);

      localStorage.setItem("tiket", JSON.stringify(response?.data ?? response));
      localStorage.removeItem("checkout");

      router.push("/tiket-user");
    } catch (error) {
      console.error("ERROR SAAT CREATE TIKET:", error);
      alert("Gagal melakukan pembayaran.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f4f7f5", fontFamily: "sans-serif", fontSize: "14px", color: "#4a554e" }}>
        Menyiapkan pembayaran...
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f4f7f5", padding: "16px" }}>
        <div style={{ width: "100%", maxWidth: "320px", padding: "16px", backgroundColor: "#fdf2f2", border: "1px solid #fde2e2", color: "#991b1b", borderRadius: "12px", textAlign: "center", fontSize: "13px", fontFamily: "sans-serif" }}>
          Detail pesanan tidak ditemukan.
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#eff3f0", padding: "16px", boxSizing: "border-box" }}>
      <div style={{ width: "100%", maxWidth: "320px", backgroundColor: "#ffffff", border: "1px solid #e1e8e3", borderRadius: "16px", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02)", overflow: "hidden", fontFamily: "sans-serif" }}>
        
        <div style={{ backgroundColor: "#edf5f0", borderBottom: "1px solid #d1e4d7", padding: "14px 16px" }}>
          <h2 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#1b4332", letterSpacing: "0.3px" }}>Lembah Hijau</h2>
          <p style={{ margin: "2px 0 0 0", fontSize: "11px", color: "#607466" }}>Konfirmasi pembelian tiket Anda</p>
        </div>
        
        <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", fontSize: "12px" }}>
            <span style={{ color: "#8a9a8e" }}>Nama Pemesan</span>
            <span style={{ fontWeight: 600, color: "#2d3732", textAlign: "right", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{data.namaPemesan}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", fontSize: "12px" }}>
            <span style={{ color: "#8a9a8e" }}>Email</span>
            <span style={{ fontWeight: 500, color: "#2d3732", textAlign: "right", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{data.email}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px" }}>
            <span style={{ color: "#8a9a8e" }}>Kategori Tiket</span>
            <span style={{ fontWeight: 700, color: "#1b4332", textTransform: "uppercase", fontSize: "10px", backgroundColor: "#d8ebd9", padding: "2px 6px", borderRadius: "4px", letterSpacing: "0.5px" }}>
              {data.jenisTiket}
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px" }}>
            <span style={{ color: "#8a9a8e" }}>Jumlah</span>
            <span style={{ fontWeight: 600, color: "#2d3732" }}>{data.jumlahTiket} Pcs</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px" }}>
            <span style={{ color: "#8a9a8e" }}>Harga Satuan</span>
            <span style={{ fontWeight: 500, color: "#2d3732" }}>Rp {Number(data.harga).toLocaleString('id-ID')}</span>
          </div>

          <div style={{ borderTop: "1px solid #f0f4f1", margin: "4px 0" }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "12px", fontWeight: 500, color: "#4d5951" }}>Total Bayar</span>
            <span style={{ fontSize: "16px", fontWeight: 700, color: "#15803d" }}>
              Rp {Number(data.totalHarga).toLocaleString('id-ID')}
            </span>
          </div>

          <button
            onClick={handleBayar}
            disabled={isSubmitting}
            style={{
              width: "100%",
              marginTop: "4px",
              padding: "11px",
              backgroundColor: isSubmitting ? "#a3d9b9" : "#166534",
              color: "white",
              fontWeight: 600,
              fontSize: "12px",
              borderRadius: "8px",
              border: "none",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              boxShadow: "0 2px 4px rgba(22, 101, 52, 0.1)",
              transition: "all 0.15s ease-in-out"
            }}
          >
            {isSubmitting ? "Memproses..." : "Konfirmasi & Bayar Sekarang"}
          </button>

        </div>
      </div>
    </div>
  );
}