"use client";

import UserNavbar from "@/components/UserNavbar";
import Footer from "@/components/Footer";

export default function TentangPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#eff3f0", color: "#2d3732", fontFamily: "sans-serif", display: "flex", flexDirection: "column" }}>
      <UserNavbar />
      
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 16px", boxSizing: "border-box" }}>
        <div style={{ width: "100%", maxWidth: "600px", backgroundColor: "#ffffff", border: "1px solid #e1e8e3", borderRadius: "16px", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.04)", padding: "24px", boxSizing: "border-box" }}>
          
          <h1 style={{ margin: "0 0 16px 0", fontSize: "22px", fontWeight: 700, color: "#1b4332", borderBottom: "2px solid #edf5f0", paddingBottom: "12px" }}>
            Tentang Lembah Hijau
          </h1>
          
          <p style={{ margin: "0 0 24px 0", fontSize: "14px", color: "#4d5951", lineHeight: "1.6" }}>
            Lembah Hijau merupakan salah satu destinasi wisata keluarga unggulan yang bernuansa alam asri di Bandar Lampung, dirancang khusus untuk memberikan kesegaran sekaligus edukasi bagi setiap pengunjung.
          </p>
          
          <div style={{ backgroundColor: "#fcfdfe", border: "1px solid #f0f4f1", borderRadius: "12px", padding: "16px", marginBottom: "16px" }}>
            <h2 style={{ margin: "0 0 8px 0", fontSize: "15px", fontWeight: 700, color: "#15803d", display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ display: "inline-block", width: "4px", height: "14px", backgroundColor: "#15803d", borderRadius: "2px" }}></span>
              Visi
            </h2>
            <p style={{ margin: 0, fontSize: "13px", color: "#4d5951", lineHeight: "1.6" }}>
              Menjadi destinasi wisata alam dan keluarga terbaik, edukatif, serta terkemuka di Provinsi Lampung.
            </p>
          </div>
          
          <div style={{ backgroundColor: "#fcfdfe", border: "1px solid #f0f4f1", borderRadius: "12px", padding: "16px" }}>
            <h2 style={{ margin: "0 0 10px 0", fontSize: "15px", fontWeight: 700, color: "#15803d", display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ display: "inline-block", width: "4px", height: "14px", backgroundColor: "#15803d", borderRadius: "2px" }}></span>
              Misi
            </h2>
            <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "13px", color: "#4d5951", display: "flex", flexDirection: "column", gap: "8px", lineHeight: "1.5" }}>
              <li>Menyediakan wahana rekreasi yang aman, nyaman, dan kental akan nilai edukasi.</li>
              <li>Berkomitmen penuh dalam menjaga kelestarian lingkungan dan keasrian alam sekitar.</li>
              <li>Memberikan pelayanan prima demi menciptakan pengalaman wisata terbaik bagi seluruh lapisan masyarakat.</li>
            </ul>
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}