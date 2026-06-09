import UserNavbar from "@/components/UserNavbar";
import Footer from "@/components/Footer";

export default function KontakPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <UserNavbar />
      
      {/* Container utama dengan padding responsif */}
      <div className="flex-grow max-w-5xl mx-auto bg-white p-4 md:p-8 rounded-lg shadow-md mt-4 md:mt-10 w-full md:w-11/12">
        <h1 className="text-2xl md:text-4xl font-bold text-green-700 mb-6">
          Kontak
        </h1>

        <div className="text-sm md:text-base">
          <p>
            <span className="font-semibold">Alamat:</span><br />
            Jalan Raden Imba Kusuma, Sukadana Ham, Bandar Lampung
          </p>

          <p className="mt-4">
            <span className="font-semibold">Telepon:</span><br />
            (0721) 123456
          </p>

          <p className="mt-4">
            <span className="font-semibold">Email:</span><br />
            info@lembahhijau.com
          </p>
        </div>

        {/* Iframe responsif dengan aspect ratio */}
        <div className="mt-8 w-full aspect-video">
          <iframe
            src="https://maps.google.com/maps?q=lembah%20hijau%20lampung&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            loading="lazy"
            className="rounded-lg shadow-sm"
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}