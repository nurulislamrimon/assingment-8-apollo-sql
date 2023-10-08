/*
  Warnings:

  - You are about to drop the column `createdAt` on the `ordered_book` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ordered_book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order" ALTER COLUMN "status" SET DEFAULT 'pending';

-- AlterTable
ALTER TABLE "ordered_book" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'customer';
