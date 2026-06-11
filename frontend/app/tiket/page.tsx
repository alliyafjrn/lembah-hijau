"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function TiketPage() {
  const [tiket, setTiket] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const response = await fetch("http://localhost:3000/tiket");
      const result = await response.json();
      
      if (result && Array.isArray(result.data)) {
        setTiket(result.data);
      } else if (Array.isArray(result)) {
        setTiket(result);
      }
    } catch (error) {
      console.error("Gagal mengambil data tiket:", error);
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Data Pemesanan Tiket</h1>

          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">ID</th>
                <th className="border p-2 text-left">Pemesan</th>
                <th className="border p-2 text-left">Email</th>
                <th className="border p-2 text-left">Jumlah</th>
                <th className="border p-2 text-left">Wisata</th>
              </tr>
            </thead>
            <tbody>
              {tiket.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border p-2">{item.id}</td>
                  <td className="border p-2">{item.namaPemesan}</td>
                  <td className="border p-2">{item.email}</td>
                  <td className="border p-2">{item.jumlahTiket}</td>
                  <td className="border p-2">{item.wisata?.nama || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}