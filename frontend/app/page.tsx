"use client";

import Link from "next/link";
import UserNavbar from "@/components/UserNavbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={styles.mainContainer}>
      <UserNavbar />
      
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div style={styles.backgroundContainer}>
          <img
            src="https://www.filantra.org/wp-content/uploads/2025/10/elephants-2923917-scaled.jpg"
            alt="Lembah Hijau Background"
            style={styles.backgroundImage}
          />
          <div style={styles.overlayGradientRight} />
          <div style={styles.overlayGradientBottom} />
        </div>

        <div style={styles.heroContentContainer}>
          <div style={styles.heroTextBox}>
            <div style={styles.badge}>
              <span style={styles.badgeDot}></span>
              Taman Wisata & Satwa Populer
            </div>
            
            <h1 style={styles.heroTitle}>
              Eksplorasi Alam <br />
              & Keseruan <span style={styles.heroTitleHighlight}>Tanpa Batas</span>
            </h1>
            
            <p style={styles.heroDescription}>
              Rasakan petualangan keluarga tak terlupakan di Bandar Lampung. Paduan sempurna antara keasrian alam, wahana air super seru, dan edukasi satwa liar yang interaktif.
            </p>

            <div style={styles.buttonGroup}>
              <Link href="/wisata-user" style={styles.primaryButton}>
                Pesan Tiket Sekarang →
              </Link>
              <Link href="/dashboard" style={styles.secondaryButton}>
                Dashboard Admin
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={styles.featuresSection}>
        <div style={styles.featuresContentContainer}>
          
          <div style={styles.featuresHeader}>
            <h2 style={styles.featuresTitle}>Fasilitas & Wahana Utama</h2>
            <p style={styles.featuresSubtitle}>
              Ragam destinasi menarik di dalam satu kawasan liburan terpadu yang ramah anak dan nyaman bagi orang tua.
            </p>
          </div>
          
          <div style={styles.cardGrid}>
            {/* Card 1 */}
            <div style={styles.card}>
              <div style={{ ...styles.cardIcon, backgroundColor: "#f0fdf4" }}>🌳</div>
              <h3 style={styles.cardTitle}>Lembah Asri & Rindang</h3>
              <p style={styles.cardDescription}>Kawasan hijau terbuka luas dengan ribuan pepohonan rindang, spot foto estetik, dan udara bersih alami.</p>
            </div>
            
            {/* Card 2 */}
            <div style={styles.card}>
              <div style={{ ...styles.cardIcon, backgroundColor: "#ecfeff" }}>🏊‍♂️</div>
              <h3 style={styles.cardTitle}>Waterboom Kelas Dunia</h3>
              <p style={styles.cardDescription}>Dilengkapi bermacam tipe kolam, seluncuran spiral raksasa, ember tumpah, dan pancuran seru.</p>
            </div>
            
            {/* Card 3 */}
            <div style={styles.card}>
              <div style={{ ...styles.cardIcon, backgroundColor: "#fef8e6" }}>🦅</div>
              <h3 style={styles.cardTitle}>Konservasi Taman Satwa</h3>
              <p style={styles.cardDescription}>Rumah bagi ratusan satwa langka unik. Menyediakan interaksi aman dan area edukasi satwa bagi si kecil.</p>
            </div>
          </div>

          {/* Info Bar */}
          <div style={styles.infoBar}>
            <div style={styles.infoItem}>
              <span style={{ fontSize: "24px" }}>📍</span>
              <div>
                <h4 style={styles.infoItemTitle}>Lokasi Strategis</h4>
                <p style={styles.infoItemText}>Jl. Imba Kusuma Ratu No.11, Sukadanaham, Bandar Lampung</p>
              </div>
            </div>
            <div style={styles.infoItem}>
              <span style={{ fontSize: "24px" }}>🕒</span>
              <div>
                <h4 style={styles.infoItemTitle}>Jam Operasional</h4>
                <p style={styles.infoItemText}>Setiap Hari: 08.00 WIB - 17.00 WIB</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <Footer />
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  mainContainer: {
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    color: "#1e293b",
    fontFamily: "system-ui, -apple-system, sans-serif",
    display: "flex",
    flexDirection: "column",
  },
  heroSection: {
    flex: 1,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    minHeight: "600px",
    padding: "80px 0",
  },
  backgroundContainer: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  overlayGradientRight: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to right, rgba(11, 27, 18, 0.95) 0%, rgba(15, 33, 22, 0.75) 50%, rgba(248, 250, 252, 0) 100%)",
  },
  overlayGradientBottom: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, transparent 50%, #f8fafc 100%)",
  },
  heroContentContainer: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: "1152px",
    margin: "0 auto",
    padding: "0 24px",
    boxSizing: "border-box",
  },
  heroTextBox: {
    maxWidth: "640px",
    color: "#ffffff",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    backgroundColor: "rgba(74, 222, 128, 0.15)",
    backdropFilter: "blur(8px)",
    color: "#4ade80",
    fontSize: "12px",
    fontWeight: 700,
    padding: "6px 14px",
    borderRadius: "30px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    marginBottom: "20px",
    border: "1px solid rgba(74, 222, 128, 0.3)",
  },
  badgeDot: {
    width: "6px",
    height: "6px",
    backgroundColor: "#4ade80",
    borderRadius: "50%",
  },
  heroTitle: {
    margin: "0 0 20px 0",
    fontSize: "56px",
    fontWeight: 800,
    lineHeight: "1.05",
    letterSpacing: "-1.5px",
    textShadow: "0 4px 12px rgba(0,0,0,0.3)",
  },
  heroTitleHighlight: {
    color: "#4ade80",
  },
  heroDescription: {
    margin: "0 0 40px 0",
    fontSize: "18px",
    color: "#cbd5e1",
    lineHeight: "1.6",
    textShadow: "0 2px 4px rgba(0,0,0,0.2)",
    maxWidth: "540px",
  },
  buttonGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
  },
  primaryButton: {
    display: "inline-block",
    textDecoration: "none",
    padding: "16px 32px",
    backgroundColor: "#166534",
    color: "#ffffff",
    fontWeight: 600,
    fontSize: "15px",
    borderRadius: "14px",
    boxShadow: "0 20px 25px -5px rgba(22, 101, 52, 0.4)",
    textAlign: "center",
  },
  secondaryButton: {
    display: "inline-block",
    textDecoration: "none",
    padding: "16px 28px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(8px)",
    color: "#ffffff",
    fontWeight: 600,
    fontSize: "15px",
    borderRadius: "14px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    textAlign: "center",
  },
  featuresSection: {
    backgroundColor: "#f8fafc",
    padding: "80px 24px 40px 24px",
    boxSizing: "border-box",
  },
  featuresContentContainer: {
    width: "100%",
    maxWidth: "1152px",
    margin: "0 auto",
  },
  featuresHeader: {
    textAlign: "center",
    marginBottom: "50px",
  },
  featuresTitle: {
    margin: "0 0 12px 0",
    fontSize: "32px",
    fontWeight: 800,
    color: "#0f172a",
    letterSpacing: "-0.5px",
  },
  featuresSubtitle: {
    margin: 0,
    fontSize: "15px",
    color: "#64748b",
    maxWidth: "480px",
    marginInline: "auto",
    lineHeight: "1.5",
  },
  cardGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "24px",
    justifyContent: "center",
    marginBottom: "60px",
  },
  card: {
    flex: "1 1 300px",
    maxWidth: "360px",
    backgroundColor: "#ffffff",
    padding: "32px 24px",
    borderRadius: "20px",
    border: "1px solid #e2e8f0",
    boxSizing: "border-box",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)",
  },
  cardIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    marginBottom: "20px",
  },
  cardTitle: {
    margin: "0 0 10px 0",
    fontSize: "16px",
    fontWeight: 700,
    color: "#0f172a",
  },
  cardDescription: {
    margin: 0,
    fontSize: "13.5px",
    color: "#64748b",
    lineHeight: "1.6",
  },
  infoBar: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "24px",
    padding: "24px 32px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  infoItemTitle: {
    margin: "0 0 2px 0",
    fontSize: "14px",
    fontWeight: 700,
    color: "#0f172a",
  },
  infoItemText: {
    margin: 0,
    fontSize: "12.5px",
    color: "#64748b",
  }
};