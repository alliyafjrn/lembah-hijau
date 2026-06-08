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
      height: "100vh",
      backgroundColor: "#f3f4f6",
      fontFamily: "sans-serif",
      color: "#333",
      boxSizing: "border-box",
      margin: 0,
      padding: "20px"
    }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
        width: "100%",
        maxWidth: "360px",
        textAlign: "center",
        border: "1px solid #e5e7eb"
      }}>
        
        {/* Header */}
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#15803d", margin: "0 0 8px 0" }}>
          Lembah Hijau
        </h1>
        <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 24px 0" }}>
          Silakan masuk ke panel admin
        </p>

        {/* Form Inputs */}
        <div style={{ textLeft: "left", textAlign: "left", marginBottom: "16px" }}>
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
              padding: "10px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              boxSizing: "border-box",
              fontSize: "14px",
              backgroundColor: "#f9fafb",
              color: "#000"
            }}
          />
        </div>

        <div style={{ textLeft: "left", textAlign: "left", marginBottom: "24px" }}>
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
              padding: "10px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              boxSizing: "border-box",
              fontSize: "14px",
              backgroundColor: "#f9fafb",
              color: "#000"
            }}
          />
        </div>

        {/* Button Submit */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#15803d",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? "Memproses..." : "Masuk ke Akun"}
        </button>

        <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "24px", marginBottom: "0" }}>
          &copy; 2026 Lembah Hijau. All rights reserved.
        </p>

      </div>
    </div>
  );
}