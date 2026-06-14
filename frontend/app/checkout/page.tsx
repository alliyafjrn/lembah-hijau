'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createTiket } from "@/services/tiket";

export default function CheckoutPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
      alert("Gagal melakukan pembayaran. Cek terminal backend.");
    }
  }

  if (loading) return <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>;
  if (!data) return <div style={{ padding: "20px", textAlign: "center", color: "red" }}>Data tidak ditemukan.</div>;

  return (
    <div style={{ maxWidth: "450px", margin: "40px auto", padding: "24px", border: "1px solid #ccc", borderRadius: "8px", fontFamily: "sans-serif" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "24px" }}>Review Pembayaran</h2>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
        <div>Nama Pemesan: <strong>{data.namaPemesan}</strong></div>
        <div>Email: <strong>{data.email}</strong></div>
        <div>Kategori Tiket: <strong style={{ textTransform: "uppercase" }}>{data.jenisTiket}</strong></div>
        <div>Jumlah Tiket: <strong>{data.jumlahTiket} Pcs</strong></div>
        <div>Harga Satuan: <strong>Rp {Number(data.harga).toLocaleString()}</strong></div>
        
        <div style={{ borderTop: "1px solid #eee", paddingTop: "16px", fontSize: "20px", fontWeight: "bold", color: "#16a34a", display: "flex", justifyContent: "between" }}>
          <span>Total Bayar: Rp {Number(data.totalHarga).toLocaleString()}</span>
        </div>
      </div>

      <button
        onClick={handleBayar}
        style={{ wWidth: "100%", width: "100%", backgroundColor: "#16a34a", color: "white", fontWeight: "bold", padding: "12px", borderRadius: "4px", border: "none", cursor: "pointer", fontSize: "16px" }}
      >
        Bayar Sekarang
      </button>
    </div>
  );
}