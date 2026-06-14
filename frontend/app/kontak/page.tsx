"use client";

import UserNavbar from "@/components/UserNavbar";
import Footer from "@/components/Footer";

export default function KontakPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "sans-serif", display: "flex", flexDirection: "column" }}>
      <UserNavbar />
      
      <div style={{ flex: 1, width: "100%", maxWidth: "1152px", margin: "0 auto", padding: "40px 24px", boxSizing: "border-box" }}>
        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "32px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
          
          <h1 style={{ margin: "0 0 24px 0", fontSize: "32px", fontWeight: 800, color: "#166534" }}>
            Hubungi Kami
          </h1>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", marginBottom: "32px" }}>
            <div style={{ flex: "1 1 280px", backgroundColor: "#f0fdf4", padding: "20px", borderRadius: "12px", border: "1px solid #dcfce7" }}>
              <div style={{ fontSize: "20px", marginBottom: "8px" }}>📍</div>
              <h3 style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: 700, color: "#14532d" }}>Alamat Resmi</h3>
              <p style={{ margin: 0, fontSize: "13.5px", color: "#166534", lineHeight: "1.5" }}>
                Jalan Raden Imba Kusuma, Sukadana Ham, Bandar Lampung
              </p>
            </div>

            <div style={{ flex: "1 1 280px", backgroundColor: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "20px", marginBottom: "8px" }}>📞</div>
              <h3 style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: 700, color: "#0f172a" }}>Nomor Telepon</h3>
              <p style={{ margin: 0, fontSize: "13.5px", color: "#475569" }}>
                (0721) 123456
              </p>
            </div>

            <div style={{ flex: "1 1 280px", backgroundColor: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "20px", marginBottom: "8px" }}>✉️</div>
              <h3 style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: 700, color: "#0f172a" }}>E-mail Hubungan</h3>
              <p style={{ margin: 0, fontSize: "13.5px", color: "#475569" }}>
                info@lembahhijau.com
              </p>
            </div>
          </div>

          <div style={{ width: "100%", height: "400px", borderRadius: "12px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
            <iframe
              src="https://maps.google.com/maps?q=lembah%20hijau%20lampung&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              style={{ border: 0 }}
            />
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}