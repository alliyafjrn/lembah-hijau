"use client";

import { useEffect, useState, use } from "react";
import { getWisataById } from "@/services/wisata";
import { createTiket } from "@/services/tiket";
import Link from "next/link";
import UserNavbar from "@/components/UserNavbar";

export default function DetailWisataPage({ params }: { params: Promise<{ id: string }> }) {
  const [wisata, setWisata] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [namaPemesan, setNamaPemesan] = useState("");
  const [email, setEmail] = useState("");
  const [jumlahTiket, setJumlahTiket] = useState(1);

  const resolvedParams = use(params);
  const id = resolvedParams.id;

  useEffect(() => {
    if (id) {
      loadWisata(Number(id));
    }
  }, [id]);

  async function loadWisata(wisataId: number) {
    try {
      const response = await getWisataById(wisataId);

      if (response && response.data) {
        setWisata(response.data);
      } else {
        setWisata(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-600 font-semibold animate-pulse">
          Memuat detail wisata...
        </p>
      </div>
    );
  }

  if (!wisata) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black">
        <UserNavbar />
        <p className="text-xl font-semibold text-gray-600 mb-4">
          Data wisata tidak ditemukan.
        </p>
        <Link href="/wisata-user" className="text-green-700 hover:underline">
          ← Kembali ke Daftar Wisata
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <UserNavbar />
      <div className="max-w-3xl mx-auto p-8">
        <Link
          href="/wisata-user"
          className="inline-block mb-6 text-green-700 font-medium hover:text-green-800 transition"
        >
          ← Kembali ke Daftar Wisata
        </Link>

        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <img
            src={wisata.gambar || "https://placehold.co/600x400"}
            alt={wisata.nama}
            className="w-full h-64 object-cover rounded-lg mb-6 shadow-sm"
          />
          <h1 className="text-4xl font-bold text-green-700 mb-5">
            {wisata.nama}
          </h1>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {wisata.deskripsi || "Tidak ada deskripsi lengkap mengenai tempat wisata ini."}
          </p>

          <div className="inline-block bg-green-50 text-green-800 px-4 py-2 rounded-lg border border-green-200 font-medium">
            Kategori: {wisata.kategori?.nama || wisata.kategoriNama || "-"}
          </div>
        </div>
      </div>
    </div>
  );

  async function handlePesan() {
    try {
      await createTiket({
        namaPemesan,
        email,
        jumlahTiket,
        wisataId: wisata.id,
      });

      alert(
        "Pemesanan tiket berhasil"
      );

      setNamaPemesan("");
      setEmail("");
      setJumlahTiket(1);

    } catch (error) {
      console.log(error);

      alert(
        "Pemesanan gagal"
      );
    }
  }
}