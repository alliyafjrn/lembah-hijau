"use client";

import Link from "next/link";
import UserNavbar from "@/components/UserNavbar";

export default function SuksesPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <UserNavbar />

      <div className="max-w-xl mx-auto mt-32 bg-white p-10 rounded-xl shadow text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-5">
          Pembayaran Berhasil
        </h1>
        
        <p className="text-gray-600 mb-8">
          Tiket berhasil dipesan.
        </p>

        <Link href="/wisata-user">
          <button className="bg-green-700 text-white px-6 py-3 rounded">
            Kembali Ke Wisata
          </button>
        </Link>
      </div>
    </div>
  );
}