"use client";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Navbar />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-black">Dashboard</h1>
            <p className="text-gray-600 mt-2">Selamat datang di panel admin Lembah Hijau.</p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}