/*
  Warnings:

  - You are about to drop the `Animal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ticket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Animal";

-- DropTable
DROP TABLE "Ticket";

-- CreateTable
CREATE TABLE "Tiket" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "harga" DOUBLE PRECISION NOT NULL,
    "stok" INTEGER NOT NULL,
    "deskripsi" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tiket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hewan" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "spesies" TEXT NOT NULL,
    "habitat" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hewan_pkey" PRIMARY KEY ("id")
);
