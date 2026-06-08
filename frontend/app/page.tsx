import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <h1 className="text-5xl font-bold text-green-700 mb-4">
        Lembah Hijau
      </h1>

      <p className="text-xl text-gray-700 mb-8">
        Tempat Wisata Keluarga di Bandar Lampung
      </p>

      <div className="flex gap-4">
        <Link
          href="/wisata-user"
          className="bg-green-700 text-white px-6 py-3 rounded-lg"
        >
          Jelajahi Wisata
        </Link>

        <Link
          href="/dashboard"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Admin
        </Link>
      </div>
    </main>
  );
}