'use client';

import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { getTiket, updateStatusTiket } from "@/services/tiket";

export default function TiketPage() {
  const [tiket, setTiket] = useState<any[]>([]);

  useEffect(() => {
    loadTiket();
  }, []);

  async function loadTiket() {
    const response = await getTiket();
    setTiket(Array.isArray(response) ? response : (response.data || []));
  }

  async function updateTiketStatus(id: any, status: string) {
    try {
      const targetId = Number(id);
      
      await updateStatusTiket(targetId, status.toLowerCase());
      await loadTiket();
    } catch (error) {
      console.error("Gagal memperbarui status:", error);
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Data Tiket Pelanggan</h1>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="border p-3 text-gray-700">Kode Booking</th>
                    <th className="border p-3 text-gray-700">Nama</th>
                    <th className="border p-3 text-gray-700">Email</th>
                    <th className="border p-3 text-gray-700">Kategori</th>
                    <th className="border p-3 text-gray-700 text-center">Jumlah</th>
                    <th className="border p-3 text-gray-700">Total</th>
                    <th className="border p-3 text-gray-700 text-center">Status</th>
                    <th className="border p-3 text-gray-700 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {tiket.map((item) => {
                    const currentStatus = item.status?.toLowerCase();

                    return (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="border p-3 font-mono text-sm">{item.kodeBooking}</td>
                        <td className="border p-3">{item.namaPemesan}</td>
                        <td className="border p-3">{item.email}</td>
                        <td className="border p-3 capitalize">{item.jenisTiket}</td>
                        <td className="border p-3 text-center">{item.jumlahTiket}</td>
                        <td className="border p-3 font-semibold">Rp {item.totalHarga?.toLocaleString()}</td>
                        <td className="border p-3 text-center">
                          <span 
                            style={{
                              padding: "6px 12px",
                              borderRadius: "9999px",
                              fontSize: "12px",
                              fontWeight: "bold",
                              backgroundColor: currentStatus === "selesai" ? "#dbeafe" : currentStatus === "dibayar" ? "#dcfce7" : "#fef9c3",
                              color: currentStatus === "selesai" ? "#1d4ed8" : currentStatus === "dibayar" ? "#15803d" : "#a16207"
                            }}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="border p-3 text-center">
                          {currentStatus === "pending" && (
                            <button 
                              onClick={() => updateTiketStatus(item.id, "dibayar")}
                              style={{
                                backgroundColor: "#16a34a",
                                color: "white",
                                padding: "6px 12px",
                                borderRadius: "6px",
                                border: "none",
                                cursor: "pointer",
                                fontWeight: "500"
                              }}
                            >
                              Konfirmasi
                            </button>
                          )}
                          {currentStatus === "dibayar" && (
                            <button 
                              onClick={() => updateTiketStatus(item.id, "selesai")}
                              style={{
                                backgroundColor: "#2563eb",
                                color: "white",
                                padding: "6px 12px",
                                borderRadius: "6px",
                                border: "none",
                                cursor: "pointer",
                                fontWeight: "500"
                              }}
                            >
                              Selesai
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {tiket.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  Belum ada data tiket yang tersedia.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}