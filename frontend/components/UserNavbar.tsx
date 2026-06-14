import Link from "next/link";

export default function UserNavbar() {
  return (
    <nav style={{ backgroundColor: "#166534", padding: "14px 16px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "480px", margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center", gap: "20px" }}>
        <Link href="/" style={{ color: "#ffffff", textDecoration: "none", fontSize: "14px", fontWeight: "500", opacity: "0.9" }}>
          Home
        </Link>
        <Link href="/wisata-user" style={{ color: "#ffffff", textDecoration: "none", fontSize: "14px", fontWeight: "600", borderBottom: "2px solid #ffffff", paddingBottom: "2px" }}>
          Wisata
        </Link>
        <Link href="/tentang" style={{ color: "#ffffff", textDecoration: "none", fontSize: "14px", fontWeight: "500", opacity: "0.9" }}>
          Tentang
        </Link>
        <Link href="/kontak" style={{ color: "#ffffff", textDecoration: "none", fontSize: "14px", fontWeight: "500", opacity: "0.9" }}>
          Kontak
        </Link>
      </div>
    </nav>
  );
}