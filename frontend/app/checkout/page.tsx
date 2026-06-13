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
        totalHarga:
          Number(data.totalHarga) ||
          Number(data.harga) * Number(data.jumlahTiket),
        wisataId: Number(data.wisataId) || 1,
      };

      console.log("Mengirim data tiket:", dataKirim);

      const response = await createTiket(dataKirim);

      console.log("Response tiket:", response);

      localStorage.setItem(
        "tiket",
        JSON.stringify(response?.data ?? response),
      );

      localStorage.removeItem("checkout");

      router.push("/tiket-user");
    } catch (error) {
      console.error("ERROR SAAT CREATE TIKET:", error);
      alert("Gagal melakukan pembayaran");
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!data) {
    return (
      <div className="p-8 text-center text-red-500">
        Gagal memuat data checkout. Silakan pesan ulang.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md border">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Review Pembayaran
      </h2>

      <div className="space-y-4 text-gray-700">
        <div>
          Nama Pemesan:
          <span className="font-semibold">
            {" "}
            {data.namaPemesan}
          </span>
        </div>

        <div>
          Email:
          <span className="font-semibold">
            {" "}
            {data.email}
          </span>
        </div>

        <div>
          Kategori Tiket:
          <span className="font-semibold uppercase">
            {" "}
            {data.jenisTiket}
          </span>
        </div>

        <div>
          Jumlah Tiket:
          <span className="font-semibold">
            {" "}
            {data.jumlahTiket} Pcs
          </span>
        </div>

        <div>
          Harga Satuan:
          <span className="font-semibold">
            {" "}
            Rp {Number(data.harga).toLocaleString()}
          </span>
        </div>

        <div className="border-t pt-4 text-xl font-bold text-green-600 flex justify-between">
          <span>Total Bayar:</span>
          <span>
            Rp {Number(data.totalHarga).toLocaleString()}
          </span>
        </div>
      </div>

      <button
        onClick={handleBayar}
        className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition duration-200"
      >
        Bayar Sekarang
      </button>
    </div>
  );
}