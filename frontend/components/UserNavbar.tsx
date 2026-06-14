"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserNavbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <nav style={{ backgroundColor: "#166534", padding: "14px 16px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "480px", margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center", gap: "20px" }}>
        
        <Link 
          href="/" 
          style={{ 
            color: "#ffffff", 
            textDecoration: "none", 
            fontSize: "14px", 
            fontWeight: isActive("/") ? "600" : "500", 
            opacity: isActive("/") ? "1" : "0.7",
            borderBottom: isActive("/") ? "2px solid #ffffff" : "2px solid transparent",
            paddingBottom: "2px"
          }}
        >
          Home
        </Link>
        
        <Link 
          href="/wisata-user" 
          style={{ 
            color: "#ffffff", 
            textDecoration: "none", 
            fontSize: "14px", 
            fontWeight: isActive("/wisata-user") ? "600" : "500", 
            opacity: isActive("/wisata-user") ? "1" : "0.7",
            borderBottom: isActive("/wisata-user") ? "2px solid #ffffff" : "2px solid transparent",
            paddingBottom: "2px"
          }}
        >
          Wisata
        </Link>
        
        <Link 
          href="/tentang" 
          style={{ 
            color: "#ffffff", 
            textDecoration: "none", 
            fontSize: "14px", 
            fontWeight: isActive("/tentang") ? "600" : "500", 
            opacity: isActive("/tentang") ? "1" : "0.7",
            borderBottom: isActive("/tentang") ? "2px solid #ffffff" : "2px solid transparent",
            paddingBottom: "2px"
          }}
        >
          Tentang
        </Link>
        
        <Link 
          href="/kontak" 
          style={{ 
            color: "#ffffff", 
            textDecoration: "none", 
            fontSize: "14px", 
            fontWeight: isActive("/kontak") ? "600" : "500", 
            opacity: isActive("/kontak") ? "1" : "0.7",
            borderBottom: isActive("/kontak") ? "2px solid #ffffff" : "2px solid transparent",
            paddingBottom: "2px"
          }}
        >
          Kontak
        </Link>

      </div>
    </nav>
  );
}