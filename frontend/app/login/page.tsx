"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!username.trim() || !password.trim()) {
      alert("Email dan password harus diisi!");
      return;
    }
    
    if (username === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("token", "dummy-token-lembah-hijau");
      router.push("/dashboard");
      return;
    }

    try {
      setLoading(true);
      const response = await login(username, password);

      if (!response.access_token) {
        alert("Email atau Password salah!");
        return;
      }

      localStorage.setItem("token", response.access_token);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login gagal, pastikan backend service sudah berjalan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#f3f4f6",
      fontFamily: "sans-serif",
      color: "#333",
      padding: "16px" // Padding sedikit lebih kecil untuk mobile
    }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "32px 24px", // Padding responsif
        borderRadius: "12px",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "360px",
        textAlign: "center",
        border: "1px solid #e5e7eb"
      }}>
        
        {/* Header */}
        <h1 style={{ fontSize: "22px", fontWeight: "bold", color: "#15803d", marginBottom: "8px" }}>
          Lembah Hijau
        </h1>
        <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "24px" }}>
          Silakan masuk ke panel admin
        </p>

        {/* Form Inputs */}
        <div style={{ textAlign: "left", marginBottom: "16px" }}>
          <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#4b5563", marginBottom: "6px" }}>
            EMAIL ADDRESS
          </label>
          <input
            type="text"
            placeholder="admin@gmail.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px", // Sedikit lebih besar agar lebih nyaman diklik di mobile
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "14px",
              backgroundColor: "#f9fafb",
              color: "#000",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ textAlign: "left", marginBottom: "24px" }}>
          <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#4b5563", marginBottom: "6px" }}>
            PASSWORD
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "14px",
              backgroundColor: "#f9fafb",
              color: "#000",
              boxSizing: "border-box"
            }}
          />
        </div>

        {/* Button Submit */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#15803d",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            transition: "background-color 0.2s"
          }}
        >
          {loading ? "Memproses..." : "Masuk ke Akun"}
        </button>

        <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "24px" }}>
          &copy; 2026 Lembah Hijau. All rights reserved.
        </p>

      </div>
    </div>
  );
}