"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getTiket } from "@/services/tiket";

export default function TiketPage() {
  const [tiket, setTiket] = useState<any[]>([]);

  useEffect(() => {
    loadTiket();
  }, []);

  async function loadTiket() {
    const response = await getTiket();
    setTiket(response.data || response || []);
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Data Tiket</h1>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-3 text-left">Kode</th>
                <th className="border p-3 text-left">Nama</th>
                <th className="border p-3 text-left">Email</th>
                <th className="border p-3 text-left">Kategori</th>
                <th className="border p-3 text-left">Jumlah</th>
                <th className="border p-3 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {tiket.map((item: any) => (
                <tr key={item.id}>
                  <td className="border p-3">{item.kodeBooking}</td>
                  <td className="border p-3">{item.namaPemesan}</td>
                  <td className="border p-3">{item.email}</td>
                  <td className="border p-3 uppercase">{item.jenisTiket}</td>
                  <td className="border p-3">{item.jumlahTiket} Pcs</td>
                  <td className="border p-3">Rp {Number(item.totalHarga || 0).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}