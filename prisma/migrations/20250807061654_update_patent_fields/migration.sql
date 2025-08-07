/*
  Warnings:

  - You are about to drop the column `patentNo` on the `Patent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Patent" DROP COLUMN "patentNo",
ADD COLUMN     "pctDeadline" TIMESTAMP(3),
ADD COLUMN     "pctNumber" TEXT,
ADD COLUMN     "registrationNo" TEXT;
