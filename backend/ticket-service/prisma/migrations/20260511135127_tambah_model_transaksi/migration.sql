-- CreateTable
CREATE TABLE "Transaksi" (
    "id" SERIAL NOT NULL,
    "tiketId" INTEGER NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "totalHarga" DOUBLE PRECISION NOT NULL,
    "namaPembeli" TEXT NOT NULL,
    "tanggalBayar" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaksi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_tiketId_fkey" FOREIGN KEY ("tiketId") REFERENCES "Tiket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
