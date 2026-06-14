'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import QRCode from 'react-qr-code';

export default function TiketUserPage() {
  const router = useRouter();
  const [tiket, setTiket] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localData = localStorage.getItem('tiket');
    if (localData) {
      try {
        const parsedData = JSON.parse(localData);
        setTiket(parsedData.data ?? parsedData);
      } catch (error) {
        console.error("Gagal membaca data tiket:", error);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f4f7f5", fontFamily: "sans-serif", fontSize: "14px", color: "#4a554e" }}>
        Memuat tiket...
      </div>
    );
  }

  if (!tiket) {
    return (
      <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f4f7f5", padding: "16px" }}>
        <div style={{ width: "100%", maxWidth: "320px", padding: "20px", backgroundColor: "#ffffff", border: "1px solid #e1e8e3", borderRadius: "16px", textAlign: "center", boxShadow: "0 4px 6px rgba(0,0,0,0.02)", fontFamily: "sans-serif" }}>
          <h3 style={{ margin: "0 0 12px 0", fontSize: "15px", fontWeight: 600, color: "#1e293b" }}>Tiket Tidak Ditemukan</h3>
          <button 
            onClick={() => router.push('/')}
            style={{ width: "100%", backgroundColor: "#166534", color: "white", border: "none", padding: "10px", borderRadius: "8px", fontWeight: 600, fontSize: "12px", cursor: "pointer" }}
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#eff3f0", padding: "16px", boxSizing: "border-box", overflowY: "auto" }}>
      <div style={{ width: "100%", maxWidth: "320px", display: "flex", flexDirection: "column", gap: "12px" }}>
        
        <div id="ticket-area" style={{ backgroundColor: "#ffffff", border: "1px solid #e1e8e3", borderRadius: "16px", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.04)", overflow: "hidden", fontFamily: "sans-serif" }}>
          
          <div style={{ backgroundColor: "#edf5f0", borderBottom: "1px solid #d1e4d7", padding: "14px 16px", textAlign: "center" }}>
            <span style={{ display: "inline-block", backgroundColor: "#d8ebd9", color: "#1b4332", fontSize: "9px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px", letterSpacing: "0.5px", marginBottom: "6px", textTransform: "uppercase" }}>
              E-Ticket Verified
            </span>
            <h2 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#1b4332", letterSpacing: "0.5px" }}>LEMBAH HIJAU</h2>
          </div>

          <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px", fontSize: "12px", color: "#334155" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#f8fafc", border: "1px solid #f1f5f9", padding: "8px 12px", borderRadius: "8px" }}>
              <span style={{ color: "#64748b", fontWeight: 500 }}>Kode Booking</span>
              <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#0f172a", fontSize: "13px" }}>{tiket.kodeBooking}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "center", padding: "12px 0", backgroundColor: "#ffffff" }}>
              <div style={{ padding: "8px", border: "1px solid #f1f5f9", borderRadius: "8px" }}>
                <QRCode value={tiket.kodeBooking || "INVALID"} size={130} />
              </div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ color: "#8a9a8e" }}>Nama</span>
              <span style={{ fontWeight: 600, color: "#2d3732", textAlign: "right", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tiket.namaPemesan}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#8a9a8e" }}>Kategori</span>
              <span style={{ fontWeight: 700, color: "#1b4332", textTransform: "uppercase", fontSize: "10px", backgroundColor: "#d8ebd9", padding: "2px 6px", borderRadius: "4px" }}>
                {tiket.jenisTiket}
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#8a9a8e" }}>Jumlah</span>
              <span style={{ fontWeight: 600, color: "#2d3732" }}>{tiket.jumlahTiket} Pcs</span>
            </div>

            <div style={{ borderTop: "1px dashed #cbd5e1", margin: "4px 0" }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 500, color: "#4d5951" }}>Total Bayar</span>
              <span style={{ fontSize: "15px", fontWeight: 700, color: "#15803d" }}>
                Rp {Number(tiket.totalHarga || 0).toLocaleString('id-ID')}
              </span>
            </div>

          </div>
        </div>

        <button
          onClick={() => window.print()}
          style={{
            width: "100%",
            padding: "11px",
            backgroundColor: "#166534",
            color: "white",
            fontWeight: 600,
            fontSize: "12px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(22, 101, 52, 0.1)",
            transition: "all 0.15s ease-in-out"
          }}
        >
          Simpan sebagai PDF
        </button>

      </div>
    </div>
  );
}