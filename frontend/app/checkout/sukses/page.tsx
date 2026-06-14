"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import UserNavbar from "@/components/UserNavbar";
import QRCode from "react-qr-code"; 

export default function SuksesPage() {
  const [tiket, setTiket] = useState<any>(null);

  useEffect(() => {
    const dataTiket = localStorage.getItem("tiket");
    if (dataTiket) {
      try {
        setTiket(JSON.parse(dataTiket));
      } catch (e) {
        console.error("Gagal parsing data tiket:", e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <UserNavbar />

      <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-2xl shadow-lg border-2 border-dashed border-gray-300">
        <div className="text-center border-b pb-4 mb-6">
          <h1 className="text-3xl font-black text-green-700">Pembayaran Berhasil</h1>
          <p className="text-xs text-gray-400 font-mono mt-1">E-TICKET LEMBAH HIJAU</p>
        </div>

        {tiket ? (
          <div className="space-y-4 text-sm text-gray-700">
            {/* QR CODE SECTION */}
            <div className="flex justify-center py-4">
              <QRCode value={tiket.kodeBooking || "TICKET-EMPTY"} size={130} />
            </div>

            <div className="flex justify-between bg-gray-50 p-2.5 rounded border">
              <span className="text-gray-500 font-medium">Kode Booking</span>
              <span className="font-mono font-bold text-gray-900">{tiket.kodeBooking || "GENERATING..."}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Nama Pemesan</span>
              <span className="text-gray-900 font-bold">{tiket.namaPemesan || "-"}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Email</span>
              <span className="text-gray-900 font-medium">{tiket.email || "-"}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Kategori Tiket</span>
              <span className="text-blue-600 font-bold uppercase">{tiket.jenisTiket || "-"}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Jumlah Tiket</span>
              <span className="text-gray-900 font-bold">{tiket.jumlahTiket || 0} Pcs</span>
            </div>

            <div className="pt-4 flex justify-between items-center text-lg font-bold text-green-600">
              <span>Total Pembayaran</span>
              <span className="bg-green-700 text-white px-3 py-1 rounded font-extrabold text-base">
                Rp {Number(tiket.totalHarga || 0).toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 my-4">Memuat data tiket...</p>
        )}

        <div className="mt-8 text-center">
          <Link href="/wisata-user">
            <button className="w-full bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-bold transition">
              Kembali Ke Wisata
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}