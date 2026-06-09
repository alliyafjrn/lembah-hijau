export default function TentangPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-10 text-black">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-green-700 mb-6">
          Tentang Lembah Hijau
        </h1>
        <p className="mb-4">
          Lembah Hijau merupakan salah satu destinasi wisata keluarga yang berada di Bandar Lampung.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Visi</h2>
        <p>
          Menjadi destinasi wisata keluarga terbaik di Provinsi Lampung.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Misi</h2>
        <ul className="list-disc ml-5 space-y-2">
          <li>Menyediakan wisata edukatif.</li>
          <li>Menjaga kelestarian lingkungan.</li>
          <li>Memberikan pengalaman wisata terbaik bagi pengunjung.</li>
        </ul>
      </div>
    </div>
  );
}