import UserNavbar from "@/components/UserNavbar";
import Footer from "@/components/Footer";

export default function KontakPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <UserNavbar />
      <div className="flex-grow max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-md mt-10 w-full">
        <h1 className="text-4xl font-bold text-green-700 mb-6">
          Kontak
        </h1>

        <p>
          Alamat:
          Jalan Raden Imba Kusuma,
          Sukadana Ham, Bandar Lampung
        </p>

        <p className="mt-2">
          Telepon:
          (0721) 123456
        </p>

        <p className="mt-2">
          Email:
          info@lembahhijau.com
        </p>

        <div className="mt-8">
          <iframe
            src="https://maps.google.com/maps?q=lembah%20hijau%20lampung&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="400"
            loading="lazy"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}