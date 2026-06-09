export default function KontakPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-10 text-black">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-green-700 mb-6">Kontak</h1>
        
        <p>Alamat: Jalan Raden Imba Kusuma, Sukadana Ham, Bandar Lampung</p>
        <p className="mt-2">Telepon: (0721) 123456</p>
        <p className="mt-2">Email: info@lembahhijau.com</p>

        <div className="mt-8 overflow-hidden rounded-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.193214532906!2d105.23654577404494!3d-5.417387353982956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40da1f600f6805%3A0xe543e1d6d63503f1!2sTaman%20Wisata%20Lembah%20Hijau!5e0!3m2!1sid!2sid!4v1717913500000!5m2!1sid!2sid"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}