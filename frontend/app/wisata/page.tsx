"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { getWisata } from "@/services/wisata";

export default function WisataPage() {
  const [wisata, setWisata] = useState<any[]>([]);

  useEffect(() => {
    loadWisata();
  }, []);

  async function loadWisata() {
    const response = await getWisata();
    setWisata(response.data);
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-5">
            Data Wisata
          </h1>

          <table className="w-full border">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Deskripsi</th>
              </tr>
            </thead>

            <tbody>
              {wisata.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nama}</td>
                  <td>{item.deskripsi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}