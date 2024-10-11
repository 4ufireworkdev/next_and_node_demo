/*
  Warnings:

  - Made the column `qty` on table `SaleTemp` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SaleTemp" ALTER COLUMN "qty" SET NOT NULL;
