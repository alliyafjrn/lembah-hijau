/*
  Warnings:

  - Added the required column `umur` to the `Hewan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hewan" ADD COLUMN     "lokasi" TEXT,
ADD COLUMN     "umur" INTEGER NOT NULL;
