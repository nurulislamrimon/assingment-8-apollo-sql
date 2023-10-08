/*
  Warnings:

  - Added the required column `updatedAt` to the `ordered_book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ordered_book" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
