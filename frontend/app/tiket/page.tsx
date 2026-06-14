'use client';

import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { getTiket, deleteTiket } from "@/services/tiket";

export default function TiketPage() {
  const [tiket, setTiket] = useState<any[]>([]);

  useEffect(() => {
    loadTiket();
  }, []);

  async function loadTiket() {
    const response = await getTiket();
    setTiket(Array.isArray(response) ? response : (response.data || []));
  }

  async function handleDelete(id: number) {
    if (confirm("Yakin ingin menghapus data tiket ini?")) {
      await deleteTiket(id);
      loadTiket();
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
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="p-4 font-semibold text-gray-700">Kode Booking</th>
                    <th className="p-4 font-semibold text-gray-700">Nama</th>
                    <th className="p-4 font-semibold text-gray-700">Email</th>
                    <th className="p-4 font-semibold text-gray-700">Kategori</th>
                    <th className="p-4 font-semibold text-gray-700 text-center">Jumlah</th>
                    <th className="p-4 font-semibold text-gray-700">Total</th>
                    <th className="p-4 font-semibold text-gray-700 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {tiket.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-mono text-sm">{item.kodeBooking}</td>
                      <td className="p-4">{item.namaPemesan}</td>
                      <td className="p-4">{item.email}</td>
                      <td className="p-4 capitalize">{item.jenisTiket}</td>
                      <td className="p-4 text-center">{item.jumlahTiket}</td>
                      <td className="p-4 font-semibold">Rp {item.totalHarga?.toLocaleString()}</td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-50 text-red-600 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-red-600 hover:text-white transition-all"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
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