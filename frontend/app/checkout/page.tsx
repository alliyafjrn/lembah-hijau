"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Diimpor untuk navigasi Next.js
import UserNavbar from "@/components/UserNavbar";
import Footer from "@/components/Footer";
import { createTiket } from "@/services/tiket";

export default function CheckoutPage() {
  const [data, setData] = useState<any>(null);
  const router = useRouter(); // Inisialisasi router

  useEffect(() => {
    const tiket = localStorage.getItem("checkout");
    if (tiket) {
      setData(JSON.parse(tiket));
    }
  }, []);

  async function handleBayar() {
    console.log("TOMBOL BAYAR DIKLIK");
    console.log("Data yang dikirim ke API:", data);
    
    try {
      const response = await createTiket({
        namaPemesan: data.namaPemesan,
        email: data.email,
        jenisTiket: data.jenisTiket,
        harga: data.harga,
        jumlahTiket: data.jumlahTiket,
        totalHarga: data.totalHarga,
        wisataId: data.wisataId,
      });

      console.log("RESPONSE TIKET BERHASIL:", response);

      localStorage.setItem("tiket", JSON.stringify(response));
      localStorage.removeItem("checkout");
      
      // Menggantikan window.location.href dengan navigasi bawaan Next.js
      router.push("/tiket-user");
    } catch (error: any) {
      console.error("ERROR SAAT CREATE TIKET:", error);
      // Menampilkan detail error response jika ada dari backend
      alert(`Gagal melakukan pembayaran: ${error.response?.data?.message || error.message}`);
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

            <div className="space-y-4">
              <div>
                Nama: <b>{data.namaPemesan}</b>
              </div>

              <div>
                Email: <b>{data.email}</b>
              </div>

              <div>
                Wisata: <b>{data.namaWisata}</b>
              </div>

              <div>
                Kategori Tiket: <b>{data.jenisTiket}</b>
              </div>

              <div>
                Jumlah: <b>{data.jumlahTiket}</b>
              </div>

              <div>
                Harga: <b>Rp {Number(data.harga).toLocaleString()}</b>
              </div>

              <div className="border-t pt-4 text-xl font-bold text-green-700">
                Total: Rp {Number(data.totalHarga).toLocaleString()}
              </div>
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