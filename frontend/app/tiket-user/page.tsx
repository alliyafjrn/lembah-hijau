'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TiketUserPage() {
  const router = useRouter();
  const [tiket, setTiket] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localData = localStorage.getItem('tiket');
    console.log("Data mentah di localStorage 'tiket':", localData);
    
    if (localData) {
      try {
        const parsedData = JSON.parse(localData);
        console.log("Hasil parse objek tiket:", parsedData);

        if (parsedData && typeof parsedData === 'object') {
          const finalData = parsedData.data ?? parsedData;
          setTiket(finalData);
        }
      } catch (error) {
        console.error("Gagal membaca atau mem-parse data tiket:", error);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-600 font-medium animate-pulse">Memuat data tiket digital Anda...</p>
      </div>
    );
  }

  if (!tiket) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-xl shadow-md border border-gray-200 text-center">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-2xl">!</div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">Tiket Tidak Ditemukan</h3>
        <p className="text-sm text-gray-500 mb-6">Kamu belum memesan tiket atau sesi penyimpanan browser telah dibersihkan.</p>
        <button 
          onClick={() => router.push('/')}
          className="w-full bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Kembali Pesan Tiket
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-2xl shadow-xl border-2 border-dashed border-gray-300 relative bg-amber-50/5">
      {/* Header Tiket */}
      <div className="text-center border-b-2 border-gray-200 pb-4 mb-5">
        <div className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider mb-2">
          E-Ticket Verified
        </div>
        <h2 className="text-2xl font-black text-gray-800 tracking-tight">LEMBAH HIJAU</h2>
        <p className="text-xs text-gray-400 font-mono mt-0.5">Bukti Pembayaran Tiket Masuk</p>
      </div>

      {/* Detail Konten Tiket */}
      <div className="space-y-3.5 text-sm text-gray-700">
        <div className="flex justify-between bg-gray-50 p-2.5 rounded-lg border border-gray-100">
          <span className="text-gray-500 font-medium">Kode Booking</span>
          <span className="font-mono font-bold text-gray-900">{tiket.kodeBooking || 'GENERATING...'}</span>
        </div>
        
        <div className="flex justify-between border-b border-gray-100 pb-2 pt-1">
          <span className="text-gray-500">Nama Pemesan</span>
          <span className="text-gray-900 font-semibold">{tiket.namaPemesan || '-'}</span>
        </div>

        <div className="flex justify-between border-b border-gray-100 pb-2">
          <span className="text-gray-500">Email</span>
          <span className="text-gray-900 font-medium">{tiket.email || '-'}</span>
        </div>

        <div className="flex justify-between border-b border-gray-100 pb-2">
          <span className="text-gray-500">Kategori Tiket</span>
          <span className="text-blue-600 font-bold uppercase">{tiket.jenisTiket || '-'}</span>
        </div>

        <div className="flex justify-between border-b border-gray-100 pb-2">
          <span className="text-gray-500">Jumlah Tiket</span>
          <span className="text-gray-900 font-bold">{tiket.jumlahTiket || 0} Pcs</span>
        </div>

        <div className="pt-4 mt-5 border-t-2 border-gray-200 flex justify-between items-center text-lg font-bold text-green-600">
          <span>Total Pembayaran</span>
          <span className="bg-green-600 text-white px-3 py-1 rounded-lg text-base font-extrabold shadow-sm">
            Rp {Number(tiket.totalHarga || 0).toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      <div className="mt-6 text-center bg-gray-900 text-white font-mono font-bold py-2.5 rounded-xl text-xs tracking-widest uppercase">
        *** LUNAS / SILAKAN MASUK ***
      </div>
    </div>
  );
}