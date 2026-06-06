export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-green-700 text-white p-5">
      <h1 className="text-2xl font-bold mb-8">
        Lembah Hijau
      </h1>

      <ul className="space-y-4">
        <li>
          <a href="/dashboard">Dashboard</a>
        </li>

        <li>
          <a href="/wisata">Wisata</a>
        </li>

        <li>
          <a href="/kategori">Kategori</a>
        </li>

        <li>
          <a href="/login">Logout</a>
        </li>
      </ul>
    </div>
  );
}