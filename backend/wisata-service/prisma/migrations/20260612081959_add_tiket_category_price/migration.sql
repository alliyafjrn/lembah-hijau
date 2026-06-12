/*
  Warnings:

  - Added the required column `harga` to the `Tiket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenisTiket` to the `Tiket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalHarga` to the `Tiket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tiket" ADD COLUMN     "harga" INTEGER NOT NULL,
ADD COLUMN     "jenisTiket" TEXT NOT NULL,
ADD COLUMN     "totalHarga" INTEGER NOT NULL;
