-- CreateTable
CREATE TABLE "Tiket" (
    "id" SERIAL NOT NULL,
    "namaPemesan" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "jumlahTiket" INTEGER NOT NULL,
    "wisataId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tiket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tiket" ADD CONSTRAINT "Tiket_wisataId_fkey" FOREIGN KEY ("wisataId") REFERENCES "Wisata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
