import Link from "next/link";

export default function UserNavbar() {
  return (
    <nav className="bg-green-700 text-white p-4">
      <div className="max-w-6xl mx-auto flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/wisata-user">Wisata</Link>
        <Link href="/tentang">Tentang</Link>
        <Link href="/kontak">Kontak</Link>
      </div>
    </nav>
  );
}