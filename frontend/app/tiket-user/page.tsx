'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import QRCode from 'react-qr-code';

export default function TiketUserPage() {
  const router = useRouter();
  const [tiket, setTiket] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localData = localStorage.getItem('tiket');
    if (localData) {
      try {
        const parsedData = JSON.parse(localData);
        setTiket(parsedData.data ?? parsedData);
      } catch (error) {
        console.error("Gagal membaca data tiket:", error);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-600 font-medium animate-pulse">Memuat tiket...</p>
      </div>
    );
  }

  if (!tiket) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-xl shadow-md border border-gray-200 text-center">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Tiket Tidak Ditemukan</h3>
        <button 
          onClick={() => router.push('/')}
          className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto my-10 p-4">
      <div 
        id="ticket-area" 
        className="p-6 bg-white rounded-2xl shadow-xl border-2 border-dashed border-gray-300 relative"
      >
        <div className="text-center border-b-2 border-gray-200 pb-4 mb-5">
          <div className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider mb-2">
            E-Ticket Verified
          </div>
          <h2 className="text-2xl font-black text-gray-800">LEMBAH HIJAU</h2>
        </div>

        <div className="space-y-4 text-sm text-gray-700">
          <div className="flex justify-between bg-gray-100 p-3 rounded-lg">
            <span className="text-gray-500 font-medium">Kode Booking</span>
            <span className="font-mono font-bold text-gray-900">{tiket.kodeBooking}</span>
          </div>

          <div className="flex flex-col items-center justify-center my-6">
            <QRCode value={tiket.kodeBooking || "INVALID"} size={180} />
          </div>
          
          <div className="border-t border-gray-100 pt-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Nama</span>
              <span className="text-gray-900 font-semibold">{tiket.namaPemesan}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Kategori</span>
              <span className="text-blue-600 font-bold uppercase">{tiket.jenisTiket}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Jumlah</span>
              <span className="text-gray-900 font-bold">{tiket.jumlahTiket} Pcs</span>
            </div>
          </div>

          <div className="pt-4 border-t-2 border-gray-200 flex justify-between items-center text-lg font-bold text-green-700">
            <span>Total Bayar</span>
            <span>Rp {Number(tiket.totalHarga || 0).toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => window.print()}
        className="w-full mt-6 bg-green-700 text-white font-semibold py-3 rounded-xl hover:bg-green-800 transition shadow-md"
      >
        Simpan sebagai PDF
      </button>
    </div>
  );
}