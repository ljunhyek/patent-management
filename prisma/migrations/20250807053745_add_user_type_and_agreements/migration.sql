/*
  Warnings:

  - Added the required column `emailAgreed` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `privacyAgreed` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `termsAgreed` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userType` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailAgreed" BOOLEAN NOT NULL,
ADD COLUMN     "privacyAgreed" BOOLEAN NOT NULL,
ADD COLUMN     "termsAgreed" BOOLEAN NOT NULL,
ADD COLUMN     "userType" TEXT NOT NULL;
