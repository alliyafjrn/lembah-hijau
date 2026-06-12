"use client";

import { useEffect, useState } from "react";
import UserNavbar from "@/components/UserNavbar";
import Footer from "@/components/Footer";
import { createTiket } from "@/services/tiket";

export default function CheckoutPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const tiket = localStorage.getItem("checkout");
    if (tiket) {
      setData(JSON.parse(tiket));
    }
  }, []);

  async function handleBayar() {
    try {
      const response = await createTiket({
        namaPemesan: data.namaPemesan,
        email: data.email,
        jumlahTiket: data.jumlahTiket,
        wisataId: data.wisataId,
      });

      localStorage.setItem("tiket", JSON.stringify(response));
      localStorage.removeItem("checkout");
      window.location.href = "/tiket-user";
    } catch (error) {
      console.error(error);
      alert("Gagal");
    }
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-500">
        Data tidak ditemukan
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      <div>
        <UserNavbar />
        <div className="max-w-3xl mx-auto p-8">
          <div className="bg-white rounded-xl p-8 shadow">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Checkout Tiket</h1>

            <div className="space-y-3 text-gray-700">
              <p>Nama: <span className="font-bold">{data.namaPemesan}</span></p>
              <p>Email: <span className="font-bold">{data.email}</span></p>
              <p>Jumlah: <span className="font-bold">{data.jumlahTiket} Tiket</span></p>
              <p>Wisata: <span className="font-bold">{data.namaWisata}</span></p>
            </div>

            <button
              className="mt-8 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto"
              onClick={handleBayar}
            >
              Bayar Sekarang
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}