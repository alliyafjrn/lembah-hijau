"use client";

import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <div className="w-64 min-h-screen bg-green-700 text-white p-5 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-8">
          Lembah Hijau
        </h1>

        <ul className="space-y-4">
          <li>
            <a href="/dashboard" className="block py-1">Dashboard</a>
          </li>

          <li>
            <a href="/wisata" className="block py-1">Wisata</a>
          </li>

          <li>
            <a href="/kategori" className="block py-1">Kategori</a>
          </li>
        </ul>
      </div>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white p-2 rounded font-semibold text-center block"
        >
          Logout
        </button>
      </div>
    </div>
  );
}