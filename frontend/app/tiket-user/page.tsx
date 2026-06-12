"use client";

import { useEffect, useState } from "react";
import UserNavbar from "@/components/UserNavbar";

export default function TiketUserPage() {
  const [tiket, setTiket] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("tiket");
    if (data) {
      setTiket(JSON.parse(data));
    }
  }, []);

  if (!tiket) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 text-gray-600">
        Tiket tidak ditemukan
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <UserNavbar />

      <div className="max-w-xl mx-auto mt-20 bg-white p-10 rounded-xl shadow">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Tiket Digital
        </h1>

        <div className="space-y-3 text-gray-700">
          <p>
            Kode: <b className="text-black">{tiket.kodeBooking}</b>
          </p>
          <p>
            Nama: <span className="font-medium">{tiket.namaPemesan}</span>
          </p>
          <p>
            Email: <span className="font-medium">{tiket.email}</span>
          </p>
          <p>
            Jumlah: <span className="font-medium">{tiket.jumlahTiket}</span>
          </p>
          <p>
            Wisata: <span className="font-medium">{tiket.wisata?.nama}</span>
          </p>
        </div>
      </div>
    </div>
  );
}