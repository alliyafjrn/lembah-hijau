"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getTiket } from "@/services/tiket";

export default function TiketPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const response = await getTiket();

      if (response && Array.isArray(response.data)) {
        setData(response.data);
      } else if (Array.isArray(response)) {
        setData(response);
      }
    } catch (error) {
      console.error("Gagal memuat data tiket:", error);
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Data Pemesanan</h1>

          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left">ID</th>
                <th className="border p-3 text-left">Nama</th>
                <th className="border p-3 text-left">Email</th>
                <th className="border p-3 text-left">Jumlah</th>
                <th className="border p-3 text-left">Kode Booking</th>
                <th className="border p-3 text-left">Wisata</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border p-3">{item.id}</td>
                    <td className="border p-3">{item.namaPemesan}</td>
                    <td className="border p-3">{item.email}</td>
                    <td className="border p-3">{item.jumlahTiket}</td>
                    <td className="border p-3">{item.jenisTiket}</td>
                    <td className="border p-3"> Rp {item.totalHarga?.toLocaleString()}</td>
                    <td className="border p-3">{item.kodeBooking}</td>
                    <td className="border p-3">{item.wisata?.nama || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="border p-3 text-center text-gray-500">
                    Tidak ada data pemesanan tiket.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}